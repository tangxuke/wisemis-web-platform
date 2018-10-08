<template>
    <my-modal :title="title || '数据选择框'" :width="600" @OK="onOK" @CANCEL="onCancel" ref="dialog">
        <Table :columns="columns" :data="data" @on-row-click="onRowClick" @on-row-dblclick="onRowDblClick" :highlight-row="true"></Table>
    </my-modal>
</template>

<script>
export default {
    props:['title','sql','params','database'],
    data(){
        return {
            columns:[],
            data:[],
            row:null
        }
    },
    methods:{
        onOK(){
            this.$emit('ON-OK',this.row);
        },
        onCancel(){
            this.$emit('ON-CANCEL');
        },
        onRowClick(data){
            this.row=data;
        },
        onRowDblClick(data){
            this.row=data;
            this.$refs.dialog.value1=false;
            this.onOK();
        },
        refresh(){
            this.$methods.getSqlResults(this.sql,this.params,this.database)
                .then(value=>{
                    this.columns=value.fields.map(item=>{
                        return {
                            key:item.name,
                            title:item.name
                        }
                    });
                    this.data=value.results;
                })
        }
    },
    created(){
        this.refresh();
    }
}
</script>
