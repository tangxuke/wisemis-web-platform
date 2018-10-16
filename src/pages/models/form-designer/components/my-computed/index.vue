<template>
	<Row>
		<Col :span="10">
			<Form :label-width="100">
				<FormItem label="属性名称" required>
					<Input v-model="name"/>
				</FormItem>
				<FormItem label="属性代码" required>
					<Tabs>
						<TabPane label="get">
							<Input v-model="get_value" type="textarea" autosize ref="control1" @on-keydown="onKeyDown1"/>
						</TabPane>
						<TabPane label="set">
							<Alert type="info">默认参数是newValue，即set(newValue){your_code_here}</Alert>
							<Input v-model="set_value" type="textarea" autosize ref="control2" @on-keydown="onKeyDown2"/>
						</TabPane>
					</Tabs>
					
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
			<Table :columns="columns" :data="oVue.computed" @on-row-click="onRowClick" />
		</Col>
	</Row>
	
</template>

<script src="./script.js">

</script>

