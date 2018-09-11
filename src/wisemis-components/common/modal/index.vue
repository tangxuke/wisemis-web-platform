<template>
    <Modal v-model="value1" scrollable :title="title" :width="width" @on-ok="ok" @on-cancel="cancel">
        <my-form :model="model" :eventhub="event" ref="form"></my-form>
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
        ok(){
            this.$emit('OK',this.$refs.form.fields);
        },
        cancel(){
            this.$emit('CANCEL');
        },
        /**
         * 显示对话框
         */
        ShowDialog(){
            this.value1=true;
            return new Promise((resolve,reject)=>{
                this.$on('OK',(fields)=>{
                    resolve(fields)
                });
                this.$on('CANCEL',()=>{
                    reject(new Error('CANCEL'))
                });
            });
        }
    }
}
</script>
