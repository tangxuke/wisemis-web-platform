<template>
	<div>
		<Row v-if="!hideButtons">
			<ButtonGroup>
				<Button type="success" @click="createNew">新建</Button>
				<Button type="default" @click="copy" :disabled="!rowData">复制</Button>
			</ButtonGroup>
			<ButtonGroup style="margin:3px 10px;">
				<Button type="primary" @click="$refs.modal2.ShowDialog()">查询</Button>
				<Button type="default" @click="refresh">刷新</Button>
			</ButtonGroup>
      <ButtonGroup style="margin:3px 10px;">
        <template v-for="action in actions">
          <template v-if="action.Remark">
            <Tooltip :key="action.Action"  :delay="1000"  :max-width="500">
              <Button
              v-if="actionState[action.Action].visible"
              :disabled="!actionState[action.Action].enable"
              @click="doAction(action.Action)"
              v-html="actionState[action.Action].title"
              />
              <div slot="content">
                <div>
{{action.Remark}}
                </div>
              </div>
            </Tooltip>
          </template>
          <template v-else>
            <Button
              :key="action.Action"
              v-if="actionState[action.Action].visible"
              :disabled="!actionState[action.Action].enable"
              @click="doAction(action.Action)"
              v-html="actionState[action.Action].title"
              />
          </template>
        </template>
				
			</ButtonGroup>
			<slot></slot>
		</Row>
		<Row>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns" 
				:data="data1" 
        :loading="loading"
				@on-row-click="onRowClick"
        @REFRESH-ACTION-STATE="refreshActionState"
				no-data-text="暂无数据，请刷新或查询！"
				style="margin-top:3px;"
				>
			</Table>
		</Row>
		<Row v-if="!hideButtons">
			<Button type="default" style="margin:5px 0;">导出</Button>
			<Page 
				:total="Count" 
				:page-size="pagesize" 
				:current.sync="current" 
				@on-change="refreshPage" 
				style="float:right;margin:5px 0;"
				v-if="Count>pagesize"
			/>
		</Row>
		<Row>
			<my-modal :title="title" :width="modalWidth" @OK="onSave" :loading="true" ref="modal1">
				<my-form :model="model" ref="form"></my-form>
			</my-modal>
			<my-modal title="查询" :width="900" @OK="onQuery" ref="modal2">
				<my-query :model="model" ref="query"></my-query>
			</my-modal>
		</Row>
	</div>
	
</template>


<script>

