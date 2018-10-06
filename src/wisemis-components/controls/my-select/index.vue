<template>
    <Select v-model="oFieldObject.Value" ref="control">
        <Option 
            v-for="item in options" 
            :key="item.value"
            :value="item.value"
            >
            {{item.label}}
            </Option>
    </Select>
</template>

<script>
export default {
    props:['oFieldObject'],
    computed:{
        options(){
            if(!this.oFieldObject.DataSourceType || !this.oFieldObject.DataSource)
                return [];
            switch(this.oFieldObject.DataSourceType){
                case 'NONE':
                    return [];
                case 'LIST':
                    return this.oFieldObject
                    .DataSource
                    .replace(/\\\:/g,'{#1}')
                    .replace(/\\\,/g,'{#2}')
                    .split(',')
                    .map(item=>{
                        var a=item.split(':').map(e=>{
                            return e.replace(/\{#1\}/g,':')
                                    .replace(/\{#2\}/g,',');
                        });
                        if(a.length===1)
                            return {label:a[0],value:a[0]};
                        else
                            return {label:a[0],value:a[1]};
                    });
                case 'QUERY':
                    return [];
                case 'SYSTEM':
                    return []
                default:
                    return [];
            }
        }
    }
}
</script>
