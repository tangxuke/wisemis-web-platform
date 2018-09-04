
<template>
    <d2-container>
            <Row>
                <my-form model="classroom" :eventhub="eventhub"></my-form>
            </Row>
            <Row>
                <my-table model="classroom" :eventhub="eventhub"></my-table>
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