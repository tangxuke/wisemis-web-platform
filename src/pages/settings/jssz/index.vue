
<template>
    <d2-container>
        <Row>
            <Button type="success" @click="$refs.dialog.ShowDialog()">教师布局</Button>
        </Row>
            <Row>
                <my-form model="classroom" :eventhub="eventhub"></my-form>
            </Row>
            <Row>
                <my-table model="classroom" :eventhub="eventhub" :pagesize="5"></my-table>
            </Row>
            <my-dialog ref="dialog">
                <classroom-layout></classroom-layout>
            </my-dialog>
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