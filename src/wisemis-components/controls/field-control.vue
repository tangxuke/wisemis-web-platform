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
				<span v-if="(oFieldObject.IsInsert || oFieldObject.IsUpdate) && oFieldObject.IsNotNull" style="color:red; margin-left:3px;">*</span>

			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    oFieldObject: {
      type: Object
    }
  },
  computed: {
	
    style() {
      if (
        Number.isInteger(this.oFieldObject.ControlHeight) &&
        this.oFieldObject.ControlHeight > 0
      ) {
        return { height: this.oFieldObject.ControlHeight * 32 + "px" };
      } else {
        return { height: "unset" };
      }
    },
    Value: {
      get() {
        return this.oFieldObject.Value;
      },
      set(newVal) {
		this.oFieldObject.Value = newVal;
      }
    },
    Visible: {
      get() {
		return this.oFieldObject.ShowInForm;
      },
      set(newVal) {
        this.oFieldObject.ShowInForm = newVal;
      }
    }
  },
  methods: {
    /**
     * 检查输入有效性
     * @returns {boolean}
     */
    checkValid() {
      //检查输入完整性
      if (this.oFieldObject.IsKey || this.oFieldObject.IsNotNull) {
        if (!this.oFieldObject.Value) {
          this.$Modal.info({
            title: "数据输入不完整",
            content: `[${this.oFieldObject.Title}]不能为空！`,
            onOk: () => {
              this.setFocus();
            }
          });
          return false;
        }
      }
      //检查正则表达式
      if (this.oFieldObject.RegExpression && this.oFieldObject.Value) {
        var regExpr = new RegExp(this.oFieldObject.RegExpression);
        if (!regExpr.test("" + this.oFieldObject.Value)) {
          this.$Modal.info({
            title: "数据输入不合法",
            content: `[${this.oFieldObject.Title}]正则表达式验证失败！`,
            onOk: () => {
              this.setFocus();
            }
          });
          return false;
        }
      }
      return true;
    },
    /**打开文本对话框 */
    openTextDialog() {
      if (typeof this.oFieldObject.Type !== "string") return;
      this.$dialogs
        .OpenTextDialog(
          "编辑 - " + this.oFieldObject.Title,
          this.oFieldObject.Value || ""
        )
        .then(value => {
          if (typeof this.oFieldObject.Value === "string")
            this.oFieldObject.Value = value;
          else this.oFieldObject.Value = eval(value);
          this.setFocus();
        })
        .catch(() => {});
    },
    /**
     * 设置字段值
     * @param {any} value 字段值
     */
    setValue(value) {
      this.oFieldObject.Value = value;
    },
    /**
     * 获取字段值
     * @returns {any}
     */
    getValue() {
      return this.oFieldObject.Value;
    },
    /**设置焦点 */
    setFocus() {
      var oCoreFieldControl = this.getCoreFieldControl();
      if (oCoreFieldControl.focus) {
        oCoreFieldControl.focus();
      }
    },
    /**
     * 获取核心字段控件
     */
    getCoreFieldControl() {
      return this.$refs.field.$refs.control;
    }
  },
  mounted() {
    //把控件注册到表单，以便支持this.$fields.xxfield.setFocus()等功能
    this.oFieldObject.thisform.$fields[this.oFieldObject.Name] = this;
    this.oFieldObject.$control = this;

    if (this.oFieldObject.AutoFocus) this.setFocus();

    //注册事件处理程序
    this.oFieldObject.Scripts.forEach(ev => {
      var params = ev.params || "";
      var aParams = params.split(",");
      var fn = new Function(...aParams, ev.code);
      //注册字段内核控件的事件处理程序
      var control = this.getCoreFieldControl();
      control.$on(ev.type, (...aParams) => {
        fn.call(this.oFieldObject.thisform, ...aParams);
      });
    });
  },
  watch:{
	  'oFieldObject.Value':function(newValue){
		  if(this.oFieldObject.thisform){
			  this.oFieldObject.thisform.$emit('FORM-VALUE-CHANGE',{name:this.oFieldObject.Name,value:newValue});
		  }
	  }
  }
};
</script>
