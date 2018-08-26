<template>
    <Modal v-model="value1" draggable scrollable :title="title">
            <slot>模态框内容</slot>
            <div slot="footer">
                <div style="float:left;line-height:30px;padding:5px 0;">
                    已选择：<span style="border-bottom: 1px dotted green;display:inline-block;width:200px;text-align:center;">test</span>
                </div>
                <div style="float:right;line-height:30px;padding:5px 0;">
                    <Button type="success" style="padding:5px 20px;" @click="">确定</Button>
                    <Button type="default" style="padding:5px 10px;" @click="">取消</Button>
                </div>
            </div>
    </Modal>
</template>
<script>
export default {
    props:['title','value'],
    data(){
        return {
            value1:false
        }
    },
    methods:{
        /**
         * 显示对话框
         * @param {boolean} visible 显示或隐藏
         */
        ShowDialog(visible){
            this.value1=visible;
        }
    }
}
</script>
