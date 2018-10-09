import MyOpenTextDialog from './dialog';

import Vue from 'vue';

/**
 * 选择数据对话框
 * @param {string} title 标题
 * @param {string} value 初始值
 * @returns {Promise<string>}
 */
function OpenTextDialog(title,value){

    var p=new Promise(function(resolve,reject){
        var instance=new Vue({
            components:{
                'my-open-text-dialog':MyOpenTextDialog
            },
            render(h){
                return h('my-open-text-dialog',{
                    props:{
                        title,value
                    },
                    on:{
                        'ON-OK':(value)=>{
                            resolve(value);
                        },
                        'ON-CANCEL':()=>{
                            reject();
                        }
                    }
                });
            }
        });

        var component=instance.$mount();
        component.$children[0].$children[0].ShowDialog();
        document.body.appendChild(component.$el);
    });

    return p;
}

export default OpenTextDialog;

