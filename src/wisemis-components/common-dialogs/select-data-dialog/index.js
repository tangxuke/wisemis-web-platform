import MySelectDataDialog from './dialog';

import Vue from 'vue';

/**
 * 选择数据对话框
 * @param {string} title 标题
 * @param {string} sql SQL语句
 * @param {any[]} params SQL参数数组
 * @param {string} database 数据库
 * @returns {Promise<DataRow>}
 */
function SelectDataDialog(title,sql,params,database){

    var p=new Promise(function(resolve,reject){
        var instance=new Vue({
            components:{
                'my-select-data-dialog':MySelectDataDialog
            },
            render(h){
                return h('my-select-data-dialog',{
                    props:{
                        title,sql,params,database
                    },
                    on:{
                        'ON-OK':(row)=>{
                            resolve(row);
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

export default SelectDataDialog;

