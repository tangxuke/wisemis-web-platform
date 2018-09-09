<template>
    <Modal v-model="value1" scrollable :title="title" :width="400" ref="dialog">
        <my-form :model="model" :eventhub="eventhub"></my-form>
    </Modal>
</template>
<script>
export default {
    props:['title','eventhub','model'],
    data(){
        return {
            value1:false
        }
    },
    computed:{
        event:function(){
            return this.eventhub || this;
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
