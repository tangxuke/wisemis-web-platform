<template>
    <div is="Col" :span="oFieldObject.ColSpan">
        <div is="FormItem"
            :label-width="80"
            :label="oFieldObject.Title"
            
            >
            <div>
                <!--文本框-->
                <div is="Input" 
                    v-if="oFieldObject.ControlType==='Input'"
                    v-model="oFieldObject.Value">
                </div>
                <!--编辑框-->
                <div is="Input" 
                    v-if="oFieldObject.ControlType==='my-editbox'"
                    type="textarea"
                    v-model="oFieldObject.Value">
                </div>
                <!--复选框-->
                <div is="Checkbox"
                    v-if="oFieldObject.ControlType==='Checkbox'"
                    v-model="oFieldObject.Value"
                ></div>
                <!--下拉框-->
                <div is="Select" 
                    v-if="oFieldObject.ControlType==='Select'"
                    v-model="oFieldObject.Value">
                    <div 
                        is="Option" 
                        v-for="item in oFieldObject.Options" 
                        :value="item.value" 
                        :key="item.value">
                        {{ item.label }}
                    </div>
                </div>
                <div is="Input"
                    v-if="oFieldObject.ControlType==='DatePicker'"
                    type="date"
                    v-model="oFieldObject.Value" 
                >
                </div>
            </div>
            <div slot="label"><span style="cursor:pointer;" @click="openTextDialog">{{oFieldObject.Title}}</span></div>
        </div>
        <my-modal :title="'编辑 - '+oFieldObject.Title" 
            :width="600" @OK="onFinishText" ref="titleModal">
			<Input
                v-model="value1"
                type="textarea"
                autofocus
                autosize
            />
		</my-modal>
    </div>
</template>

<script>
//style="height:32px;"
export default {
    props:{
        oFieldObject:{
            type:Object
        }
    },
    data(){
        return {
            value1:''
        }
    },
    methods:{
        /**打开文本对话框 */
        openTextDialog(){
            this.value1=this.oFieldObject.Value;
            this.$refs.titleModal.ShowDialog();
        },
        onFinishText(){
            this.oFieldObject.Value=this.value1;
        },
        /**
         * 设置字段值
         * @param {any} value 字段值
         */
        setValue(value){

        },
        /**
         * 获取字段值
         * @returns {any}
         */
        getValue(){

        }
    }
}
</script>
