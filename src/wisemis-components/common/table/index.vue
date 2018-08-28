<template>
	<div style="padding:5px;">
		<Table :columns="columns1" :data="data1">
		</Table>
		<my-page style="margin-top:5px;"/>
	</div>
	
</template>
<script>
	export default {
		props:['model','eventhub','page-size','show-page'],
		data () {
			return {
				columns1: [],
				data1: [],
				currentpage:1	//当前页
			}
		},
		computed:{
			event:function(){
				return this.eventhub || this;
			},
			thePageSize:function(){
				return this['page-size'] || 10;	//默认一页10条记录
			},
			theShowPage:function(){
				return this['show-page'] || false;	//默认不分页
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
				var data={
					'page-size':this.thePageSize,
					'current-page':this.currentpage
				}
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
