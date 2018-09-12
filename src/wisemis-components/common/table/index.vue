<template>
	<div>
		<Row>
			<Button type="success" @click="createNew">新建</Button>
			<Button type="success" @click="getData">刷新</Button>
		</Row>
		<Row>
			<Table
				:border="true" 
				:highlight-row="true"
				:columns="columns1" 
				:data="data1" 
				@on-row-click="onRowClick">
				</Table>
				<!--my-page :model="model" :eventhub="eventhub" :pagesize="pagesize" ref="page" style="margin-top:5px;"/-->
		</Row>
		<my-modal :title="title" :width="modalWidth"  :model="model" :eventhub="event" ref="modal">
		</my-modal>
	</div>
	
</template>

<style scoped>
*{
	margin:5px;
}
</style>

<script>
	import EVENT from '../event';

	export default {
		props:['model','eventhub','pagesize','showPage'],
		data () {
			return {
				title:'新建',
				modalWidth:200,
				where:{},
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
				this.event.$emit('ROW-DATA-'+this.model,data);
			},
			getColumns:function(){
				this.$axios.get(`/models/${this.model}/table`)
				.then(value=>{
						if(value.success){
							this.modalWidth=300*value.result.ColumnCount;
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
							this.columns1=[...fields,...this.actionColumn];
						}else{
							alert(value.message);
						}
					}
				).catch(reason=>{
					alert(reason.message);
				})
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
			this.event.$on(`DATA-${this.model}`,data=>{
				this.where=data;
				this.getData();
			})
		}
	}
</script>
