<template>
    <Input
        v-model="value"
        placeholder="模糊查询请加 % 符号"
        />
</template>

<script>
export default {
    props:['oFieldObject'],
    data(){
        return {
            value:''
        }
    },
    methods:{
        getSearchExpr(){
            return '`'+this.oFieldObject.Name+'` like '+`'${this.value}'`;
        }
    }
}
</script>
