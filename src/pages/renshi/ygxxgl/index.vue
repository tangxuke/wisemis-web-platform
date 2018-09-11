
<template>
    <my-model-page model="model">
        <my-button></my-button>
    </my-model-page>
</template>

<script>
export default {
    methods:{
        test:function(){
            this.$axios.post('models/classroom/save',{
                name:'test'
            }).then(value=>{
                alert(JSON.stringify(value));
            }).catch(reason=>{
                alert(reason.message);
            })
        }
    }
}
</script>
