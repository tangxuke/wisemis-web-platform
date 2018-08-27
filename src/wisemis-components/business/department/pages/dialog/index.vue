<template>
    <my-dialog title="选择部门" ref="dialog" :eventhub="event">
        <department-tree :eventhub="event" :editable="false"></department-tree>
    </my-dialog>
</template>
<script>
export default {
    props:['eventhub'],
    methods:{
        /**
         * 显示对话框
         */
        ShowDialog(){
            this.$refs.dialog.ShowDialog();
        }
    },
    computed:{
        event:function(){
            return this.eventhub || this;
        },
        returnValue:function(){
            return this.$refs.dialog.returnValue;
        }

    },
    created:function(){
        this.event.$on('ROW-DATA-department',data=>{
            this.event.$emit('SET-VALUE',data)
        })
    }
}
</script>
