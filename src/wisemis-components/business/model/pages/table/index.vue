<template>
    <my-table model="model" :eventhub="event"></my-table>
</template>
<script>
export default {
    props:['eventhub'],
    computed:{
        event:function(){
            return this.eventhub || this;
        }
    }
}
</script>
