import Vue from 'vue';
import JsonFormat from 'json-format';

import MyData from './components/my-data';
import MyRender from './components/my-render';
import MyComputed from './components/my-computed';
import MyMethods from './components/my-methods';
import MyWatch from './components/my-watch';


export default {
	components: {
		'my-data': MyData,
		'my-render': MyRender,
		'my-computed': MyComputed,
		'my-methods': MyMethods,
		'my-watch': MyWatch
	},
	data() {
		return {
			oVue: {
				data: [],
				computed: [],
				methods: [],
				props: '',
				render: [],
				watch: [],
				mounted: '',
				created: '',
				htmlCode: '',
				theProps: ''
			},
			ComponentName: '',
			ComponentTag: '',
			ComponentRemark: '',
			ComponentName_OldValue: '',
			ComponentTag_OldValue: '',
			ComponentRemark_OldValue: '',
			ComponentCode: '',
			ComponentCode_OldValue: '',
			ComponentVueCode: '',
			ComponentVueCode_OldValue: '',
			labelPreview: (h) => {
				return h('Button', {
					props: {
						type: 'text'
					},
					on: {
						click: () => {
							this.Preview();
						}
					}
				}, '预览');
			}
		}
	},
	methods: {
		createNewObject() {
			this.oVue = {
					data: [],
					computed: [],
					methods: [],
					props: [],
					render: [],
					watch: [],
					mounted: '',
					created: '',
					htmlCode: '',
					theProps: ''
				},
				this.ComponentName = '',
				this.ComponentTag = '',
				this.ComponentRemark = '',
				this.ComponentCode = '',
				this.ComponentName_OldValue = '',
				this.ComponentTag_OldValue = '',
				this.ComponentRemark_OldValue = '',
				this.ComponentCode_OldValue = '',
				this.ComponentVueCode = '',
				this.ComponentVueCode_OldValue = ''
		},
		onRowClick(data) {
			this.ComponentName = data.name;
			this.ComponentTag = data.tag;
			this.ComponentRemark = data.remark;
			this.ComponentName_OldValue = data.name;
			this.ComponentTag_OldValue = data.tag;
			this.ComponentRemark_OldValue = data.remark;
			this.ComponentCode = data.code;
			this.ComponentCode_OldValue = data.code;
			this.ComponentVueCode = data.vue_code;
			this.ComponentVueCode_OldValue = data.vue_code;
			this.oVue = JSON.parse(data.code);
		},
		Save() {
			if (!this.ComponentName || !this.ComponentTag) {
				alert('请输入组件名称和标签名称！');
				return;
			}
			var code = JsonFormat(this.oVue);
			var vue_code = this.getVueCode();
			vue_code = JsonFormat(vue_code);
			var body = {
				name: this.ComponentName,
				name_OldValue: this.ComponentName_OldValue,
				tag: this.ComponentTag,
				tag_OldValue: this.ComponentTag_OldValue,
				remark: this.ComponentRemark,
				remark_OldValue: this.ComponentRemark_OldValue,
				code: code,
				code_OldValue: this.ComponentCode_OldValue,
				vue_code: vue_code,
				vue_code_OldValue: this.ComponentVueCode_OldValue
			};
			this.$axios.post('/models/components/save', body)
				.then(value => {
					if (value.success) {
						alert("保存组件成功！");
						this.$refs.components.refresh();
					} else {
						alert(value.message);
					}
				})
				.catch(reason => {
					alert(reason.message);
				});
		},
		selectType(type) {
			this.showType = type;
		},
		/**获取Vue对象配置代码 */
		getVueCode() {
			this.$refs.render.createRenderCode();
			var vue = {
				data: '',
				computed: '',
				methods: '',
				render: '',
				mounted: '',
				created: '',
				props: ''
			};
			vue.data = this.$refs.data.getDataCode();
			vue.computed = this.$refs.computed.getComputedCode();
			vue.methods = this.$refs.methods.getMethodsCode();
			vue.render = ['h', this.$refs.render.renderCode];
			vue.mounted = this.oVue.mounted;
			vue.created = this.oVue.created;
			vue.watch = this.$refs.watch.getWatchCode();
			vue.props = this.oVue.theProps;
			return vue;
			//return JSON.stringify(vue);
		},
		/**获取Vue对象配置 */
		getVueOptions() {
			this.$refs.render.createRenderCode();
			var renderFn = new Function('h', this.$refs.render.renderCode);
			var options = {
				data: this.$refs.data.getData(),
				computed: this.$refs.computed.getComputedObject(),
				methods: this.$refs.methods.getMethods(),
				render: renderFn,
				mounted: new Function(this.oVue.mounted),
				created: new Function(this.oVue.created),
				//TODO:watch
				watch: this.$refs.watch.getWatch()
			};
			return options;
		},
		/**
		 * 预览效果
		 */
		Preview() {
			this.Save();
			var instance = new Vue(this.getVueOptions());
			console.log(instance);
			var component = instance.$mount();
			var demo = document.querySelector('#preview');
			demo.childNodes.forEach(node => {
				node.remove();
			});
			demo.appendChild(component.$el);
		}
	}
}