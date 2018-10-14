import Vue from 'vue';
import MyData from './components/my-data';
import MyRender from './components/my-render';

export default {
	components:{
		'my-data':MyData,
		'my-render':MyRender
	},
	data(){
		return {
			oVue:{
				data:[],
				props:[],
				render:[]
			},
			showType:'data',
			renderCode:`return h('p','tangxuke')`
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
			var instance=new Vue({
				render:renderFn
			});
			var component=instance.$mount();
			var demo=document.querySelector('#preview');
			demo.childNodes.forEach(node=>{
				node.remove();
			});
			demo.appendChild(component.$el);
		}
	}
}