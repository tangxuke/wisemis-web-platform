<template>
    <div is="Form" :label-width="80">
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
export default {
  props: {
    model: {
      type: String,
      required: true
    },
    action: {
      type: String,
      default: "form"
    },
    event:{
        type:Object
    }
  },
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
          })
          this.$axios.post(`/models/${this.model}/save`,data)
          .then(value=>{
              if(value.success){
                  this.$eventhub.$emit(`DATA-${this.model}`,data);
              }
              else{
                  alert(value.message);
              }
              
          }).catch(err=>{
              alert(err.message);
          })
          
      }
  },
  mounted:function(){
      
    if(!this.model){
            console.log('没有设置模型名称！');
            return;
        }
        this.$axios.post(`/models/${this.model}/${this.action}`).then(value=>{
            if(value.success){
                    this.fields=value.result.Fields.map(item=>{
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

      this.$eventhub.$on(`ROW-DATA-${this.model}`,data=>{
          this.fields.forEach(item=>{
              item.Value=data[item.Name]
          });
      });

      
  }

};
</script>
