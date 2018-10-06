<template>
    <d2-container>
        <Row>
            预览模型：{{modelName}}
        </Row>
        <Row>
            <my-table :model="modelName"></my-table>
        </Row>
    </d2-container>
</template>

<script>
export default {
    computed:{
        modelName(){
            return this.$route.params.model;
        }
    }
}
</script>
