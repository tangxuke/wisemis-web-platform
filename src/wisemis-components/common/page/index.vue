<template>
    <Page :total="Count" :page-size="pagesize || 10" :current.sync="current" @on-change="onChange" />
</template>
<script>
    //分页组件
    export default {
        props:['eventhub','model','pagesize'],
        computed:{
            event:function(){
                return this.eventhub || this;
            }
        },
        data(){
            return {
                Count:0,
                current:1
            }
        },
        mounted:function(){
            this.getCount();
        },
        methods:{
            onChange:function(page){
                this.event.$emit(`DATA-${this.model}`,{
                    current:page,
                    pagesize:this.pagesize || 10
                })
            },
            getCount:function(){
                this.$axios.post(`models/${this.model}/count`)
                .then(value=>{
                    if(value.success){
                        this.Count=value.result;
                        this.current=1;
                        this.event.$emit(`DATA-${this.model}`,{
                            current:1,
                            pagesize:this.pagesize || 10
                        })
                    }
                        
                })
            }
        },
        created:function(){
            this.event.$on(`DATA-${this.model}`,data=>{
                if(!data.current || !data.pagesize){
                    setTimeout(function(){
                        this.getCount();
                    },300);
                }
            })
        }
    }
</script>