export default {
  props: ["model", "pageSize", "hideAction", "hideButtons"],
  data() {
    return {
      loading:false,
      Count: 0,
      current: 1,
      data1: [],
      columns: [],
      actionColumn: [
        {
          title: "Action",
          key: "action",
          fixed: "right",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "Edit"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除提示",
                        content: "你真的要删除这条记录吗？",
                        onOk: () => {
                          this.delete(params.row);
                        }
                      });
                    }
                  }
                },
                "Del"
              )
            ]);
          }
        }
      ],
      where: {},
      query: {},
      title: "新建",
      modalWidth: 300,
      modalWidth2: 300,
      rowData: null,
      actions:[],
      actionState:{}
    };
  },
  computed: {
    pagesize: function() {
      return this.pageSize || 8;
    },
    modelName: function() {
      return this.model;
    },
    relationMainTable: function() {
      return this.relationTable;
    }
  },
  methods: {
    /**
     * 刷新动作状态
     */
    refreshActionState(row){

      this.actions.forEach(action=>{
        //检测启用条件
        var isEnable=action.enableFn.call(this,row);
        if(typeof isEnable !== 'boolean')
          isEnable=true;
        //检测可视条件
        var isVisible=action.visibleFn.call(this,row);
        if(typeof isVisible !== 'boolean')
          isVisible=true;
        //检查标题
        var title=action.titleFn.call(this,row);
        if(typeof title !== 'string')
          title=action.Action;
        //设置状态
        this.actionState[action.Action].enable=isEnable;
        this.actionState[action.Action].visible=isVisible;
        this.actionState[action.Action].title=title;
      });
    },
    /**
     * 执行动作
     * @param {string} action 动作名称
     */
    doAction(action){
      
      var theAction=this.actions.find(item=>{
        return item.Action===action;
      });
      if(theAction){
        theAction.operationFn.call(this,this.rowData);
      }
    },
    /**
     * 设置网格动作
     * @param {{Action:string,EnableCondition:string,VisibleCondition:string,Code:string}[]} actions 动作列表
     */
    setActions(actions){
      actions.forEach(action=>{
        action.enableFn=new Function('row',action.CheckEnableCode);
        action.visibleFn=new Function('row',action.CheckVisibleCode);
        action.titleFn=new Function('row',action.CheckTitleCode);
        action.operationFn=new Function('row',action.ActionCode);
        this.actions.push(action);

        var state={enable:true,visible:true,title:action.Action};
        this.actionState[action.Action]=state;
      });
      //首次刷新状态
      this.refreshActionState(null);
    },
    /**
     * 表格事件
     * @param {{type:string,params:string,code:string}[]} events
     */
    setEvents(events){
      if(!Array.isArray(events))
        return;
      events.forEach(ev=>{
        var params=ev.params || '';
        var aParams=params.split(',');
        var fn=new Function(...aParams,ev.code);
        this.$on(ev.type,(...aParams)=>{
          fn.call(this,...aParams);
        });
      });
    },
    getForm() {
      return this.$refs.form;
    },
    /**
     * 保存数据
     * @param {MyModal} modal 对话框对象
     */
    onSave(modal) {
      this.$refs.form
        .save()
        .then(value => {
          modal.value1=false;
          this.refresh();
        })
        .catch(reason => {
          modal.$refs.modal.buttonLoading=false;
        });
    },
    setQuery(data) {
      this.query = { query: data };
    },
    onQuery() {
      var data = this.$refs.query.query();
      this.query = data;
      this.refresh();
      //
    },
    /**
     * 清除查询条件
     */
    clearQuery() {
      this.query = {};
      this.$refs.query.clear();
    },
    /**
     * 清除表单
     */
    clearForm() {
      this.$refs.form.clear();
    },
    getCount: function() {
      this.$axios.post(`models/${this.model}/count`).then(value => {
        if (value.success) {
          this.Count = value.result;
          this.current = 1;
        }
      });
    },
    copy() {
      const form = this.$refs.form;
      form.copy(this.rowData);
      this.title = "新建";
      this.$refs.modal1.ShowDialog();
    },
    createNew: function() {
      const form = this.$refs.form;
      form.clear();
      this.title = "新建";
      this.$refs.modal1.ShowDialog();
    },
    edit: function(data) {
      const form = this.$refs.form;
      form.setValue(data);
      this.title = "修改";
      this.$refs.modal1.ShowDialog();
    },
    delete: function(data) {
      this.$axios
        .post(`/models/${this.model}/delete`, data)
        .then(value => {
          if (value.success) {
            this.$Message.success("删除成功！");
            this.refresh();
          } else {
            this.$Modal.remove();
            setTimeout(() => {
              this.$Modal.error({
                title: "删除失败提示",
                content: value.message
              });
            }, 300);
          }
        })
        .catch(reason => {
          this.$Modal.error({
            title: "删除失败提示",
            content: reason.message
          });
        });
    },
    onRowClick: function(data) {
      this.rowData = data;
      //行点击事件通知
      this.$emit("ON-ROW-CLICK", data);
    },
    setWhere(data) {
      this.where = { where: data };
    },
    refreshPage: function(pageNo) {
      this.loading=true;
      var page = {
        current: this.current, //当前页
        pagesize: this.pagesize //每页条数
      };
      this.$axios
        .post(`/models/${this.model}/data`, {
          ...this.where,
          ...this.query,
          ...page
        })
        .then(value => {
          if (value.success) {
            this.data1 = value.result;
            this.loading=false;
            this.rowData = null;
          } else {
            this.loading=false;
            alert(value.message);
          }
        })
        .catch(reason => {
          this.loading=false;
          alert(reason.message);
        });
    },
    refresh: function() {
      this.loading=true;
      this.$axios
        .post(`/models/${this.model}/count`, { ...this.where, ...this.query })
        .then(value => {
          if (value.success) {
            this.Count = value.result;
            var pages = Math.ceil(this.Count / this.pagesize);
            if (this.current > pages) this.current = pages;
            this.refreshPage(this.current);
          } else {
            this.loading=false;
            alert(value.message);
          }
        })
        .catch(reason => {
          this.loading=false;
          alert(reason.message);   
        });
    },
    /**
     * 设置联动关系
     * @param {Vue} child 子表格
     * @param {string} mainFields 主关联字段列表
     * @param {string} childFields 子关联字段
     * @param {any} row 主表格行数据
     */
    setRelation(child, mainFields, childFields, row) {
      if (!child || !mainFields || !childFields) {
        alert("关联参数不足！");
        return;
      }

      var mainFs = mainFields.split(",");
      var childFs = childFields.split(",");
      var data = {};
      for (var i = 0; i < mainFs.length; i++) {
        var childField = childFs[i];
        var mainField = mainFs[i];
        data[childField] = row[mainField];
      }
      child.clearQuery();
      child.setWhere(data);
      child.getForm().setDefault(data);
      child.refresh();

    },
    getModel() {
      if (!this.model) {
        return;
      }
      this.$axios
        .post(`/models/${this.model}/table`)
        .then(value => {
          if (value.success) {
            
            this.modalWidth = value.result.ColumnCount * 300;
            const fields = value.result.Fields.sort((a, b) => {
              return a.OrderId - b.OrderId;
            }).map(item => {
              return {
                key: item.Name,
                title: item.Title,
                minWidth: item.Width
              };
            });
            if (this.hideAction) this.columns = fields;
            else this.columns = [...fields, ...this.actionColumn];
            if (value.result.AutoRefresh) {
              this.refresh();
            }
            //设置表格事件
            this.setEvents(value.result.GridScripts);
            //设置表格动作
            this.setActions(value.result.Actions);
          }
        })
        .catch(reason => {
          alert(reason.message);
        });

      this.$axios
        .post(`/models/${this.model}/query`)
        .then(value => {
          if (value.success) {
            this.modalWidth2 = value.result.ColumnCount * 300;
          }
        })
        .catch(reason => {
          alert(reason.message);
        });
    }
  },
  mounted: function() {
    this.getModel();
  },
  watch:{
    rowData(newVal,oldVal){
      if(newVal===oldVal)
        return;
      this.refreshActionState(newVal);
    }
  }
};
</script>
