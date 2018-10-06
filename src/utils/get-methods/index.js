import axios from './../../plugin/axios';

/**
 * 注册自定义方法
 * @returns {any}
 */
function GetMethods(){
    var methods={};

    var body={
        sql:'select * from methods',
        params:[],
        database:'wisemis'
    };
    axios.post('/query',body)
    .then(value=>{
        if(value.success){            
            value.result.forEach(element => {
                var params=element.params || '';
                var aParams=params.split(',');
                var code=element.code;
                var fn=new Function(...aParams,code);
                methods[element.name]=fn;
            });
        }
    })
    .catch(reason=>{
        console.log(reason);
    });

    return methods;
}

export default GetMethods;