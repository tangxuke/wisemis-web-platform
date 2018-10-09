<template>
    <Form is="Form" :label-width="80">
        <Row> 
            <my-field-control 
              v-for="field in fields" 
              :key="field.Name"
              v-show="field.ShowInForm"
              :oFieldObject="field"
              :ref="field.Name"
              ></my-field-control>
        </Row>
    </Form>
</template>

<script>
import MyFieldControl from '@/wisemis-components/controls/field-control';

export default {
  props: ["model"],
  components:{
    'my-field-control':MyFieldControl
  },
  data() {
    return {
      fields: [],
      database: ""
    };
  },
  methods: {
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
    /**
     * 检查数据有效性
     * @returns {boolean}
     */
    checkValid(){
      var oField=this.fields.filter(item=>{
        return (item.IsInsert || item.IsUpdate || item.IsKey) && item.ShowInForm;
      }).find(item=>{
        return !item.control.checkValid();
      });
      if(oField){
        return false;
      }
      return true;
    },
    getModel() {
      if (!this.model) {
        return;
      }
      this.$axios
        .post(`/models/${this.model}`)
        .then(value => {
          if (value.success) {
            this.database=value.result.Database;
            this.fields = value.result.Fields.map(item => {
              item.thisform=this;
              item.Value = item.DefaultValue;
              item.OldValue = item.DefaultValue;
              item.ColSpan = (24 / value.result.ColumnCount) * item.ColSpan;
              if (item.ColSpan > 24) item.ColSpan = 24;
              return item;
            });
            //设置表单事件
            this.setEvents(value.result.FormScripts);
          } else {
            alert(value.message);
          }
        })
        .catch(reason => {
          alert(reason.message);
        });
    },
    clear: function() {
      this.fields.forEach(item => {
        item.OldValue = item.DefaultValue;
        item.Value = item.DefaultValue;
      });
    },
    copy: function(data) {
      this.clear();
      this.fields.forEach(item => {
        item.Value = data[item.Name];
      });
    },
    setDefault(data) {
      Object.keys(data).forEach(item => {
        var field = this.fields.find(e => {
          return e.Name === item;
        });
        if (field) {
          field.DefaultValue = data[item];
        }
      });
      this.$emit('SET-DEFAULT-VALUE',data);
    },
    setValue(data) {
      this.fields.filter(item=>{
        return Object.keys(data).includes(item.Name);
      }).forEach(item => {
        var value = data[item.Name];
        item.Value = value;
        item.OldValue = value;
      });
      this.$emit('FORM-SET-VALUE',data);
    },
    save: function() {
      if(!this.checkValid()){
        return Promise.reject(new Error('验证数据有效性失败！'));
      }
      this.$emit('ON-SAVE-BEFORE')
      var data = {};
      this.fields.forEach(item => {
        data[item.Name] = item.Value;
        data[item.Name + "_OldValue"] = item.OldValue;
      });

      return new Promise((resolve, reject) => {
        this.$axios
          .post(`/models/${this.model}/save`, data)
          .then(value => {
            if (value.success) {
              this.$emit('ON-SAVE-SUCCESS')
              this.$Message.success("保存成功！");
              resolve(true);
            } else {
              this.$Modal.error({
                title:'保存失败',
                content:value.message
              });
              this.$emit('ON-SAVE-FALIED',value.message)
              reject(new Error(value.message));
            }
          })
          .catch(reason => {
            this.$Modal.error({
                title:'保存失败',
                content:reason.message
              });
            this.$emit('ON-SAVE-FALIED',reason.message)
            reject(reason);
          });
      });
    }
  },
  mounted() {
    this.getModel();
  },
  computed: {
    modelName: function() {
      return this.model;
    }
  }
};
</script>
