<template>
    <Input 
    type="textarea" 
    v-model="oFieldObject.Value" 
    :placeholder="'请输入'+oFieldObject.Title+'...'"
    :rows="1"
    :autosize="oFieldObject.ControlHeight===0"
    ref="control"
    @on-keydown="onKeyDown"
    />
</template>
<script>
export default {
    props:['oFieldObject'],
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
        }
    }
}

</script>

