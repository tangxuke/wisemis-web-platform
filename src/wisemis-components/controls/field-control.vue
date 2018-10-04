<template>
    <div is="Col" :span="oFieldObject.ColSpan">
        <div is="FormItem"
            :label-width="80"
            :label="oFieldObject.Title"
            style="height:32px;"
            >
            <div :is="oFieldObject.ControlType" :oFieldObject="oFieldObject" ref="field">
            </div>
            <div slot="label">
                <span style="cursor:pointer;color:indigo;" @click="openTextDialog">{{oFieldObject.Title}}</span>
                <span v-if="oFieldObject.IsKey" style="color:red; margin-left:3px;">*</span></div>
        </div>
        <my-modal :title="'编辑 - '+oFieldObject.Title" 
            :width="600" 
            @OK="onFinishText" 
            ref="titleModal">
			<Input
                v-model="value1"
                type="textarea"
                :rows="15"
                autofocus
            />
		</my-modal>
    </div>
</template>

<script>  
import VueComponent from 'vue';

import SelectDepartmentControl from './select-department-control';
import MyEditbox from './my-editbox';
import MyTextbox from './my-textbox';
import MyCheckbox from './my-checkbox';
import MyDatePicker from './my-date-picker';
import MySelect from './my-select';
   
export default {
    props:{
        oFieldObject:{
            type:Object
        }
    },
    components:{
        'select-department-control':SelectDepartmentControl,
        'my-editbox':MyEditbox,
        'my-textbox':MyTextbox,
        'my-checkbox':MyCheckbox,
        'my-date-picker':MyDatePicker,
        'my-select':MySelect
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
            this.setFocus();
        },
        /**
         * 设置字段值
         * @param {any} value 字段值
         */
        setValue(value){
            this.oFieldObject.Value=value;
        },
        /**
         * 获取字段值
         * @returns {any}
         */
        getValue(){
            return this.oFieldObject.Value;
        },
        /**设置焦点 */
        setFocus(){
            var oCoreFieldControl=this.getCoreFieldControl();
            if(oCoreFieldControl.focus){
                oCoreFieldControl.focus();
            }
        },
        /**
         * 获取核心字段控件
         * @returns {VueComponent}
         */
        getCoreFieldControl(){
            return this.$refs.field.$refs.control;
        }
    },
    mounted(){
        //把控件注册到表单，以便支持this.xxfield.setFocus()等功能
        this.oFieldObject.thisform[this.oFieldObject.Name]=this;
        this.oFieldObject.control=this;

        //注册事件处理程序
        this.oFieldObject.Scripts.forEach(ev => {
            var params=ev.params || '';
            var aParams=params.split(',');
            var fn=new Function(...aParams,ev.code); 
            var control=this.getCoreFieldControl();
            control.$on(ev.type,()=>{
                fn.call(this.oFieldObject.thisform,...arguments);
            });
        });
    }
}
</script>
