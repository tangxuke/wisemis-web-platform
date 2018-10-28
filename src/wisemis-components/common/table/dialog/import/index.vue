<template>
	<my-modal title="从Excel导入数据" :width="800" ref="dialog">
		<Row style="padding:10px;">
			<el-upload
				class="upload-demo"
				:action="action"
				name="myfile"
				:on-success="onSuccess"
				:on-error="onError"
				>
				<el-button size="small" type="primary">点击上传，只接受.xls或.xlsx类型文件</el-button>
			</el-upload>
			<div style="margin:10px 0">
				<Select v-model="sheetName" placeholder="请选择工作表..." @on-change="onSelectSheet">
					<Option v-for="sheet in sheets" :key="sheet" :value="sheet">{{sheet}}</Option>
				</Select>
			</div>
		</Row>
		<Row>
			<p style="margin-bottom:10px;">预览前5条记录和后5条记录</p>
			<Table :columns="columns" :data="data" :height="300">
				
			</Table>
		</Row>
		<Row style="padding:10px 0;">
			<p style="margin-bottom:10px;">设置字段对应关系</p>
			<Table :columns="relationColumns" :data="fieldData" :height="300" :row-class-name="rowClassName"></Table>
		</Row>
		<Row style="padding:10px;">
			<Button type="success" @click="doImport">开始导入</Button>
		</Row>
	</my-modal>
</template>

<style>
.ivu-table .demo-table-info-row td{
        background-color:blueviolet;
		color: white;
    }
</style>


<script>
export default {
	props: ["model","fields"],
	data() {
		return {
			columns: [],
			data: [],
			sheets: [],
			sheetName: "",
			filename: "",
			relationColumns:[
				{
					title:'字段名称',
					key:'title'
				},
				{
					title:'Excel字段',
					key:'excel',
					render:(h,{column,index})=>{
						var _this=this;
						return h('Select',{
							props:{
								value:_this.fieldData[index].excel,
								clearable:true
							},
							on:{
								'on-change':(value)=>{
									this.fieldData[index].excel=value;
								}
							}
						},Array.from(this.columns).filter(item=>{
							return item.key!=='__rowid__';
						}).map(item=>{
							return h('Option',{
								props:{
									value:item.key
								}
							},[item.key]);
						}))
					}
				},
				{
					title:'关键字',
					key:'isKey',
					render:(h,{column,index})=>{
						return h('Checkbox',{
							props:{
								value:this.fieldData[index].isKey
							},
							on:{
								'on-change':(value)=>{
									this.fieldData[index].isKey=value;
								}
							}
						})
					}
				},
				{
					title:'新建',
					key:'isInsert',
					render:(h,{column,index})=>{
						return h('Checkbox',{
							props:{
								value:this.fieldData[index].isInsert
							},
							on:{
								'on-change':(value)=>{
									this.fieldData[index].isInsert=value;
								}
							}
						})
					}
				},
				{
					title:'修改',
					key:'isUpdate',
					render:(h,{column,index})=>{
						return h('Checkbox',{
							props:{
								value:this.fieldData[index].isUpdate
							},
							on:{
								'on-change':(value)=>{
									this.fieldData[index].isUpdate=value;
								}
							}
						})
					}
				}
			]
		};
	},
	computed: {
		action() {
			return `http://localhost:3000/import/`;
		},
		fieldData(){
			return this.fields.sort((a,b)=>{
				return a.OrderId-b.OrderId;
			}).map(item=>{
				return {
					name:item.Name,
					title:item.Title,
					excel:'',
					__checked__:false,
					isKey:false,
					isInsert:false,
					isUpdate:false
				}
			})
		}
	},
	methods: {
		doImport(){
			var body={
				filename: this.filename,
				sheetName: this.sheetName,
				relations:this.fieldData.filter(item=>{
					return item.excel?true:false;
				})
			};
			this.$axios.post(`/import/upload/${this.model}`,body)
			.then(value=>{
				if(value.success){
					alert('导入成功！');
				}else{
					alert('导入失败：'+value.message);
				}
			})
			.catch(reason=>{
				alert('导入失败：'+reason.message);
			})
		},
		rowClassName(row,index){
			if(this.fieldData[index].excel)
				return 'demo-table-info-row';
			else
				return '';
		},
		/**选择了工作表，开始预览 */
		onSelectSheet(sheetName) {
			var body = {
				filename: this.filename,
				sheetName: this.sheetName
			};
			this.$axios.post(`/import/preview`, body).then(value => {
				if (value.success) {
					this.data=value.result;
					if(this.data.length>0){
						var row=this.data[0];
						this.columns=Object.keys(row).map(key=>{
							return {
								key,title:key==='__rowid__'?'行号':key,maxWidth:200,minWidth:80,ellipsis:true,tooltip:true
							}
						});
					}
				}
			});
		},
		onSuccess(res) {
			if (res.success) {
				this.sheets = res.result.sheets.split(",");
				this.filename = res.result.filename;
			} else {
				alert(res.message);
			}
		},
		onError(err) {
			alert(err.message);
		}
	}
};
</script>
