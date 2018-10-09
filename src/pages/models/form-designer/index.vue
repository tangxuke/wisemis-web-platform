<template>
    <d2-container>
        <Row>
            <Button type="dashed" @click="writeCode">代码...</Button>
        </Row>
        <Row>
            <div is="input" id="demo">
            </div>
        </Row>
    </d2-container>
</template>

<script>
import Vue from 'vue';

export default {
    data(){
        return {
            code:''
        }
    },
    methods:{
        writeCode(){
            this.$dialogs.OpenTextDialog('编辑代码',this.code)
                .then(value=>{
                    this.code=value;
                    var element=JSON.parse(value);
                    console.log(element);
                    var instance=new Vue({
                        render(h){
                            return this.createMyElement(h,element);
                        }
                    });
                    var component=instance.$mount();
                    document.getElementById('demo').appendChild(component.$el);
                })
                .catch(()=>{});
        },
        /**
         * 渲染函数
         * @param {Function} h 渲染函数
         * @param {{tag:string,props:object,children:{tag,props,children}[]}} e 需渲染的数据对象
         */
        createMyElement(h,e){
            if(Array.isArray(e.children) && Array.from(e.children).length>0)
                return h(e.tag,{props:{...e.props}},[...e.children.map(item=>{
                    return createMyElement(h,item);
                })]);
            else
                return h(e.tag,{props:{...e.props}});
        }
    }
}
</script>
