<template>
    <Modal v-model="value1" scrollable :title="title" :width="width" @on-ok="Ok">
        <my-form :model="model" :eventhub="event"></my-form>
    </Modal>
</template>
<script>
import EVENT from '../event'
export default {
    props:['title','width','eventhub','model'],
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
        Ok(){
            this.event.$emit(`${EVENT.SHOW}-`)
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
