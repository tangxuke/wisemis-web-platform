<template>
    <Form is="Form" :label-width="80" style="padding:5px;">
        <Row>

        </Row>
        <Row> 
            <Col  v-for="field in fields" :span="field.ColSpan" :key="field.Name">
                <FormItem :label="field.Title || field.Name" :required="field.IsKey">
                    <div :is="field.ControlType"  v-model="field.Value" :placeholder="`请输入${(field.Title || field.Name)}...`">
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
      readModel(){
        if(!this.model){
            console.log('没有设置模型名称！');
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
      save:function(){
          
          var data={};
          this.fields.forEach(item=>{
              data[item.Name]=item.Value;
              data[item.Name+'_OldValue']=item.OldValue;
          });
          this.$axios.post(`/models/${this.model}/save`,data)
          .then(value=>{
              if(value.success){
                  this.event.$emit(`DATA-${this.model}`,{});
                  this.$Message.success('数据保存成功！');
                  this.fields.forEach(item=>{
                      item.Value=item.DefaultValue;
                      item.OldValue=item.DefaultValue;
                  })
              }
              else{
                  this.$Modal.error({
                      title:'保存失败提示',
                      content:value.message
                  });
              }
              
          }).catch(err=>{
                this.$Modal.error({
                    title:'保存失败提示',
                    content:err.message
                });
          })
          
      }
  },
  created:function(){

      this.$on(`SET-VALUE`,data=>{
          this.fields.forEach(item=>{
              item.Value=data[item.Name];
              item.OldValue=data[item.Name];
          });
      });

      this.$on(`SET-NEW-VALUE`,data=>{
          this.fields.forEach(item=>{
              item.Value=item.DefaultValue;
              item.OldValue=item.DefaultValue;
          });
      });

      this.$on(`SET-DEFAULT`,data=>{
          data.forEach(item=>{
              this.fields.forEach(e=>{
                  if(e.Name===item.key){
                      e.DefaultValue=item.value;
                  }
              })
          })
      })   
  },
  mounted() {
      this.readModel();
  },
};
</script>
