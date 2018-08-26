<template>
    <my-dialog title="选择部门" ref="dialog">
        <department-tree></department-tree>
    </my-dialog>
</template>
<script>
export default {
    methods:{
        /**
         * 显示对话框
         * @param {boolean} visible
         */
        ShowDialog(visible){
            this.$refs.dialog.ShowDialog(visible);
        }
    }
}
</script>
