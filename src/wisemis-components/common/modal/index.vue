<template>
    <Modal 
        v-model="value1" 
        scrollable 
        :title="title" 
        :width="width" 
        :loading="loading"
        @on-ok="onOK" 
        @on-cancel="$emit('CANCEL')"
        ref="modal"
        >
        <slot></slot>
    </Modal>
</template>
<script>
export default {
    props:['title','width','loading'],
    data(){
        return {
            value1:false
        }
    },
    methods:{
        onOK(){
            this.$emit('OK',this)
        },
        /**
         * 显示对话框
         */
        ShowDialog(){
            this.value1=true;
        }
    }
}
</script>
