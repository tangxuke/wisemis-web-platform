<template>
    <Modal v-model="value1" scrollable :title="title" :width="width" @on-ok="ok" @on-cancel="cancel">
        <my-form :model="model" ref="form"></my-form>
    </Modal>
</template>
<script>
export default {
    props:['title','width','model'],
    data(){
        return {
            value1:false
        }
    },
    methods:{
        getForm(){
            return this.$refs.form;
        },
        ok(){
            this.$emit('OK');
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
                this.$on('OK',()=>{
                    this.$refs.form.save()
                    .then(value=>{
                        resolve(value);
                    })
                    .catch(reason=>{
                        reject(reason);
                    })
                });
            });
        }
    }
}
</script>
