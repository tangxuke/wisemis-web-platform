<template>
    <Input type="textarea" v-model="value1" :placeholder="placeholder" :rows="rows" ref="control" @on-keydown="onKeyDown" @on-change="onChange"/>
</template>

<script>
export default {
    props:{
        rows:{
            type:Number,
            default:2
        },
        value:{
            type:String
        },
        placeholder:{
            type:String
        }
    },
    data(){
        return {
            value1:''
        }
    },
    methods:{
        onChange(){
            this.$emit('input',this.value1);
        },
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
        }
    },
    created() {
        this.value1=this.value;
    },
}
</script>
