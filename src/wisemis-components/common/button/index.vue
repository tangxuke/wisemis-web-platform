<template>
    <Button :disabled="!enabled" :type="type" @click="onclick">
        <slot>My Button</slot>
    </Button>
</template>
<script>
export default {
    props:{
        model:{
            type:String
        },
        action:{
            type:String
        },
        type:{
            type:String,
            default:'primary'
        },
        eventhub:{
            type:Object
        }
    },
    computed:{
        event:function(){
            return this.eventhub || this;
        }
    },
    data(){
        return {
            enabled:true
        }
    },
    methods:{
        onclick:function(){
            
            if(!this.model || !this.action){
                alert('必须设置model和action属性！');
                return;
            }
            //提交

        }
    },
    created:function(){
        //按钮对行数据的变化感兴趣
        this.event.$on(`ROW-DATA-${this.model}`,data=>{
            this.event.$emit(`BUTTON-STATE-${this.model}-save`,true);
        })

        //接受按钮是否可用的消息
        this.event.$on(`BUTTON-STATE-${this.model}-${this.action}`,enabled=>{
            this.enabled=enabled;
        })
    }
}
</script>
