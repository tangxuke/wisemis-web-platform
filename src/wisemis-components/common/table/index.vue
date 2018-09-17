<template>
	<div>
		<Row>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns" 
				:data="data" 
				@on-row-click="onRowClick">
				</Table>
		</Row>
	</div>
	
</template>

<style scoped>
*{
	margin:5px;
}
</style>

<script>

	export default {
		props:['model','data'],
		data () {
			return {
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
				}]
			}
		},
		computed:{
			columns:function(){
				if(this.model.Fields){
					var fields=this.model.Fields
					.filter(item=>{
						return item.ShowInGrid;
					})
					.map(item=>{
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
								//对icon显示为图标
								if(item.ControlType==='Icon'){
									return {
										title:item.Title,
										key:item.Name,
										minWidth:item.Width,
										render:(h,params)=>{
											return h('Icon',{
												props:{
													type:params.row[item.Name]
												}
											});
										}
									}
								}
								return {title:item.Title,key:item.Name,minWidth:item.Width};
							});
							return [...fields,...this.actionColumn];
				}else{
					return [];
				}
			},
			fields:function(){
				if(this.model){
					return this.model.Fields;
				}else{
					return [];
				}
			}
		},
		methods:{
			createNew:function(){
				
				this.event.$emit('NEW-'+this.model,{});
				this.title='新建';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.save(value);
				})
				.catch(reason=>{
					
				});
			},
			edit:function(data){
				this.event.$emit('SHOW-'+this.model,data);
				this.title='修改';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.save(value);
				})
				.catch(reason=>{
					
				});
			},
			save(data){
				var body={};
				data.forEach(item=>{
					body[item.Name]=item.Value;
					body[item.Name+'_OldValue']=item.OldValue;
				});
				this.$axios.post(`/models/${this.model}/save`,body)
				.then(value=>{
					//发出保存通知
					this.$Message.success('保存成功！');
					this.getData();
				})
				.catch(reason=>{
					alert(reason.message);
				});
			},
			delete:function(data){
				this.$axios.post(`/models/${this.model}/delete`,data)
				.then(value=>{
					if(value.success){
						this.$Message.success('删除成功！');
						this.getData();
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
				this.fields.forEach(item=>{
					item.Value=data[item.Name];
					item.OldValue=data[item.Name];
				});
				this.$emit('ON-ROW-CLICK',data);
			},
			getData:function(){
				this.$axios.post(`/models/${this.model}/data`,this.where)
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
			//this.getData();
		},
		created:function(){
			this.event.$on(`DATA`,data=>{
				this.where=data;
				this.getData();
			})
		},
		watch:{
			theModel:function(newValue,oldValue){
				this.getColumns();
			}
		}
	}
</script>
