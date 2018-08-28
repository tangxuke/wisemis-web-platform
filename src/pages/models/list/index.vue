<template>
    <d2-container>
        <Row>
            <Col span="12">
                <my-form model="model" :eventhub="eventhub"></my-form>
            </Col>
            <Col span="12">
                <model-table :eventhub="eventhub"></model-table>
            </Col>
        </Row>
    </d2-container>
</template>

<script>
export default {
    computed:{
        eventhub:function(){
            return this;
        }
    }
}
</script>
