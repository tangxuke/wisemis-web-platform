//注册公共对话框

import Vue from 'vue';

//打开文本对话框
import OpenTextDialog from './open-text-dialog';

//公共对话框注册到公共变量this.$dialog
Vue.prototype.$dialog={
    OpenTextDialog
}

/**
 * 打开文本对话框使用方法：
 * 组件内使用：
 * this.$dialog.OpenTextDialog('title','init value')
 * .then(value=>{
 *      //value是返回的文本
 * })
 * .catch(()=>{
 *     //用户取消
 * });
 * 组件外使用把this.$dialog换成 myVue.$dialog 即可。
 */