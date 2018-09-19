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
            <Col :span="8" style="padding:3px;">
                <my-table model="model" @ON-ROW-CLICK="onModelRowClick" ref="table">
                    <Button type="primary" class="mybtn" @click="ApplyModel">生成模型</Button>
                </my-table>
            </Col>
            <Col :span="16" style="padding:3px;">
                <Row class="demo-tabs-style2">
                    <Tabs type="card"  :animated="false">
                        <TabPane label="编辑">
                            <my-form model="model" ref="form"></my-form>
                            <Button  type="success" @click="SaveModel">保存</Button>
                        </TabPane>
                        <TabPane label="字段">
                            <my-table model="model-fields" :pageSize="7" ref="fields"></my-table>
                        </TabPane>
                        <TabPane label="预览">                         
                            <my-table :model="modelName" ref="preview">
                            </my-table>
                        </TabPane>
                    </Tabs>
                </Row>
            </Col>
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
    data(){
        return {
            modelName:''
        }
    },
    methods:{
        SaveModel(){
            this.$refs.form.save()
            .then(value=>{
                this.$refs.table.refresh();
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
        onModelRowClick(data){
            this.modelName=data['name'];
            this.$refs.form.setValue(data);
            this.$refs.fields.setWhere([
                {
                    key:'model_name',
                    value:this.modelName
                }
            ]);
            this.$refs.fields.getForm().setDefault({'model_name':this.modelName});
            this.$refs.fields.refresh();
        }
    }
}
</script>
