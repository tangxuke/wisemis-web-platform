<template>
    <div>
        <Input v-model="value" @on-focus="$refs.dialog.ShowDialog()"/>
        <department-dialog ref="dialog" :eventhub="event"></department-dialog>
    </div>
</template>

<script>
export default {

    data(){
        return {
            value:''
        }
    },
    computed:{
        event:function(){
            return this;
        }
    },
    created:function(){
        this.event.$on('RETURN-VALUE',value=>{
            this.value=value;
        })
    }
}
</script>
