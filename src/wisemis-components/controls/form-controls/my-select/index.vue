<template>
    <Select v-model="oFieldObject.Value" ref="control">
        <Option 
            v-for="item in options" 
            :key="item.value"
            :value="item.value"
            :label="item.label"
            v-html="item.label || item.value"
            >
            </Option>
    </Select>
</template>

<script>
export default {
    props:['oFieldObject'],
    data(){
        return {
            options:[]
        }
    },
    methods:{
        getOptions(type,source){
            if(!type || !source)
                return Promise.resolve([]);
            
            switch(type){
                case 'NONE':
                    return Promise.resolve([]);
                case 'LIST':
                    var options=source
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

                    return Promise.resolve(options);
                case 'SQL':
                    return this.$methods.getSqlResults(source,[],'wisemis')
                    .then(value=>{
                        var options=Array.from(value.results);
                        return options;
                    })
                    .catch(()=>{
                        return [];
                    });
                case 'SYSTEM':
                    return this.$methods.getSqlResultsForRow('select * from model_data_sources where name=?',[source],'wisemis')
                        .then(row=>{
                            return this.getOptions(row.type,row.code)
                                    .then(options=>{
                                        return options;
                                    })
                        });
                default:
                    return Promise.resolve([]);
            }
        }
    },
    mounted() {
        this.getOptions(this.oFieldObject.DataSourceType,this.oFieldObject.DataSource)
            .then(options=>{
                console.log(options);
                this.options=options;
            })
            .catch(()=>{
                this.options=[];
            });
    }
}
</script>
