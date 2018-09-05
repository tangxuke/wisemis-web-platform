<template>
    <d2-container>
        <Row>
            <my-form model="model-fields" :eventhub="event"></my-form>
        </Row>
        <Row>
            <my-table model="model-fields" :eventhub="event"></my-table>
        </Row>
    </d2-container>
</template>

<script>
export default {
    computed:{
        event:function(){
            return this;
        }
    }
}
</script>

