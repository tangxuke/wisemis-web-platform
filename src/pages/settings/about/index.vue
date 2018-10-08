
<template>
    <d2-container>
        关于...
        <p>
            {{v}}
        </p>
        <Button @click="openText">Open Text</Button>
        <Button @click="selectData">Select Data Dialog</Button>
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
        selectData(){
            this.$dialogs.SelectDataDialog('选择模型','select name,title from model',[],'wisemis')
            .then(value=>{
                this.v=JSON.stringify(value);
            })
            .catch(()=>{
                alert('用户取消');
            });
        },
        openText(){
            this.$dialogs.OpenTextDialog('这是我的标题','tangxuke')
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
