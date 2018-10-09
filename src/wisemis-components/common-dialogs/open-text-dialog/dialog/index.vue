<template>
    <my-modal :title="title || '文本编辑器'" :width="600" @OK="onOK" @CANCEL="onCancel" ref="dialog">
        <Input 
            type="textarea" 
            v-model="value1" 
            :rows="15"
            ref="control"
            @on-keydown="onKeyDown"
            />
    </my-modal>
</template>

<script>
export default {
    props:['title','value'],
    data(){
        return {
            value1:''
        }
    },
    methods:{
        /**
         * 按键事件，用于控制Tab键缩进
         * @param {KeyboardEvent} event
         */
        onKeyDown(event){
            if(event.keyCode===9){
                var input=this.$refs.control.$el.childNodes[0];
                //var input=document.getElementsByTagName('input')[0];
                var position=input.selectionStart+1;
                input.value=input.value.substr(0,input.selectionStart)+String.fromCharCode([9])+input.value.substr(input.selectionStart);
                input.selectionStart=position;
                input.selectionEnd=position;
                input.focus();
                event.preventDefault();
            }
        },
        onOK(){
            this.$emit('ON-OK',this.value1);
        },
        onCancel(){
            this.$emit('ON-CANCEL');
        }
    },
    created(){
        this.value1=this.value;
    }
}
</script>
