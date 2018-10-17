//自定义组件（由页面设计器定义）

import Vue from 'vue';
import axios from '@/plugin/axios'
import GetVueFromJson from './get-vue';

var body={
    sql:'select * from components',
    params:[]
}

var isOK=false;

axios.post('/query',body)
.then(value=>{
    if(value.success){
        Array.from(value.result.results).forEach(item=>{

            var oVueJsonObject=JSON.parse(item.vue_code);
            var instance=GetVueFromJson(oVueJsonObject);
            Vue.component(item.tag,instance);
            console.log(oVueJsonObject);
            console.log(instance);
            
        });
        isOK=true;
    }else{
        console.log(value.message);
        isOK=true;
    }
})
.catch(reason=>{
    console.log(reason.message);
    isOK=true;
})

console.log('NEXT');