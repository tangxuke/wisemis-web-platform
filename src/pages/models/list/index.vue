<template>
    <d2-container>
        <Row>
            <Col>
                <my-form model="model" :eventhub="eventhub"></my-form>
            </Col>
        </Row>
        <Row>
            <Col>
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
