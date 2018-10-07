<template>
    <div is="Col" :span="oFieldObject.ColSpan">
        <div is="FormItem"
            :label-width="80"
            :label="oFieldObject.Title" 
            :style="style"
            >
            <div :is="oFieldObject.ControlType" :oFieldObject="oFieldObject" ref="field"></div>
            <div slot="label">
                <template v-if="oFieldObject.ToolTip">
                    <Tooltip :max-width="500">
                        <div slot="content">
                            <div>
{{oFieldObject.ToolTip}}
                            </div>
                        </div>
                        <span style="cursor:pointer;color:indigo;" @click="openTextDialog">{{oFieldObject.Title}}</span>
                    </Tooltip>
                </template>
                <template v-else>
                    <span style="cursor:pointer;color:indigo;" @click="openTextDialog">{{oFieldObject.Title}}</span>
                </template>
                <span v-if="oFieldObject.IsKey || oFieldObject.IsNotNull" style="color:red; margin-left:3px;">*</span>

            </div>
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
import SelectDepartmentControl from './form-controls/select-department-control';
import MyEditbox from './form-controls/my-editbox';
import MyTextbox from './form-controls/my-textbox';
import MyCheckbox from './form-controls/my-checkbox';
import MyDatePicker from './form-controls/my-date-picker';
import MySelect from './form-controls/my-select';
import MyList from './form-controls/my-list';
   
export default {
    props:{
        oFieldObject:
        {
            type:Object
        }
    },
    computed:{
        style(){
            if(Number.isInteger(this.oFieldObject.ControlHeight) && this.oFieldObject.ControlHeight>0){
                return {height:this.oFieldObject.ControlHeight*32+'px'};
            }else{
                return {height:'unset'};
            }
        }
    },
    components:{
        'select-department-control':SelectDepartmentControl,
        'my-editbox':MyEditbox,
        'my-textbox':MyTextbox,
        'my-checkbox':MyCheckbox,
        'my-date-picker':MyDatePicker,
        'my-select':MySelect,
        'my-list':MyList
    },
    data(){
        return {
            value1:''
        }
    },
    methods:{
        /**
         * 检查输入有效性
         * @returns {boolean}
         */
        checkValid(){
            //检查输入完整性
            if(this.oFieldObject.IsKey || this.oFieldObject.IsNotNull){
                if(!this.oFieldObject.Value){
                    this.$Modal.info({
                        title:'数据输入不完整',
                        content:`[${this.oFieldObject.Title}]不能为空！`,
                        onOk:()=>{
                            this.setFocus();
                        }
                    });
                    return false;
                }
            }
            //检查正则表达式
            if(this.oFieldObject.RegExpression && this.oFieldObject.Value){
                var regExpr=new RegExp(this.oFieldObject.RegExpression);
                if(!regExpr.test(''+this.oFieldObject.Value)){
                    this.$Modal.info({
                        title:'数据输入不合法',
                        content:`[${this.oFieldObject.Title}]正则表达式验证失败！`,
                        onOk:()=>{
                            this.setFocus();
                        }
                    });
                    return false;
                }
            }
            return true;
        },
        /**打开文本对话框 */
        openTextDialog(){
            if(typeof this.oFieldObject.Type !=='string')
                return;
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

        if(this.oFieldObject.AutoFocus)
            this.setFocus();

        //注册事件处理程序
        this.oFieldObject.Scripts.forEach(ev => {
            var params=ev.params || '';
            var aParams=params.split(',');
            var fn=new Function(...aParams,ev.code); 
            var control=this.getCoreFieldControl();
            control.$on(ev.type,(...aParams)=>{
                fn.call(this.oFieldObject.thisform,...aParams);
            });
        });
    }
}
</script>
