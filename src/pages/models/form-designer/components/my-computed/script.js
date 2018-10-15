export default {
	props: ['oVue'],
	data() {
		return {
			name: "",
			get_value: "",
			set_value: "",
			remark: "",
			index: -1,
			columns: [
				{
					key: "name",
					title: "属性名称",
					width: 100,
					render: (h, { row, column, index }) => {
						return h(
							"Tooltip",
							{
								props: {
									content: row.remark
								}
							},
							row.name
						);
					}
				},
				{
					key: "get_value",
					title: "get",
					ellipsis: true,
					tooltip: true
				},
				{
					key: "set_value",
					title: "set",
					ellipsis: true,
					tooltip: true
				},
				{
					title: "Action",
					fixed: 'right',
					width: 80,
					render: (h, { row, column, index }) => {
						var _this = this;
						return h(
							"Button",
							{
								props: {
									type: "text"
								},
								on: {
									click() {
										_this.data1.splice(index, 1);
									}
								}
							},
							"Del"
						);
					}
				}
			],
		};
	},
	computed: {
		ComputedCode() {
			var computedObj=new Object();
			
			this.oVue.computed.forEach(item=>{
				if (item.set_value && this.get_value) {
					computedObj.constructor.prototype[item.name]={get:new Function(item.get_value),set:new Function('newValue',item.set_value)};
				}else{
					computedObj.constructor.prototype[item.name]=new Function(item.get_value);
				}
			})

			return computedObj;
		}
	},
	methods: {
		/**
         * 按键事件，用于控制Tab键缩进
         * @param {KeyboardEvent} event
         */
        onKeyDown1(event){
            if(event.keyCode===9){
                var input=this.$refs.control1.$el.childNodes[0];
                //var input=document.getElementsByTagName('input')[0];
                var position=input.selectionStart+1;
                input.value=input.value.substr(0,input.selectionStart)+String.fromCharCode([9])+input.value.substr(input.selectionStart);
                input.selectionStart=position;
                input.selectionEnd=position;
                input.focus();
                event.preventDefault();
            }
		},
		/**
         * 按键事件，用于控制Tab键缩进
         * @param {KeyboardEvent} event
         */
        onKeyDown2(event){
            if(event.keyCode===9){
                var input=this.$refs.control2.$el.childNodes[0];
                //var input=document.getElementsByTagName('input')[0];
                var position=input.selectionStart+1;
                input.value=input.value.substr(0,input.selectionStart)+String.fromCharCode([9])+input.value.substr(input.selectionStart);
                input.selectionStart=position;
                input.selectionEnd=position;
                input.focus();
                event.preventDefault();
            }
		},
		clear() {
			this.name = "";
			this.get_value = "";
			this.set_value = "";
			this.remark = "";
			this.index = -1;
		},
		onRowClick(row, index) {
			this.name = row.name;
			this.get_value = row.get_value;
			this.set_value = row.set_value;
			this.remark = row.remark;
			this.index = index;
		},
		Apply() {
			if (this.index > -1) {
				this.oVue.computed[this.index].name = this.name;
				this.oVue.computed[this.index].get_value = this.get_value;
				this.oVue.computed[this.index].set_value = this.set_value;
				this.oVue.computed[this.index].remark = this.remark;
			} else {
				this.oVue.computed.push({
					name: this.name,
					get_value: this.get_value,
					set_value: this.set_value,
					remark: this.remark
				});
			}
			this.clear();
		}
	}
};