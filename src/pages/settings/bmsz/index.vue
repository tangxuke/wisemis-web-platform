<template>
<d2-container>
    <Row  :gutter="16">
        <Col span="10">
            <Row>
                <department-tree :eventhub="eventhub"></department-tree>
            </Row>
            <Row>
                <department-dialog :eventhub="eventhub" ref="dialog"></department-dialog>
                <Button type="success" @click="show">选择部门</Button>
            </Row>

        </Col>
        <Col span="14">
            <Row>
                <department-form :eventhub="eventhub"></department-form>
            </Row>
            <Row>
                <my-table model="department"></my-table>
            </Row>
        </Col>
    </Row>   
    <div id="test"></div>
</d2-container>
</template>

<script>
import Vue from 'vue'

export default {
    data(){
        return {
            visible:false
        }
    },
    computed:{
        eventhub:function(){
            return this;
        },
        returnValue:function(){
            return this.$refs.dialog.returnValue;
        }
    },
    methods:{
        show(){
            this.$refs.dialog.ShowDialog();
        }
    },
    created:function(){
        this.eventhub.$on('RETURN-VALUE',value=>{
            alert(value);
        })
    }
}
</script>

