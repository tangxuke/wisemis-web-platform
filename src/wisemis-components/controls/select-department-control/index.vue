<template>
    <div>
        <Input v-model="value1" @on-focus="openDialog"/>
        <department-dialog ref="dialog1" :eventhub="event"></department-dialog>
    </div>
</template>

<script>
export default {
    props:['value'],
    computed:{
        event:function(){
            return this;
        },
        value1:function(){
            return this.value;
        }
    },
    methods:{
        openDialog(){
            this.$refs.dialog1.ShowDialog()
        }
    },
    created:function(){
        this.event.$on('RETURN-VALUE',value=>{
            this.$emit('input',value.id)
        })
    }
}
</script>
