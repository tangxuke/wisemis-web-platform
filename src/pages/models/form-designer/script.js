import Vue from 'vue';

export default {
	data(){
		return {
			showType:'data',
			dataItem:'',
			dataValue:'',
			renderCode:`return h('tag',{})`
		}
	},
	methods:{
		selectType(type){
			this.showType=type;
		},
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