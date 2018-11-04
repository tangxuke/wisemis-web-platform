<template>
    <Input 
    type="text" 
    :disabled="!oFieldObject.IsInsert && !oFieldObject.IsUpdate"
    v-model="oFieldObject.Value" 
    :placeholder="'请输入'+oFieldObject.Title+'...'"
    ref="control"
    />
</template>
<script>
export default {
    props:['oFieldObject']
}

</script>
