
<template>
    <d2-container>
        <Row>
            员工信息管理
        </Row>
        <Row>
            <button @click="test">Test</button>
        </Row>
    </d2-container>
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
