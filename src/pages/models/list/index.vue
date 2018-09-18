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
                <my-table model="model" @ON-ROW-CLICK="onModelRowClick" ref="table">
                    <Button type="primary" class="mybtn" @click="ApplyModel">生成 {{modelName}}</Button>
                    <Button type="primary" class="mybtn" @click="ApplyModel">生成 {{modelName}}</Button>
                </my-table>
            </Col>
            <Col :span="16">
                <Row class="demo-tabs-style2">
                    <Tabs type="card"  :animated="false">
                        <TabPane label="编辑">
                            <my-form model="model" ref="form"></my-form>
                            <Button  type="success" @click="SaveModel">保存</Button>
                        </TabPane>
                        <TabPane label="字段">
                            <my-table model="model-fields" ref="fields"></my-table>
                        </TabPane>
                        <!--TabPane label="预览">
                            <my-form></my-form>
                            <my-table></my-table>
                        </TabPane-->
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
            modelName:'',
            model:{},
            fieldModel:{},
            modelData:[]
        }
    },
    methods:{
        SaveModel(){
            this.$refs.form.save()
            .then(value=>{
                this.$Message.success('保存成功！');
                this.$refs.form.clear();
                this.$refs.table.refresh();
            })
            .catch(reason=>{
                this.$Modal.error({
                    title:'保存失败',
                    content:reason.message
                });
            });
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
