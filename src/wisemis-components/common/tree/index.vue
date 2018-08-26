<template>
    <Tree :data="data5" :render="renderContent"></Tree>
</template>
<script>
    export default {
        props:{
            model:{
                type:String,
                required:true
            },
            action:{
                type:String,
                default:'tree'
            },
            event:{
                type:Object
            }
        },
        data () {
            return {
                data5: [],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                }
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span',{
                        style:{
                            cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                                this.expand({ root, node, data });
                            }
                        }
                    }, [
                        h('Icon', {
                            props: {
                                type: data.icon,
                                size:20
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            expand({ root, node, data }){
                if(data.expand)
                    this.$set(data,'expand',false);
                else
                    this.$set(data,'expand',true);
                //发出节点数据改变通知
                this.$eventhub.$emit(`ROW-DATA-${this.model}`,data);
                
            },
            append (data) {
                //发出节点数据改变通知
                this.$eventhub.$emit(`ROW-NEWCHILD-${this.model}`,data);
            },
            remove (root, node, data) {
                /*
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
                */
                //删除节点
                this.$axios.post(`/models/${this.model}/delete`,data)
                .then(value=>{
                    if(value.success){
                        //发出节点数据改变通知
                        this.$eventhub.$emit(`ROW-REMOVE-${this.model}`,data);
                        this.$eventhub.$emit(`DATA-${this.model}`,data);
                    }else{
                        alert(value.message);
                    }
                })
                .catch(reason=>{
                    alert(reason.message);
                })
                
            },
            getModelData(){
                if(!this.model){
                    console.log('没有设置模型名称！');
                    return;
                }
                this.$axios.post(`/models/${this.model}/${this.action}`).then(value=>{

                    if(value.success){
                        this.data5=value.result.map(item=>{
                            item['expand']=true;
                            return item;
                        });
                    }else{
                        alert(value.message)
                    }
                }).catch(reason=>{
                    alert(reason.message);
                })
            }
        },
        mounted:function(){
            this.getModelData();
        },
        created:function(){
            this.$eventhub.$on(`DATA-${this.model}`,data=>{
                this.getModelData();
            })
        }
    }
</script>
