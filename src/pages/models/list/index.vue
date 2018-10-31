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
    <d2-container>
        <Row>
                <my-table 
                    model="model" 
                    @ON-ROW-CLICK="onModelRowClick" 
                    :autoRefresh="true" 
                    :height="300"
                    ref="table">
                </my-table>
        </Row>
        <Row class="demo-tabs-style2">
                    <Tabs type="card"  :animated="false">
                        <TabPane label="字段">
                            <my-table 
                            model="model-fields" 
                            :pageSize="7" 
                            :showMoreColumns="true" 
                            ref="fields">
                            <span>
                                模型名称：{{modelName}}
                            </span>
                            </my-table>
                        </TabPane>
                        <TabPane label="动作">
                            <my-table 
                            model="model-actions" 
                            :pageSize="7" 
                            :showMoreColumns="true" 
                            ref="actions">
                            <span>
                                模型名称：{{modelName}}
                            </span>
                            </my-table>
                        </TabPane>
                        <TabPane label="事件">
                            <my-table
                            model="model-scripts"
                            :pageSize="7" 
                            :showMoreColumns="true" 
                            ref="scripts">
                            <span>
                                模型名称：{{modelName}}
                            </span>
                            </my-table>
                        </TabPane>
                    </Tabs>
                </Row>
    </d2-container>
</template>

<style scoped>
.mybtn{
    margin:3px;
}
</style>

<script>
export default {
    name:'model-list',
    data(){
        return {
            modelName:'',
            value1:'',
            scriptCode:''
        }
    },
    methods:{
        onModelRowClick(data){
            this.modelName=data['name'];
            this.$refs.table.setRelation(this.$refs.fields,'name','model_name',data);
            this.$refs.table.setRelation(this.$refs.actions,'name','model_name',data);
            this.$refs.table.setRelation(this.$refs.scripts,'name','model_name',data);
            this.scriptCode='';
        }
    }
}
</script>
