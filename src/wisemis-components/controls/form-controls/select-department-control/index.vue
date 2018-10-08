<template>
    <div>
        <Input v-model="oFieldObject.Value" @on-focus="openDialog" ref="control"/>
        <department-dialog ref="dialog1"></department-dialog>
    </div>
</template>

<script>
export default {
    props:['oFieldObject'],
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
