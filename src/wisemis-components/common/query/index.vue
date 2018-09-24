<template>
    <Form is="Form" :label-width="80">
        <Row> 
            <Col  v-for="field in fields" :span="field.ColSpan" :key="field.Title">
                <FormItem :label="field.Title">
                    <div :is="field.ControlType"  v-model="field.Value" :placeholder="field.PlaceHolder">
                        <div is="Option" v-for="item in field.Options" :value="item.value" :key="item.value">{{ item.label }}</div>
                    </div>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
export default {
    props:['model'],
    data(){
        return {
            fields:[]
        }
    },
    methods:{
        query(){
            const data={};
            this.fields.filter(item=>{
                return item.Value.length>0;
            }).forEach(element => {
                data[element.Name]=element.Value;
            });

            return {query:data};
        },
        clear(){
            this.fields.forEach(item=>{
                item.Value=item.DefaultValue;
            })
        },
        getModel(){
            if(!this.model)
                return;
            this.$axios.post(`/models/${this.model}/query`)
            .then(value=>{
                if(value.success){
                    this.fields=value.result.Fields.map(item=>{
                        item.ColSpan=24/value.result.ColumnCount*item.ColSpan;
                        item.Value=item.DefaultValue;
                        return item;
                    });
                }
            })
        }
    },
    mounted(){
        this.getModel();
    }
}
</script>
