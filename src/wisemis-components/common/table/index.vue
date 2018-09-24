<template>
	<div>
		<Row v-if="!hideButtons">
			<ButtonGroup>
				<Button type="success" @click="createNew">新建</Button>
				<Button type="default" @click="copy" :disabled="!rowData">复制</Button>
			</ButtonGroup>
			<ButtonGroup style="margin:0 10px;">
				<Button type="primary" @click="$refs.modal2.ShowDialog()">查询</Button>
				<Button type="default" @click="refresh">刷新</Button>
			</ButtonGroup>
			<slot></slot>
		</Row>
		<Row>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns" 
				:data="data1" 
				@on-row-click="onRowClick"
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
			<my-modal :title="title" :width="modalWidth" @OK="onSave" ref="modal1">
				<my-form :model="model" ref="form"></my-form>
			</my-modal>
			<my-modal title="查询" :width="modalWidth2" @OK="onQuery" ref="modal2">
				<my-query :model="model" ref="query"></my-query>
			</my-modal>
		</Row>
	</div>
	
</template>


<script>
	import Vue from 'vue';

	export default {
		props:['model','pageSize','autoRefresh','hideAction','hideButtons'],
		data () {
			return {
				Count:0,
				current:1,
				data1: [],
				columns:[],
				actionColumn:[
					{
					title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
								h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
									},
									on:{
										click:()=>{
											this.edit(params.row);
										}
									}
                                }, 'Edit'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
									},
									on:{
										click:()=>{
											this.$Modal.confirm({
												title:'删除提示',
												content:'你真的要删除这条记录吗？',
												onOk:()=>{
													this.delete(params.row);
												}
											})
										}
									}
                                }, 'Del')
                            ]);
                        }
				}],
				where:{},
				query:{},
				title:'新建',
				modalWidth:300,
				modalWidth2:300,
				rowData:null,
				event:new Vue()
			}
		},
		computed:{
			pagesize:function(){
				return this.pageSize || 8;
			},
			modelName:function(){
				return this.model;
			},
			relationMainTable:function(){
				return this.relationTable;
			}
		},
		methods:{
			getForm(){
				return this.$refs.form;
			},
			onSave(){
				this.$refs.form.save()
				.then(value=>{
					this.refresh();
				})
			},
			setQuery(data){
				this.query={query:data};
			},
			onQuery(){
				var data=this.$refs.query.query();
				this.query=data;
				this.refresh();
				//
			},
			/**
			 * 清除查询条件
			 */
			clearQuery(){
				this.query={};
				this.$refs.query.clear();
			},
			/**
			 * 清除表单
			 */
			clearForm(){
				this.$refs.form.clear();
			},
			getCount:function(){
                this.$axios.post(`models/${this.model}/count`)
                .then(value=>{
                    if(value.success){
                        this.Count=value.result;
                        this.current=1;
                    }
                        
                })
            },
			copy(){
				const form=this.$refs.form;
				form.copy(this.rowData);
				this.title='新建';
				this.$refs.modal1.ShowDialog();
			},
			createNew:function(){
				const form=this.$refs.form;
				form.clear();
				this.title='新建';
				this.$refs.modal1.ShowDialog();
			},
			edit:function(data){
				const form=this.$refs.form;
				form.setValue(data);
				this.title='修改';
				this.$refs.modal1.ShowDialog();
			},
			delete:function(data){
				this.$axios.post(`/models/${this.model}/delete`,data)
				.then(value=>{
					if(value.success){
						this.$Message.success('删除成功！');
						this.refresh();
					}else{
						this.$Modal.remove()
						setTimeout(()=>{
							this.$Modal.error({
								title:'删除失败提示',
								content:value.message
							});
						},300);
						
					}
				})
				.catch(reason=>{
					this.$Modal.error({
						title:'删除失败提示',
						content:reason.message
					});
				});
			},
			onRowClick:function(data){
				this.rowData=data;	
				this.$emit('ON-ROW-CLICK',data);
			},
			setWhere(data){
				this.where={where:data};
			},
			refreshPage:function(pageNo){
				var page={
					current:this.current,  //当前页
    				pagesize:this.pagesize //每页条数
				}
				this.$axios.post(`/models/${this.model}/data`,{...this.where,...this.query,...page})
				.then(value=>{
						if(value.success){
							this.data1=value.result;
							this.rowData=null;
						}else{
							alert(value.message);
						}
					}
				).catch(reason=>{
					alert(reason.message);
				})
			},
			refresh:function(){
				this.$axios.post(`/models/${this.model}/count`,{...this.where,...this.query})
				.then(value=>{
					if(value.success){
						this.Count=value.result;
						var pages=Math.ceil(this.Count/this.pagesize);
						if(this.current>pages)
							this.current=pages;
						this.refreshPage(this.current);
					}else{
						alert(value.message);
					}
				})
				.catch(reason=>{
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
			setRelation(child,mainFields,childFields,row){

				if(!child || !mainFields || !childFields){
					alert('关联参数不足！');
					return;
				}

				var mainFs=mainFields.split(',');
				var childFs=childFields.split(',');
				var data={};
				for(var i=0;i<mainFs.length;i++){
					var childField=childFs[i];
					var mainField=mainFs[i];
					data[childField]=row[mainField];
				};
				child.clearQuery();
				child.setWhere(data);
				child.getForm().setDefault(data);
				child.refresh();
			},
			getModel(){
				if(!this.model){
					return;
				}
				this.$axios.post(`/models/${this.model}/table`)
				.then(value=>{
					if(value.success){
						this.modalWidth=value.result.ColumnCount*300;
						const fields=value.result.Fields
						.sort((a,b)=>{
							return a.OrderId-b.OrderId;
						})
						.map(item=>{
							return {
								key:item.Name,
								title:item.Title,
								minWidth:item.Width
							}
						});
						if(this.hideAction)
							this.columns=fields;
						else
							this.columns=[...fields,...this.actionColumn];
						if(this.autoRefresh){
							this.refresh();
						}
					}
				}).catch(reason=>{
					alert(reason.message);
				});

				this.$axios.post(`/models/${this.model}/query`)
				.then(value=>{
					if(value.success){
						this.modalWidth2=value.result.ColumnCount*300;
					}
				}).catch(reason=>{
					alert(reason.message);
				});
			}
		},
		mounted:function(){
			this.getModel();
		}
	}
</script>
