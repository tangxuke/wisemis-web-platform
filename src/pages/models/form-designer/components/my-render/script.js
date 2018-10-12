export default {
    props:['oVue'],
    data(){
        return {
            data1:[
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
            columns:[
                {key:''}
            ],
            isTextNode:false,
            tag:'',
            text:'',
            tagType:'component',
            selectedNode:null,
            selectedTab:'tag'
        }
    },
    computed:{
        treeNodes(){
            var nodes=[];
            this.data1.forEach(item=>{
                var childNodes=this.getNodes(item);
                nodes.push(...childNodes);
            })
            return nodes;
        }
    },
    methods:{
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
            var selectedNodes=this.$refs.tree.getSelectedNodes();
            if(selectedNodes.length===0){
                this.data1.push({
                    title:'未定义节点'
                })
            }else{
                var selectedNode=selectedNodes[0];
                var children=selectedNode.children || [];
                children.push({title:'未定义节点'});
                this.$set(selectedNode, 'children', children);
                selectedNode.expand=true;
            }
        },
        AppendSameLevelNode(){
            var selectedNodes=this.$refs.tree.getSelectedNodes();
            if(selectedNodes.length===0){
                this.data1.push({
                    title:'未定义节点'
                })
            }else{
                var selectedNode=selectedNodes[0];
                var parentNode=this.treeNodes.find(item=>{
                    return item.nodeKey===selectedNode.parentNodeKey;
                });
                if(parentNode){ 
                    var children=parentNode.children || [];
                    children.push({title:'未定义节点'});
                    this.$set(parentNode, 'children', children);
                    parentNode.expand=true;
                }else{
                    this.data1.push({
                        title:'未定义节点'
                    });
                }
            }
        },
        onSelectChange(nodes){
            this.selectedNode=nodes[0];
            this.isTextNode=this.selectedNode.isTextNode
            this.tag=this.selectedNode.tag;
            this.tagType=this.selectedNode.tagType;
            this.text=this.selectedNode.text;
        },
        Apply(){
            if(this.isTextNode){
                this.selectedNode.tag=null;
                this.selectedNode.text=this.text;
                this.selectedNode.title=this.text;
            }else{
                this.selectedNode.tag=this.tag;
                this.selectedNode.text=null;
                this.selectedNode.title=this.tag;
            }
            this.selectedNode.tagType=this.tagType;
            this.selectedNode.isTextNode=this.isTextNode;
            this.Clear();
        },
        Clear(){
            this.isTextNode=false,
            this.tag='',
            this.text='',
            this.tagType='component',
            this.selectedNode=null;
        }
    }
}