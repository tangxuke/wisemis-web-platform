<style>
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
<template>
    <Row class="demo-tabs-style2">
        <Tabs type="card"  :animated="false">
            
            <TabPane v-for="relation in relations" :label="relation.title" :key="relation.childModel">
                <my-table :model="relation.childModel" :eventhub="eventhub"></my-table>
            </TabPane>
        </Tabs>
    </Row>
</template>
<script>
    export default {
        props:['model','eventhub'],
        data(){
            return {
                relations:[]
            }
        },
        computed:{
            event:function(){
                return this.eventhub || this;
            }
        },
        methods:{
            getRelations(){
                this.$axios.post(`/models/${this.model}/relations`,{})
                .then(value=>{
                    if(value.success){
                        this.relations=value.result.map(item=>{
                            item.title=item.childModel;
                            return item;
                        });
                        this.getTitle();
                    }
                })
            },
            getTitle(){
                this.relations.forEach(element => {
                    this.$axios.post(`/models/${element.childModel}/object`,{})
                    .then(value=>{
                        if(value.success){
                            element.title=value.result.Title;
                        }
                    })
                });
            }
        },
        mounted:function(){
            this.getRelations();
        },
        created:function(){
            this.event.$on(`ROW-DATA-${this.model}`,data=>{
                this.relations.forEach(relation=>{
                    let modelName=relation.childModel;
                    let mainFields=relation.mainFields;
                    let childFields=relation.childFields;
                    let where=[];
                    let arrMainFields=mainFields.split(',');
                    let arrChildFields=childFields.split(',');
                    for(let i=0;i<arrMainFields.length;i++){
                        where.push(
                            {
                                key:arrChildFields[i],
                                value:data[arrMainFields[i]]
                            }
                        )
                    };
                    var data1={where};
                    this.event.$emit(`DATA-${modelName}`,data1);
                })
            })
        }
    }
</script>
