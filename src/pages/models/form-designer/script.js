import Vue from 'vue';
import MyData from './components/my-data';
import MyRender from './components/my-render';
import MyComputed from './components/my-computed';
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from 'constants';

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
		 * 解析字符串，处理{{...}}表达式内容
		 * @param {string} s 待解析字符串
		 */
		parseText(s){
			//计算{{...}}里面的表达式
			while (s.indexOf('{{')>-1) {
				var a=s.indexOf('{{');
				var b=s.indexOf('}}',a);
				var e=s.substr(a+2,b-a-2);
				var s1=s.substr(0,a);
				var s2=s.substr(b+2);
				s=s1+eval(e)+s2;
			}

			return s;
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
				methods:{s:this.parseText.bind(instance)},
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