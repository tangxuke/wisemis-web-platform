<template>
    <Input 
    type="text" 
    v-model="value1" 
    :placeholder="placeholder"
    @on-blur="onBlur"
    ref="input"
    ></Input>
</template>
<script>
export default {
    props:['value','placeholder'],
    data(){
        return {
            value1:''
        }
    },
    methods:{
        onBlur(){
            this.$emit('blur');
        },
        setFocus(){
            this.$refs.input.focus();
        }
    },
    watch:{
        value(val){
            if(this.value1===val)
                return;
            this.value1=val;
        },
        value1(val){
            this.$emit('input',val);
        }
    }
}

</script>
