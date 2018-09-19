<template>
    <Modal v-model="value1" scrollable :title="title" :width="width" @on-ok="$emit('OK')" @on-cancel="$emit('CANCEL')">
        <slot></slot>
    </Modal>
</template>
<script>
export default {
    props:['title','width'],
    data(){
        return {
            value1:false
        }
    },
    methods:{
        /**
         * 显示对话框
         */
        ShowDialog(){
            this.value1=true;
        }
    }
}
</script>
