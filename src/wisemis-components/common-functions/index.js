//注册公共方法

import Vue from 'vue';
import axios from '@/plugin/axios'

//注册到公共方法到变量this.$methods
Vue.prototype.$methods = {};

/**
 * 使用方法：
 * 组件内使用：
 * this.$methods.xxx(...)
 * 组件外使用把this.$methods myVue.$methods 即可。
 */


/**
 * 注册自定义方法
 */
var body = {
    sql: 'select * from methods',
    params: []
};

axios.post('/query', body)
    .then(value => {
        if (value.success) {
            var methods={};
            value.result.results.forEach(element => {
                var params = element.params || '';
                var aParams = params.split(',');
                var code = element.code;
                var fn = new Function(...aParams, code);
                methods[element.name]=fn;
            });

            Vue.prototype.$methods=methods;
        }
    })
    .catch(reason => {
        console.log(reason);
    });