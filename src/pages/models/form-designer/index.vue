<template>
    <d2-container>
        <Row>
            <Col :span="6">
                <Form :labelWidth="80">
                    <FormItem label="行数">
                        <Input v-model="row"/>
                    </FormItem>
                    <FormItem label="列数">
                        <Input v-model="col"/>
                    </FormItem>
                </Form>
            </Col>
            <Col :span="18">
                <Form>
                    <Row v-for="i in rows" :key="i">
                        <Col v-for="j in cols" :key="j" :span="24/cols.length">
                            <Button long>test</Button>
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
            row:0,
            col:0
        }
    },
    computed:{
        rows:function(){
            var s=[]
            for(var i=0;i<this.row;i++){
                s.push(i)
            }
            return s;
        },
        cols:function(){
            var s=[];
            for(var i=0;i<this.col;i++){
                s.push(i);
            }
            return s;
        }
    }
}
</script>
