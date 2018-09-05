<template>
    <d2-container>
        <Row>
            <my-form model="model" :eventhub="eventhub"></my-form>
        </Row>
        <Row>
            <model-table :eventhub="eventhub"></model-table>
        </Row>
        <Row>
            <my-form model="model-fields" :eventhub="eventhub"></my-form>
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
