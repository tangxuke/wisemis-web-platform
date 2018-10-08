import Vue from 'vue';

/**
 * 打开文本对话框
 * @param {string} title 标题
 * @param {string} str 初始值
 * @returns {Promise<string>}
 */
function openText(title,str){
    return new Promise((resolve,reject)=>{
        var instance=new Vue({
            data(){
                return {
                    value:str
                }
            },
            methods:{
                OK(){
                    resolve(this.value);
                },
                CANCEL(){
                    reject();
                }
            },
            render(h){
                var _this=this;
                return h('Modal',{
                    props:{
                        title:title,
                        width:600,
                        value:true
                    },
                    on:{
                        'on-ok':function(){
                            _this.OK();
                        },
                        'on-cancel':function(){
                            _this.CANCEL();
                        }
                    }
                },[h('Input',{
                    props:{
                        value:this.value,
                        type:'textarea',
                        rows:15
                    },
                    on:{
                        input(event){
                            _this.value=event;
                        }
                    }
                })]);
            }
        });

        var component=instance.$mount();
        document.body.appendChild(component.$el);
    });
}

export default openText;