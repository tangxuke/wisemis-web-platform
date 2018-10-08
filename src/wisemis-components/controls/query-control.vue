<template>
    <FormItem
        :label-width="80"
        :label="oFieldObject.Title" 
        >
        <div :is="SearchControlType" :oFieldObject="oFieldObject" ref="field" ></div>
        <span slot="label">
            {{oFieldObject.Title}}
            <span style="margin-left:3px;color:green;" @click="oFieldObject.SearchField=false" title="取消查询字段">x</span>
        </span>
    </FormItem>
</template>

<script>
import MyStringQueryControl from './query-controls/my-string-query-control';
import MyBooleanQueryControl from './query-controls/my-boolean-query-control';

export default {
    props:['oFieldObject'],
    components:{
        'my-string-query-control':MyStringQueryControl,
        'my-boolean-query-control':MyBooleanQueryControl
    },
    data(){
        return {
            /**不限 */
            noLimit:false
        };
    },
    computed:{
        /**查询控件类型 */
        SearchControlType(){
            if(this.oFieldObject.Type==='string')
                return 'my-string-query-control';
            if(this.oFieldObject.Type==='boolean')
                return 'my-boolean-query-control';
        }
    },
    methods:{
        getSearchExpr(){
            return this.$refs.field.getSearchExpr();
        }
    }
}
</script>
