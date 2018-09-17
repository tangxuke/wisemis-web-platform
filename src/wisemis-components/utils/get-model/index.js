/**
 * 获取模型对象
 * @param {string} modelName 模型名称
 * @returns {Promise}
 */
function GetModel(vm,modelName){
    return new Promise(function(resolve,reject){
        vm.$axios.post(`/models/${modelName}`)
        .then(value=>{
            if(value.success){
                resolve(value.result);
            }else{
                reject(new Error(value.message));
            }
        })
        .catch(reason=>{
            reject(reason);
        });
    });
}

export default GetModel;