export default {
	props: ['oVue'],
	data() {
		return {
			name: "",
			params: "newValue,oldValue",
			code: "",
			remark: "",
			index: -1,
			columns: [{
					key: "name",
					title: "变量名",
					width: 100,
					render: (h, {
						row,
						column,
						index
					}) => {
						return h(
							"Tooltip", {
								props: {
									content: row.remark
								}
							},
							row.name
						);
					}
				},
				{
					key: 'params',
					title: '参数'
				},
				{
					key: "code",
					title: "代码",
					ellipsis: true,
					tooltip: true
				},
				{
					title: "Action",
					fixed: 'right',
					width: 80,
					render: (h, {
						row,
						column,
						index
					}) => {
						var _this = this;
						return h(
							"Button", {
								props: {
									type: "text"
								},
								on: {
									click() {
										_this.oVue.watch.splice(index, 1);
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
		getWatchCode() {
			var watch = new Object(null);
			this.oVue.watch.forEach(item => {
				var aParams = (item.params || '').split(',');
				watch[item.name] = [...aParams, item.code];
			})
			return watch;
		},
		getWatch() {
			var watch = new Object(null);
			this.oVue.watch.forEach(item => {
				var params = item.params || '';
				var aParams = params.split(',');
				watch[item.name] = new Function(...aParams, item.code);
			})
			return watch;
		},
		clear() {
			this.name = "";
			this.params = "newValue,oldValue";
			this.code = "";
			this.remark = "";
			this.index = -1;
		},
		onRowClick(row, index) {
			this.name = row.name;
			this.params = row.params;
			this.code = row.code;
			this.remark = row.remark;
			this.index = index;
		},
		Apply() {
			if (this.index > -1) {
				this.oVue.watch[this.index].name = this.name;
				this.oVue.watch[this.index].params = this.params;
				this.oVue.watch[this.index].code = this.code;
				this.oVue.watch[this.index].remark = this.remark;
			} else {
				this.oVue.watch.push({
					name: this.name,
					params: this.params,
					code: this.code,
					remark: this.remark
				});
			}
			this.clear();
		}
	}
};