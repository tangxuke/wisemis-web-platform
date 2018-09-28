<template>
    <Form is="Form" :label-width="80">
        <Row> 
            <Col  v-for="field in fields" :span="field.ColSpan" :key="field.Name">
                <FormItem :label="field.Title || field.Name" :required="field.IsKey" style="height:32px;">
                    <div :is="field.ControlType"  v-model="field.Value" :placeholder="`请输入${(field.Title || field.Name)}...`" :ref="field.Name">
                        <div is="Option" v-for="item in field.Options" :value="item.value" :key="item.value">{{ item.label }}</div>
                    </div>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
export default {
  props: ['model'],
  data(){
      return {
          fields:[]
      }
  },
  methods:{
      /**
       * @param {{field:String,type:String,params:String,code:String}[]} events
       */
      setEvents(events){
          if(!Array.isArray(events))
            return;
          events.forEach(ev=>{
              var params=ev.params.split(',');
              this.refs[ev.field].$on(ev.type,new Function(params,ev.code));
          });
      },
      getModel(){
        if(!this.model){
            return;
        }
        this.$axios.post(`/models/${this.model}/form`).then(value=>{
            if(value.success){
                    this.fields=value.result.Fields.map(item=>{
                        item.Value=item.DefaultValue;
                        item.OldValue=item.DefaultValue;
                        item.ColSpan=24/value.result.ColumnCount*item.ColSpan;
                        if(item.ColSpan>24)
                            item.ColSpan=24;
                        return item;
                    });
                    //处理事件
                    this.setEvents(value.result.Script);
                }else{
                    alert(value.message)
                }
            }).catch(reason=>{
                alert(reason.message);
            })
      },
      clear:function(){
          this.fields.forEach(item=>{
              item.OldValue=item.DefaultValue;
              item.Value=item.DefaultValue;
          });
      },
      copy:function(data){
          this.clear();
          this.fields.forEach(item=>{
              item.Value=data[item.Name];
          });
      },
      setDefault(data){
          Object.keys(data).forEach(item=>{
              var field=this.fields.find(e=>{
                  return e.Name===item;
              });
              if(field){
                  field.DefaultValue=data[item];
              }
          })
      },
      setValue(data){
          this.fields.forEach(item=>{
              item.Value=data[item.Name];
              item.OldValue=data[item.Name];
          });
      },
      save:function(){

        var data={};
        this.fields.forEach(item=>{
            data[item.Name]=item.Value;
            data[item.Name+'_OldValue']=item.OldValue;
        });

        return new Promise((resolve,reject)=>{
            this.$axios.post(`/models/${this.model}/save`,data)
            .then(value=>{
                if(value.success){
                    this.$Message.success('保存成功！');
                    resolve(true);
                }
                else{
                    this.$Modal.error({
                        title:'保存失败提示',
                        content:value.message
                    });
                    reject(new Error(value.message));
                }
            })
            .catch(reason=>{
                this.$Modal.error({
                    title:'保存失败提示',
                    content:reason.message
                });
                reject(reason);
            });
        }); 
      }
  },
  mounted() {
      this.getModel();
  },
  computed:{
      modelName:function(){
          return this.model;
      }
  },
  watch:{
      modelName:function(){
          this.getModel();
      }
  }
};
</script>
