//注册公共对话框

import Vue from 'vue';

//打开文本对话框
import OpenTextDialog from './open-text-dialog';
//选择数据对话框
import SelectDataDialog from './select-data-dialog';

//公共对话框注册到公共变量this.$dialog
Vue.prototype.$dialogs={
    OpenTextDialog,
    SelectDataDialog
}

/**
 * 打开文本对话框使用方法：
 * 组件内使用：
 * this.$dialogs.OpenTextDialog('title','init value')
 * .then(value=>{
 *      //value是返回的文本
 * })
 * .catch(()=>{
 *     //用户取消
 * });
 * 组件外使用把this.$dialogs换成 myVue.$dialogs 即可。
 */