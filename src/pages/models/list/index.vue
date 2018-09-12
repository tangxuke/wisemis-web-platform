<template>
    <d2-container>
        <Row>
            <Col :span="8">
                <my-table model="model" :eventhub="event"></my-table>
            </Col>
            <Col :span="16">
                <Row>
                    <my-form model="model" :eventhub="event"></my-form>
                </Row>
                <Row>
                    <my-relations model="model" :eventhub="event"></my-relations>
                </Row>
            </Col>
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
