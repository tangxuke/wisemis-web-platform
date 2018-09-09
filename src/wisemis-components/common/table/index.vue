<template>
	<div style="padding:5px;">
		<Row>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns1" 
				:data="data1" 
				@on-row-click="onRowClick">
				</Table>
				<my-page v-if="showPage" :model="model" :eventhub="eventhub" :pagesize="pagesize" ref="page" style="margin-top:5px;"/>
		</Row>
		<Row style="padding:5px 0;">
			<my-button :model="model" :eventhub="eventhub" action="save" type="success">保存</my-button>
			<my-button :model="model" :eventhub="eventhub" action="new" type="success" style="margin-left:5px;">新建</my-button>
		</Row>
	</div>
	
</template>



<script>
	export default {
		props:['model','eventhub','pagesize','showPage'],
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
				this.event.$emit('ROW-DATA-'+this.model,data);
			},
			getColumns:function(){
				this.$axios.get(`/models/${this.model}/table`)
				.then(value=>{
						if(value.success){
							var fields=value.result.Fields.map(item=>{
								//对boolean显示为复选框
								if(item.Type==='boolean'){
									return {
										title:item.Title,
										key:item.Name,
										minWidth:item.Width,
										render:(h,params)=>{
											return h('Checkbox',{
												props:{
													value:params.row[item.Name]
												}
											});
										}
									}
								}


								return {title:item.Title,key:item.Name,minWidth:item.Width};
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
