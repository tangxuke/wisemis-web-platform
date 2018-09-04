<template>
    <div is="Form" :label-width="80" style="padding:5px;">
        <div is="Row"> 
                <div is="Col"  v-for="field in fields" :span="field.ColSpan" :key="field.Name">
                    <div is="FormItem" :label="field.Title || field.Name">
                        <div :is="field.ControlType"  v-model="field.Value" :placeholder="`请输入${(field.Title || field.Name)}...`">
                            <div is="Option" v-for="item in field.Options" :value="item.value" :key="item.value">{{ item.label }}</div>
                        </div>
                    </div>
                </div>
        </div>
        <Row>
            <Col>
                <Button type="success" @click="save">保存</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  props: ['model','eventhub'],
  data() {
    return {
        /**
         * 字段列表 
         */
        fields:[]
    };
  },
  methods:{
      save:function(){
          var data={};
          this.fields.forEach(item=>{
              data[item.Name]=item.Value;
              data[item.Name+'_OldValue']=item.OldValue;
          });
          console.log(data);
          this.$axios.post(`/models/${this.model}/save`,data)
          .then(value=>{
              if(value.success){
                  this.event.$emit(`DATA-${this.model}`,this.fields);
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
  mounted:function(){
      
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
  created:function(){

      this.event.$on(`ROW-DATA-${this.model}`,data=>{
          this.fields.forEach(item=>{
              item.Value=data[item.Name];
              item.OldValue=data[item.Name];
          });
      });

      
  },
  computed:{
      event:function(){
          return this.eventhub || this;
      }
  }

};
</script>
