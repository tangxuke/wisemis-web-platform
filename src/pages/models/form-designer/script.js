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
				props:[]
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
			var code=this.code;
			var instance=new Vue({
				template:'<p>test</p>'
			});
			var component=instance.$mount();
			var div=document.querySelector('#preview');
			div.innerHTML='';
			div.appendChild(component.$el);
		}
	}
}