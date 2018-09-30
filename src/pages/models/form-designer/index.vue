<template>
    <d2-container>
        <Row>
            <Col :span="6">
                <Form :labelWidth="80">
                    <Row>
                        <FormItem label="列数">
                            <Input v-model="cols"/>                       
                        </FormItem>
                    </Row>
                    <Row v-for="n in theCols" :key="'_'+n">
                        <Button long style="margin-top:3px;" @click="addControl(n)">添加跨{{n}}列按钮</Button>
                    </Row>
                    
                </Form>
            </Col>
            <Col :span="18">
                <Form>
                    <Row>
                        <Col v-for="(control,index) in controls" 
                            :key="'control'+index"
                            :span="control.span"
                            >
                            <Button long>{{control.title}}</control></Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </d2-container>
</template>

<script>
export default {
    data(){
        return {
            cols:1,
            controls:[]
        }
    },
    methods:{
        addControl(span){
            this.controls.push({
                span:span*this.unitCols,
                title:`这是一个${span}列按钮`
            })
        }
    },
    computed:{
        theCols(){
            var aCols=[];
            for(var i=0;i<this.cols;i++){
                aCols.push(i+1);
            }
            return aCols;
        },
        unitCols(){
            return Math.ceil(1.00*24/this.cols);
        }
    }
}
</script>
