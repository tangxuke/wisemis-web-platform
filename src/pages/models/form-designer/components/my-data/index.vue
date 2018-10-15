<template>
	<Row>
		<Col :span="10">
			<Form :label-width="100">
				<FormItem label="变量名称" required>
					<Input v-model="name"/>
				</FormItem>
				<FormItem label="变量值" required>
					<Input v-model="value" type="textarea" autosize/>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="remark"/>
				</FormItem>
				<FormItem>
					<Button type="success" @click="Apply">应用</Button>
					<Button @click="clear" style="margin-left:5px;">清空</Button>
				</FormItem>
			</Form>
		</Col>
		<Col :span="14" style="padding:10px;">
			<Table :columns="columns" :data="oVue.data" @on-row-click="onRowClick" />
		</Col>
	</Row>
</template>
<script src="./script.js">

</script>
