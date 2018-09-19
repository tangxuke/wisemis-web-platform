<template>
	<div>
		<Row>
			<ButtonGroup>
				<Button type="success" @click="createNew">新建</Button>
				<Button type="default" @click="copy" :disabled="!rowData">复制</Button>
			</ButtonGroup>
			<ButtonGroup style="margin:0 10px;">
				<Button type="primary">查询</Button>
				<Button type="default" @click="refresh">刷新</Button>
			</ButtonGroup>
			<slot></slot>
		</Row>
		<Row>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns" 
				:data="data1" 
				@on-row-click="onRowClick"
				no-data-text="暂无数据，请刷新或查询！"
				style="margin-top:3px;"
				>
			</Table>
		</Row>
		<Row>
			<Page 
				:total="Count" 
				:page-size="pagesize" 
				:current.sync="current" 
				@on-change="refreshPage" 
				style="float:right;margin:5px 0;"
				v-if="Count>pagesize"
			/>
		</Row>
		<Row>
			<my-modal :title="title" :model="model" :width="modalWidth" ref="modal"></my-modal>
		</Row>
	</div>
	
</template>


<script>

	export default {
		props:['model','pageSize'],
		data () {
			return {
				Count:0,
				current:1,
				data1: [],
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
				modalWidth:300,
				rowData:null
			}
		},
		computed:{
			pagesize:function(){
				return this.pageSize || 8;
			}
		},
		methods:{
			getCount:function(){
                this.$axios.post(`models/${this.model}/count`)
                .then(value=>{
                    if(value.success){
                        this.Count=value.result;
                        this.current=1;
                    }
                        
                })
            },
			getForm(){
				return this.$refs.modal.getForm();
			},
			copy(){
				const form=this.$refs.modal.getForm();
				form.copy(this.rowData);
				this.title='新建';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.refresh();
				})
				.catch(reason=>{
				});	
			},
			createNew:function(){
				const form=this.$refs.modal.getForm();
				form.clear();
				this.title='新建';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.refresh();
				})
				.catch(reason=>{
				});	
			},
			edit:function(data){
				const form=this.$refs.modal.getForm();
				form.setValue(data);
				this.title='修改';
				this.$refs.modal.ShowDialog()
				.then(value=>{
					this.refresh();
				})
				.catch(reason=>{
					
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
				this.rowData=data;
				this.$emit('ON-ROW-CLICK',data);
			},
			setWhere(data){
				this.where={where:data};
			},
			refreshPage:function(pageNo){
				var page={
					current:this.current,  //当前页
    				pagesize:this.pagesize //每页条数
				}
				this.$axios.post(`/models/${this.model}/data`,{...this.where,...page})
				.then(value=>{
						if(value.success){
							this.data1=value.result;
							this.rowData=null;
						}else{
							alert(value.message);
						}
					}
				).catch(reason=>{
					alert(reason.message);
				})
			},
			refresh:function(){
				this.$axios.post(`/models/${this.model}/count`,this.where)
				.then(value=>{
					if(value.success){
						this.Count=value.result;
						this.current=1;
						this.refreshPage(1);
					}else{
						alert(value.message);
					}
				})
				.catch(reason=>{
					alert(reason.message);
				});	
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
