<template>
	<div style="padding:5px;">
		<Table :columns="columns1" :data="data1">
		</Table>
	</div>
	
</template>
<script>
	export default {
		props:['model','eventhub'],
		data () {
			return {
				columns1: [],
				data1: []
			}
		},
		computed:{
			event:function(){
				return this.eventhub || this;
			}
		},
		methods:{
			getColumns:function(){
				this.$axios.get(`/models/${this.model}/table`)
				.then(value=>{
						if(value.success){
							this.columns1=value.result.Fields.map(item=>{
								return {title:item.Title,key:item.Name};
							});
						}else{
							alert(value.message);
						}
					}
				).catch(reason=>{
					alert(reason.message);
				})
			},
			getData:function(){
				var data={}
				this.$axios.post(`/models/${this.model}/data`,data)
				.then(value=>{
						if(value.success){
							this.data1=value.result;
						}else{
							alert(value.message);
						}
					}
				).catch(reason=>{
					alert(reason.message);
				})
			}
		},
		mounted:function(){
			this.getColumns();
			this.getData();
		},
		created:function(){
			this.event.$on(`DATA-${this.model}`,data=>{
				this.getData();
			})
		}
	}
</script>
