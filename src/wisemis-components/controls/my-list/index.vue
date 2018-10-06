<template>
    <Select 
        v-model="oFieldObject.Value" 
        multiple 
        ref="control">
        <Option 
            v-for="item in oFieldObject.Options" 
            :key="item.value"
            :value="item.value"
            >
            {{item.label}}
            </Option>
    </Select>
</template>

<script>
export default {
    props:['oFieldObject']
}
</script>
