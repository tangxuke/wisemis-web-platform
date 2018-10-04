<template>
    <Input 
    type="textarea" 
    v-model="oFieldObject.Value" 
    :placeholder="'请输入'+oFieldObject.Title+'...'"
    :rows="2"
    ref="control"
    />
</template>
<script>
export default {
    props:['oFieldObject']
}

</script>
