<template>
    <my-form model="department" ref="myform"></my-form>
</template>
<script>
export default {
    created:function(){
        this.$eventhub.$on(`ROW-NEWCHILD-department`,data=>{

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