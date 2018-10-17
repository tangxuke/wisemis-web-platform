export default {
	props: ['oVue'],
	data() {
		return {
            name: "",
            params:"",
			code: "",
			remark: "",
			index: -1,
			columns: [
				{
					key: "name",
					title: "方法名称",
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
                {key:'params',title:'参数'},
				{
					key: "code",
					title: "代码",
					ellipsis: true,
					tooltip:true
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
										_this.oVue.methods.splice(index, 1);
										setTimeout(() => {
											_this.clear();
										}, 100);
									}
								}
							},
							"Del"
						);
					}
				}
			]
		};
	},
	methods: {
		/**获得方法代码 */
		getMethodsCode(){
			var methods = new Object(null);
			this.oVue.methods.forEach(item => {
				var aParams=(item.params || '').split(',');
				methods[item.name]=[...aParams,item.code];
			})
			return methods;
		},
		getMethods() {
			var methods = new Object(null);
			this.oVue.methods.forEach(item => {
				var params=item.params || '';
				var aParams=params.split(',');
				methods[item.name]=new Function(...aParams,item.code);
			})
			return methods;
		},
		clear() {
			this.name = "";
			this.params="";
			this.code = "";
			this.remark = "";
			this.index = -1;
		},
		onRowClick(row, index) {
			this.name = row.name;
			this.params=row.params;
			this.code = row.code;
			this.remark = row.remark;
			this.index = index;
		},
		Apply() {
			if (this.index > -1) {
				this.oVue.methods[this.index].name = this.name;
				this.oVue.methods[this.index].params = this.params;
				this.oVue.methods[this.index].code = this.code;
				this.oVue.methods[this.index].remark = this.remark;
			} else {
				this.oVue.methods.push({
					name: this.name,
					params:this.params,
					code: this.code,
					remark: this.remark
				});
			}
			this.clear();
		}
	}
};