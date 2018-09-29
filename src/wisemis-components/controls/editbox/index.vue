<template>
    <Input 
    type="textarea" 
    v-model="value1" 
    :placeholder="placeholder"
    :rows="4"
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
