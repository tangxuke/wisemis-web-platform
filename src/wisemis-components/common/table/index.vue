<template>
	<div>
		<Row v-if="!hideButtons">
			<ButtonGroup>
				<Button type="success" @click="createNew">新建</Button>
				<Button type="default" @click="copy" :disabled="!rowData">复制</Button>
			</ButtonGroup>
			<ButtonGroup style="margin:3px 10px;">
				<Button type="primary" @click="$refs.modal2.ShowDialog()">查询</Button>
				<Button type="default" @click="refresh">刷新</Button>
			</ButtonGroup>
			<ButtonGroup style="margin:3px 10px;">
				<template v-for="action in actions">
					<template v-if="action.Remark">
						<Tooltip :key="action.Action"  :delay="1000"  :max-width="500">
							<Button
							v-if="actionState[action.Action].visible"
							:disabled="!actionState[action.Action].enable"
							@click="doAction(action.Action)"
							v-html="actionState[action.Action].title"
							/>
							<div slot="content">
								<div>{{action.Remark}}</div>
							</div>
						</Tooltip>
					</template>
					<template v-else>
						<Button
							:key="action.Action"
							v-if="actionState[action.Action].visible"
							:disabled="!actionState[action.Action].enable"
							@click="doAction(action.Action)"
							v-html="actionState[action.Action].title"
							/>
					</template>
				</template>
				
			</ButtonGroup>
			<slot></slot>
			<ButtonGroup style="float:right">
			
				<Dropdown trigger="click" :transfer="true" style="margin-left: 20px">
					<Button type="default">列...</Button>
					<DropdownMenu slot="list">
							<el-scrollbar wrapClass="scrollbar-wrapper">
								<div style="max-height:500px;width:200px;padding:5px;">
					<Row>
						<Col :span="12" 
						v-for="field in fields"
												:key="field.Name"
												:name="field.Name">
							<Checkbox v-model="field.ShowInGrid">{{field.Title}}</Checkbox>
						</Col>
					</Row>
					<Row>
						<Button type="success">确定</Button>
						<Button type="dashed">取消</Button>
					</Row>
								</div>
						</el-scrollbar>
					</DropdownMenu>
			</Dropdown>
				
			</ButtonGroup>
		</Row>
		<Row>
			<Table
				ref="table"
				:border="true" 
				:highlight-row="true"
				:columns="columns" 
				:data="data1" 
				:loading="loading"
				@on-row-click="onRowClick"
				@REFRESH-ACTION-STATE="refreshActionState"
				no-data-text="暂无数据，请刷新或查询！"
				style="margin-top:3px;"
				>
			</Table>
		</Row>
		<Row>

			<Checkbox v-model="multiSelect">多选</Checkbox>
			<ButtonGroup v-if="multiSelect" style="margin:5px;">
				<Button @click="confirmDeleteSelected" :disabled="SelectState == 0">删除所选</Button>
				<Button @click="ShowSetValueDialog" :disabled="SelectState == 0">选择赋值</Button>
			</ButtonGroup>
			<set-value-dialog :fields="getEditableFields()" ref="set_value_dialog" @ON-OK="onSetValueDialogOK"></set-value-dialog>
			<ButtonGroup style="margin:5px;" v-if="!hideButtons">
				<Button>导入</Button>
				<Button>导出{{multiSelect?'所选':''}}</Button>
			</ButtonGroup>
			
			<Page 
				:total="Count" 
				:page-size="pagesize" 
				:current.sync="current" 
				@on-change="refreshPage" 
				style="float:right;margin:5px 0;"
				v-if="Count>pagesize"
				show-sizer
				:page-size-opts="[10,100,500,1000]"
				@on-page-size-change="dddd"
			/>
		</Row>
		<Row>
			<my-modal :title="title" :width="modalWidth" @OK="onSave" :loading="true" ref="modal1">
				<my-form :model="model" ref="form"></my-form>
			</my-modal>
			<my-modal title="查询" :width="900" @OK="onQuery" ref="modal2">
				<my-query :model="model" ref="query"></my-query>
			</my-modal>
		</Row>
	</div>
	
</template>


<script src="./script/">
</script>

<style scoped>
@import url("./style.css");
d {
  position: absolute;
}
</style>