<template>
<d2-container>
    <Row  :gutter="16">
        <Col span="10">
            <Row>
                <department-tree></department-tree>
            </Row>
            <Row>
                <department-dialog ref="dialog"></department-dialog>
                <Button type="success" @click="show">选择部门</Button>
            </Row>

        </Col>
        <Col span="14">
            <department-form></department-form>
        </Col>
    </Row>   
</d2-container>
</template>

<script>
export default {
    data(){
        return {
            visible:false
        }
    },
    methods:{
        show(){
            this.$refs.dialog.ShowDialog(true);
        }
    }
}
</script>
