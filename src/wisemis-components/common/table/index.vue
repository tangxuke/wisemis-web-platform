<template>
	<div style="padding:5px;">
		<!--Row style="padding-bottom:5px;">
			<Button type="success" @click="createNew">新建</Button>
		</Row-->
		<Row>
			<Table :columns="columns1" :data="data1" @on-row-click="onRowClick"></Table>
		</Row>
		<Row>
			<my-page :model="model" :eventhub="eventhub" :pagesize="pagesize" ref="page" style="margin-top:5px;"/>
		</Row>
		
	</div>
	
</template>
<script>
	export default {
		props:['model','eventhub','pagesize','show-page'],
		data () {
			return {
				columns1: [],
				data1: [],
				actionColumn:[{
					title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
								h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
									},
									on:{
										click:()=>{
											this.edit(params.row);
										}
									}
                                }, 'Edit'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
									},
									on:{
										click:()=>{
											this.$Modal.confirm({
												title:'删除提示',
												content:'你真的要删除这条记录吗？',
												onOk:()=>{
													this.delete(params.row);
												}
											})
										}
									}
                                }, 'Del')
                            ]);
                        }
				}],
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
			createNew:function(){
				this.event.$emit('ROW-DATA-'+this.model,{});
			},
			edit:function(data){
				this.event.$emit('ROW-DATA-'+this.model,data);
			},
			delete:function(data){
				this.$axios.post(`/models/${this.model}/delete`,data)
				.then(value=>{
					if(value.success){
						this.$Message.success('删除成功！');
						this.event.$emit(`DATA-${this.model}`,data);
					}else{
						this.$Modal.remove()
						setTimeout(()=>{
							this.$Modal.error({
								title:'删除失败提示',
								content:value.message
							});
						},300);
						
					}
				})
				.catch(reason=>{
					this.$Modal.error({
						title:'删除失败提示',
						content:reason.message
					});
				});
			},
			onRowClick:function(data){
				
			},
			getColumns:function(){
				this.$axios.get(`/models/${this.model}/table`)
				.then(value=>{
						if(value.success){
							var fields=value.result.Fields.map(item=>{
								return {title:item.Title,key:item.Name};
							});
							this.columns1=[...fields,...this.actionColumn];
						}else{
							alert(value.message);
						}
					}
				).catch(reason=>{
					alert(reason.message);
				})
			},
			getData:function(data){
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
				this.getData(data);
			})
		}
	}
</script>
