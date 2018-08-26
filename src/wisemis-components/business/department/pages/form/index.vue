<template>
    <my-form model="department" ref="myform" :eventhub="eventhub"></my-form>
</template>
<script>
export default {
    props:{
        eventhub:{
            type:Object
        }
    },
    created:function(){
        var event=this.eventhub || this;
        event.$on(`ROW-NEWCHILD-department`,data=>{

          this.$refs.myform.fields.forEach(item=>{
                if(item.Name=='parentid')
                    item.Value=data['id'];
                else
                    item.Value=null;
          });
      });
    }
}
</script>