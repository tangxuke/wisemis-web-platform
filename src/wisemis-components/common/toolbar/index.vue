<template>
<div  style="padding:5px;">
    <Button 
        v-for="tool in toolbar" 
        :type="tool.type" 
        :disabled="!tool.enable" 
        :key="tool.name" 
        @click="doAction(tool)"
        style="margin-right:5px;"
    >
        {{tool.label}}
    </Button>
</div>
</template>
<script>
    export default {
        props:['model','eventhub'],
        data(){
            return {
                toolbar:[]
            }
        },
        computed:{
            event:function(){
                return this.eventhub || this;
            }
        },
        methods:{
            doAction:function(tool){
                if(tool.confirm){
                    this.$Modal.confirm({
                        title:'系统提示',
                        content:'你真的要执行['+tool.label+']功能吗？',
                        onOk:()=>{
                            this.do(tool);
                        }
                    })
                }else{
                    this.do(tool);
                }
            },
            do:function(tool){
                switch(tool.action){
                    case 'open':
                        this.$router.push(tool.params);
                        break;
                }
            },
            getToolbar:function(){
                this.$axios.post(`/models/${this.model}/toolbar`,{})
                .then(value=>{
                    if(value.success){
                        this.toolbar=value.result;
                    }
                })
            }
        },
        mounted:function(){
            this.getToolbar();
        },
        created:function(){
            this.event.$on(`ACTION-CLICK-${this.model}`,data=>{

            });
        }
    }
</script>
