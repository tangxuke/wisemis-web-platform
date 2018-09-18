<template>
	<div>
		<Row>
			<Button type="success" @click="createNew">新建</Button>
			<Button type="default" @click="refresh">刷新</Button>
			<slot></slot>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns" 
				:data="data1" 
				@on-row-click="onRowClick">
			</Table>
			<my-modal :title="title" :model="model" :width="modalWidth" ref="modal"></my-modal>
		</Row>
	</div>
	
</template>

<style scoped>
*{
	margin: 3px;
}
</style>


<script>

	export default {
		props:['model'],
		data () {
			return {
				data1: [{}],
				columns:[],
				actionColumn:[
					{
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
				where:{},
				title:'新建',
				modalWidth:300
			}
		},
		methods:{
			getForm(){
				return this.$refs.modal.getForm();
			},
			createNew:function(){
				const form=this.$refs.modal.getForm();
				form.clear();
				this.title='新建';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.save(value);
				})
				.catch(reason=>{
					alert(reason.message);
				});	
			},
			edit:function(data){
				const form=this.$refs.modal.getForm();
				form.setValue(data);
				this.title='修改';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.save(value);
				})
				.catch(reason=>{
					alert(reason.message);
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
						this.refresh();
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
				this.$emit('ON-ROW-CLICK',data);
			},
			setWhere(data){
				this.where={where:data};
			},
			refresh:function(){
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
			},
			getModel(){
				this.$axios.post(`/models/${this.model}/table`)
				.then(value=>{
					if(value.success){
						this.modalWidth=value.result.ColumnCount*300;
						const fields=value.result.Fields.map(item=>{
							return {
								key:item.Name,
								title:item.Title,
								minWidth:item.Width
							}
						});
						this.columns=[...fields,...this.actionColumn];
					}
				}).catch(reason=>{
					alert(reason.message);
				});
			}
		},
		mounted:function(){
			this.getModel();
		}
	}
</script>
