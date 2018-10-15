import Vue from 'vue';
import MyData from './components/my-data';
import MyRender from './components/my-render';
import MyComputed from './components/my-computed';

export default {
	components:{
		'my-data':MyData,
		'my-render':MyRender,
		'my-computed':MyComputed
	},
	data(){
		return {
			oVue:{
				data:[],
				computed:[],
				props:[],
				render:[]
			}
		}
	},
	methods:{
		selectType(type){
			this.showType=type;
		},
		
		/**
		 * 预览效果
		 */
		Preview(){
			var renderFn=new Function('h',this.$refs.render.RenderCode);
			var dataFn=new Function(this.$refs.data.DataCode);
			var computedObject=this.$refs.computed.ComputedCode;
			var instance=new Vue({
				data:dataFn.call(),
				computed:computedObject,
				render:renderFn
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