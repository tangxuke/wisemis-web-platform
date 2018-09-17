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
            <Col :span="8">
                <Button type="success" @click="refreshModelData">刷新</Button>
                <Button type="success" @click="createNewModel">新建</Button>
                <my-table :model="model" :data="modelData" @ON-ROW-CLICK="onModelRowClick"></my-table>
                <Button type="primary" @click="ApplyModel">生成 {{modelName}}</Button>
            </Col>
            <Col :span="16">
                <Row class="demo-tabs-style2">
                    <Tabs type="card"  :animated="false">
                        <TabPane label="编辑">
                            <my-form model="model"></my-form>
                            <Button  type="success" @click="SaveModel">保存</Button>
                        </TabPane>
                        <TabPane label="字段">
                            <my-table :model="fieldModel"></my-table>
                            <my-form :model="fieldModel"></my-form>
                        </TabPane>
                        <TabPane label="预览">
                            <my-form></my-form>
                            <my-table></my-table>
                        </TabPane>
                    </Tabs>
                </Row>
            </Col>
        </Row>
    </d2-container>
</template>

<script>
import GetModel from '@/utils/get-model';

export default {
    data(){
        return {
            modelName:'',
            model:{},
            fieldModel:{},
            modelData:[]
        }
    },
    methods:{
        SaveModel(){
            var data={};
            this.model.Fields.forEach(item=>{
                data[item.Name]=item.Value;
                data[item.Name+'_OldValue']=item.OldValue;
            });
            this.$axios.post('/models/model/save',data)
            .then(value=>{
                if(value.success){
                    alert('保存成功');
                    this.refreshModelData();
                    this.createNewModel();
                }else{
                    alert(value.message);
                }
            })
            .catch(reason=>{
                alert(reason.message);
            })
        },
        ApplyModel(){
            if(!this.modelName)
                return;
            this.$axios.post('/models/model/apply',{modelName:this.modelName})
            .then(value=>{
                if(value.success){
                    alert('生成模型成功！');
                }else{
                    alert(value.message);
                }
            })
            .catch(reason=>{
                alert(reason.message);
            })
        },
        createNewModel(){
            this.model.Fields.forEach(item=>{
                item.Value=item.DefaultValue;
                item.OldValue=item.DefaultValue;
            })
        },
        onModelRowClick(data){
            this.modelName=data['name'];
            this.fieldModel.Fields.forEach(item=>{
                if(item.Name==='model_name'){
                    item.DefaultValue=data['name'];
                    item.OldValue=data['name'];
                    item.Value=data['name'];
                }
            });

        },
        getModel(){
            GetModel(this,'model')
            .then(value=>{
                this.model=value;
            })
            .catch(reason=>{
                alert(reason.message);
            });

            GetModel(this,'model-fields')
            .then(value=>{
                this.fieldModel=value;
            })
            .catch(reason=>{
                alert(reason.message);
            });
        },
        refreshModelData(){
            this.$axios.post('/models/model/data')
            .then(value=>{
                if(value.success){
                    this.modelData=value.result;
                }else{
                    alert(value.message);
                }
            })
            .catch(reason=>{
                alert(reason.message);
            })
        }
    },
    mounted() {
        this.getModel();
    }
}
</script>
