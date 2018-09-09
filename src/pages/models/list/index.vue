<template>
    <d2-container>
        <Row>
            <my-toolbar model="model" :eventhub="eventhub"></my-toolbar>
        </Row>
        <Row>
            <my-table model="model" :eventhub="eventhub" :showPage="true"></my-table>
        </Row>
        <Row>
            <my-relations model="model" :eventhub="eventhub"></my-relations>
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
