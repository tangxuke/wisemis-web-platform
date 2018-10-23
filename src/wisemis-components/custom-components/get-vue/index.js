/**
 * 从JSON对象生成Vue实例
 * @param {{data,computed,methods,render,mounted,created,props}} oVueObject JSON对象
 */
function GetVueFromJsonObject(oVueObject) {
    var data = new Function(oVueObject.data);
    var computed = {};
    Object.keys(oVueObject.computed).forEach(key => {
        var item = oVueObject.computed[key];
        if (typeof item === 'string')
            computed[key] = new Function(item);
        else {
            var get = new Function(item.get);
            var set = new Function(...item.set);
            computed[key] = {
                get,
                set
            };
        }
    });
    var methods = {};
    Object.keys(oVueObject.methods).forEach(key => {
        var item = oVueObject.methods[key];
        methods[key] = new Function(...item);
    });
    var render = new Function(...oVueObject.render);
    var props = oVueObject.props.split(',');
    var mounted = new Function(oVueObject.mounted);
    var created = new Function(oVueObject.created);
    var watch = {};
    if (!oVueObject.watch)
        oVueObject.watch = {};
    Object.keys(oVueObject.watch).forEach(key => {
        var item = oVueObject.watch[key];
        watch[key] = new Function(...item);
    });

    var instance = {
        data,
        computed,
        methods,
        render,
        props,
        mounted,
        created,
        watch
    };

    return instance;
}

export default GetVueFromJsonObject;