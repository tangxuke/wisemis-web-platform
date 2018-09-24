
<template>
    <d2-container>
        <Row>
            <Col :span="3">
                <my-table 
                model="setting-type" 
                :autoRefresh="true" 
                :hideAction="true" 
                :hideButtons="true"
                ref="type"
                @ON-ROW-CLICK="onTypeClick"
                ></my-table>
            </Col>
            <Col :offset="1" :span="20">
                <my-table 
                    model="setting-item" 
                    ref="item">
                    <span style="margin-left:5px;">项目类型:<span style="color:blue;margin-left:5px;">{{type}}</span></span>
                </my-table>
            </Col>
        </Row>
        
    </d2-container>
</template>

<script>
export default {
    data(){
        return {
            type:''
        }
    },
    methods:{
        onTypeClick(data){
            this.type=data.name;
            this.$refs.type.setRelation(this.$refs.item,'name','type',data);
        }
    }
}
</script>
