
<template>
    <d2-container>
        关于...
        <p>
            {{v}}
        </p>
        <Button @click="openText">Open Text</Button>
    </d2-container>
</template>

<script>

export default {
    data(){
        return {
            v:''
        }
    },
    methods:{
        openText(){
            this.$dialog.OpenTextDialog('这是我的标题','tangxuke')
            .then(value=>{
                this.v=value;
            })
            .catch(()=>{
                this.v='CANCEL!';
            });
        }
    }
}
</script>
