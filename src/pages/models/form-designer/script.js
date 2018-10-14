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
			Code:''
		}
	},
	methods:{
		/**
         * 按键事件，用于控制Tab键缩进
         * @param {KeyboardEvent} event
         */
        onKeyDown(event){
            if(event.keyCode===9){
                var input=this.$refs.control.$el.childNodes[0];
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
		 * 预览效果
		 */
		Preview1(){
			/*
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
			*/
		},
		Preview(){
			Vue.component('my-demo',{
				template:`${this.Code}`
			});
			var instance=new Vue({
				render(h){
					return h('my-demo');
				}
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