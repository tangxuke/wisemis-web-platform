<template>
    <Checkbox v-model="value" />
</template>
<script>
export default {
    props:['oFieldObject'],
    data(){
        return {
            value:false
        }
    },
    methods:{
        getSearchExpr(){
            return 'IFNULL(`'+this.oFieldObject.Name+'`,0)='+(this.value?'1':'0');
        }
    }
}
</script>
