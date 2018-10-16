export default {
	props: ['oVue'],
	data() {
		return {
			name: "",
			value: "",
			remark: "",
			index: -1,
			columns: [
				{
					key: "name",
					title: "变量名称",
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
					key: "value",
					title: "变量值",
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
										_this.data1.splice(index, 1);
									}
								}
							},
							"Del"
						);
					}
				}
			],
			data1: []
		};
	},
	computed: {
		DataCode() {

			var _data = this.oVue.data.map(item => {
				return item.name + ':' + item.value;
			}).join(',')
			return 'return {' + _data + '}';
		}
	},
	methods: {
		getData() {
			var data = new Object(null);
			this.oVue.data.forEach(item => {
				data[item.name]=eval(item.value);
			})
			return data;
		},
		clear() {
			this.name = "";
			this.value = "";
			this.remark = "";
			this.index = -1;
		},
		onRowClick(row, index) {
			this.name = row.name;
			this.value = row.value;
			this.remark = row.remark;
			this.index = index;
		},
		Apply() {
			if (this.index > -1) {
				this.oVue.data[this.index].name = this.name;
				this.oVue.data[this.index].value = this.value;
				this.oVue.data[this.index].remark = this.remark;
			} else {
				this.oVue.data.push({
					name: this.name,
					value: this.value,
					remark: this.remark
				});
			}
			this.clear();
		}
	}
};