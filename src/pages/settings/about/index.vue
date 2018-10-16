
<template>
    <d2-container>
        关于...
        <p>
            {{v}}
        </p>
        <base-editbox v-model="v"></base-editbox>
    </d2-container>
</template>

<script>






export default {
    data(){
        return {
            v:'test'
        }
    },
    watch:{
        v(newValue,oldValue){
            console.log(newValue,oldValue);
        }
    },
    mounted() {
        console.log(this);
    },
}
</script>
