import Vue from 'vue';
import MyData from './components/my-data';
import MyRender from './components/my-render';
import MyComputed from './components/my-computed';
import MyMethods from './components/my-methods';
import MyWatch from './components/my-watch';

export default {
	components:{
		'my-data':MyData,
		'my-render':MyRender,
		'my-computed':MyComputed,
		'my-methods':MyMethods,
		'my-watch':MyWatch  
	},
	data(){
		return {
			oVue:{
				data:[],
				computed:[],
				methods:[],
				props:[],
				render:[],
				watch:[],
				mounted:'',
				created:'',
				htmlCode:''
			}
		}
	},
	methods:{
		Save(){
			alert(JSON.stringify(this.oVue))
		},
		selectType(type){
			this.showType=type;
		},
		/**
		 * 预览效果
		 */
		Preview(){
			
			var renderFn=new Function('h',this.$refs.render.renderCode);
			var instance=new Vue({
				data:this.$refs.data.getData(),
				computed:this.$refs.computed.getComputedObject(),
				methods:this.$refs.methods.getMethods(),
				render:renderFn,
				mounted:new Function(this.oVue.mounted),
				created:new Function(this.oVue.created)
				//TODO:watch
			});
			console.log(instance);
			var component=instance.$mount();
			var demo=document.querySelector('#preview');
			demo.childNodes.forEach(node=>{
				node.remove();
			});
			demo.appendChild(component.$el);
		}
	}
}