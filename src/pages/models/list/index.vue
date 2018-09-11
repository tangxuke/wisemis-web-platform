<template>
    <d2-container>
        <my-table model="model" :eventhub="event"></my-table>
        <my-relations  model="model" :eventhub="event"></my-relations>
    </d2-container>
</template>

<script>
export default {
    computed:{
        event:function(){
            return this;
        }
    }
}
</script>
