import Vue from 'vue';
import Tags from './../../tags'

export default {
    props:['oVue'],
    data(){
        return {
            props_name:'',
            props_value:'',
            props_rowindex:-1,
            show_all_props:false,
            props_columns:[
                {key:'type',title:'类型'},
                {key:'name',title:'属性名',
                    render:(h,{row,column,index})=>{
                        if(row.remark){
                            return h('Tooltip',{
                                props:{
                                    content:row.remark
                                }
                            },row.name);
                        }else{
                            return h('span',row.name);
                        }
                        
                    }},
                {key:'value',title:'属性值',ellipsis:true,tooltip:true},
                {title:'操作',fixed:'right',width:80,
                    render:(h,{row,column,index})=>{
                        var _this=this;
                        return h('Button',{
                            props:{
                                type:'text'
                            },
                            on:{
                                click:()=>{
                                    setTimeout(() => {
                                        var _index=_this.selectedNode.props_data.findIndex(item=>{
                                            return item.type===row.type && item.name===row.name;
                                        });
                                        if(_index>-1)
                                            _this.selectedNode.props_data.splice(_index,1);
                                        _this.ClearProp();
                                    }, 0);
                                    
                                }
                            }
                        },'Del')

                }},
            ],
            isTextNode:false,
            tag:'',
            text:'',
            key:'',
            ref:'',
            selectedNode:null,
            selectedTab:'tag',
            prop_type:'props',
            Tags:Tags
        }
    },
    computed:{
        data1(){
            return this.oVue.render;
        },
        props_data(){
            if(!this.selectedNode)
                return [];
            return this.selectedNode.props_data.filter(item=>{
                return item.type===this.prop_type || this.show_all_props;
            })
        },
        treeNodes(){
            var nodes=[];
            this.data1.forEach(item=>{
                var childNodes=this.getNodes(item);
                nodes.push(...childNodes);
            })
            return nodes;
        },
        RenderCode(){
            if(this.data1.length==0)
                return '';
            var root=this.data1[0];
            var code='return '+this.nodeToRender(root);
            //解析{{...}}
            return code;
        }
    },
    methods:{
        /**
         * 按键事件，用于控制Tab键缩进
         * @param {KeyboardEvent} event
         */
        onKeyDown(event){
            if(event.keyCode===9){
                var input=this.$refs.control.$el.childNodes[0];
                //var input=document.getElementsByTagName('input')[0];
                var position=input.selectionStart+1;
                input.value=input.value.substr(0,input.selectionStart)+String.fromCharCode([9])+input.value.substr(input.selectionStart);
                input.selectionStart=position;
                input.selectionEnd=position;
                input.focus();
                event.preventDefault();
            }
        },
        OnPropTypeChange(){
            this.ClearProp();
        },
        setPropsFromType(node,type,data){
            var _props=node.props_data.filter(item=>{
                return item.type===type;
            }).map(item=>{
                return item.name+':'+item.value;
            }).join(',');
            if(_props.length>0){
                _props=type+':{'+_props+'}';
                data.push(_props);
            }
        },
        /**
         * 
         * @param {Function} h 渲染函数
         * @param {{tag:string,isTextNode:boolean,text:string,props_data:[{type:string,name:string,value:string}],children:[{tag,isTextNode,text,props_data}]} node 节点
         */
        nodeToRender(node){
            //文本节点
            if(node.isTextNode)
                return `"${node.text}"`;
            //data

            var data=[];
            var _data='';
            if(node.key){
                data.push('key:'+`'`+node.key+`'`);
            }
            if(node.ref){
                data.push('ref:'+`'`+node.ref+`'`);
            }
            if(node.props_data.length>0){
                ['props','class','style','attrs','domProps','on'].forEach(type=>{
                    this.setPropsFromType(node,type,data);
                });
                
            }
            if(data.length>0){
                _data='{'+data.join(',')+'}';
            }
            
            //无属性
            if(_data.length===0){
                if(Array.isArray(node.children) && Array.from(node.children).length>0){
                    var childNodes=Array.from(node.children).map(item=>{
                        return this.nodeToRender(item);
                    });
                    return `h('${node.tag}',[${childNodes.join(',')}])`;
                }else{
                    return `h('${node.tag}')`;
                }
            }else{
                //有属性
                if(Array.isArray(node.children) && Array.from(node.children).length>0){
                    var childNodes=Array.from(node.children).map(item=>{
                        return this.nodeToRender(item);
                    });
                    return `h('${node.tag}',${_data},[${childNodes.join(',')}])`;
                }else{
                    return `h('${node.tag}',${_data})`;
                }
            }
        },
        onPropsRowClick(row,index){
            this.props_rowindex=index;
            this.props_name=row.name;
            this.props_value=row.value;
            this.prop_type=row.type;
        },
        ClearProp(){
            this.props_rowindex=-1;
            this.props_name='';
            this.props_value='';
        },
        ApplyProp(){
            if(this.props_rowindex>-1){
                this.selectedNode.props_data[this.props_rowindex].name=this.props_name;
                this.selectedNode.props_data[this.props_rowindex].value=this.props_value;
            }else{
                this.selectedNode.props_data.push({name:this.props_name,value:this.props_value,type:this.prop_type});
            }
            this.ClearProp();
        },
        newNode(){
            var node={
                title:'新节点',
                isTextNode:false,
                tagType:'component',
                tag:'',
                text:'',
                key:'',
                ref:'',
                customTag:false,
                props_data:[]
            };
            return node;
        },
        getParentNode(node){
            var parentNodeKey=node.parentNodeKey;
            if(parentNodeKey===null){
                //没有父节点，说明是顶层节点
                return null;
            }
            var parent=this.treeNodes.find(item=>{
                return item.nodeKey===parentNodeKey;
            });
            return parent;
        },
        RemoveNode(){
            var nodes=this.$refs.tree.getSelectedNodes();
            if(nodes.length===0)
                return;
            
            var node=nodes[0];

            var nodeKey=node.nodeKey;
            var parent=this.getParentNode(node);
            if(!parent){
                //顶层节点，从data1数组移除
                var index=this.data1.findIndex(item=>{
                    return item.nodeKey===nodeKey;
                });
                if(index>-1){
                    this.data1.splice(index,1);
                }
            }else{
                var children=parent.children;
                if(!Array.isArray(children))
                    return;
                var index=children.findIndex(item=>{
                    return item.nodeKey===nodeKey;
                });
                if(index>-1){
                    children.splice(index,1);
                    this.$set(parent,'children',children);
                }
            }
            this.Clear();
        },
        getNodes(node){
            var _this=this;
            var nodes=[node];
            if(Array.isArray(node.children)){
                node.children.forEach(item=>{
                    item.parentNodeKey=node.nodeKey;
                    var childNodes=_this.getNodes(item);
                    nodes.push(...childNodes);
                });
            }
            return nodes;
        },
        AppendChildLevelNode(){
            var newNode=this.newNode();
            var selectedNodes=this.$refs.tree.getSelectedNodes();
            if(selectedNodes.length===0){
                this.data1.push(newNode)
            }else{
                var selectedNode=selectedNodes[0];
                var children=selectedNode.children || [];
                children.push(newNode);
                this.$set(selectedNode, 'children', children);
                this.$set(selectedNode, 'expand', true);
            }
            this.Clear();
        },
        AppendSameLevelNode(){
            var selectedNodes=this.$refs.tree.getSelectedNodes();
            var newNode=this.newNode();
            if(selectedNodes.length===0){
                this.data1.push(this.newNode())
            }else{
                var selectedNode=selectedNodes[0];
                var parentNode=this.treeNodes.find(item=>{
                    return item.nodeKey===selectedNode.parentNodeKey;
                });
                if(parentNode){ 
                    var children=parentNode.children || [];
                    children.push(newNode);
                    this.$set(parentNode, 'children', children);
                }else{
                    this.data1.push(newNode);
                }
            }
            this.Clear();
        },
        onSelectChange(nodes){
            this.selectedTab="tag";

            if(!Array.isArray(nodes) || Array.from(nodes).length===0)
                return;

            var node=nodes[0];
            this.selectedNode=node;
            
            this.isTextNode=this.selectedNode.isTextNode
            this.tag=this.selectedNode.tag;
            this.tagType=this.selectedNode.tagType;
            this.text=this.selectedNode.text;
            this.key=this.selectedNode.key;
            this.ref=this.selectedNode.ref;
        },
        Apply(){
            if(this.isTextNode){
                this.selectedNode.tag=null;
                this.selectedNode.text=this.text;
                this.selectedNode.title='string：'+this.text;
            }else{
                this.selectedNode.tag=this.tag;
                this.selectedNode.text=null;
                this.selectedNode.title='<'+this.tag+(this.selectedNode.props_data.length>0?' ... ':'')+'>';
            }
            this.selectedNode.tagType=this.tagType;
            this.selectedNode.isTextNode=this.isTextNode;
            this.selectedNode.key=this.key;
            this.selectedNode.ref=this.ref;
            this.selectedNode.selected=false;
            this.Clear();
        },
        Clear(){
            this.isTextNode=false,
            this.tag='',
            this.text='',
            this.key='',
            this.ref='',
            this.tagType='component',
            this.selectedNode=null;
        }
    }
}