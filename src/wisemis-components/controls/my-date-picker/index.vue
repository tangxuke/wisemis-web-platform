<template>
    <DatePicker 
    type="date"
    v-model="oFieldObject.Value" ref="control"></DatePicker>
</template>

<script>
export default {
    props:['oFieldObject']
}
</script>
