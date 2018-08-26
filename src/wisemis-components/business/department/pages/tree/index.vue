<template>
    <my-tree model="department" :eventhub="eventhub" :editable="editable"></my-tree>
</template>

<script>
export default {
    props:{
        eventhub:{
            type:Object
        },
        editable:{
            type:Boolean,
            default:true
        }
    }
}
</script>
