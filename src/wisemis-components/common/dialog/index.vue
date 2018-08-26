<template>
    <Modal v-model="value1" draggable scrollable :title="title" ref="dialog">
            <slot>模态框内容</slot>
            <div slot="footer">
                <div style="float:left;line-height:30px;padding:5px 0;">
                    已选择：
                    <span style="border-bottom: 1px dotted green;display:inline-block;width:150px;text-align:center;">
                        {{selectedValue}}
                    </span>
                </div>
                <div style="float:right;line-height:30px;padding:5px 0;">
                    <Button type="success" style="padding:5px 20px;" @click="ok">确定</Button>
                    <Button type="default" style="padding:5px 10px;" @click="cancel">取消</Button>
                </div>
            </div>
    </Modal>
</template>
<script>
export default {
    props:['title','eventhub'],
    data(){
        return {
            value1:false,
            selectedValue:null
        }
    },
    computed:{
        event:function(){
            return this.eventhub || this;
        }
    },
    methods:{
        /**
         * 显示对话框
         */
        ShowDialog(){
            this.value1=true;
            this.selectedValue=null;
        },
        ok(){
            this.$refs.dialog.ok();
            this.event.$emit('RETURN-VALUE',this.selectedValue);
        },
        cancel(){
            this.$refs.dialog.cancel();
        }
    },
    created:function(){
        //用户所选的值
        this.event.$on('SET-VALUE',(value)=>{
            this.selectedValue=value;
        });
    }
}
</script>
