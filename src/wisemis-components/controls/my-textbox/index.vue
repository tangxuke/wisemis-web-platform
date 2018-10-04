<template>
    <Input 
    type="text" 
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
