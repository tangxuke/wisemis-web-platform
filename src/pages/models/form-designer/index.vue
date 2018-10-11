<template>
    <d2-container>
		<Tabs>
			<TabPane label="代码">
				<div style="padding: 10px;background: #f8f8f9">
					<Row>
						<Col :span="7">
							<Card title="Options" icon="ios-options" :padding="0" shadow style="width: 300px;">
								<CellGroup>
									<Cell><span @click="selectType('data')">data</span></Cell>
									<Cell><span @click="selectType('render')">render</span></Cell>
								</CellGroup>
							</Card>
						</Col>
						<Col :span="17">
							<div v-if="showType==='data'">
								<Form :label-width="100">
									<FormItem label="变量名称">
										<Input v-model="dataItem"/>
									</FormItem>
									<FormItem label="变量值">
										<Input v-model="dataValue" type="textarea"/>
									</FormItem>
									<FormItem>
										<Button type="success">添加变量</Button>
									</FormItem>
								</Form>
							</div>
							<div v-if="showType==='render'">
								<Alert>提示：返回render函数，参数是h</Alert>
								<Input 
									type="textarea" 
									:rows="18"
									:autofocus="true"
									v-model="renderCode"
									@on-keydown="onKeyDown"
									ref="control"
								/>
							</div>
							
						</Col>
					</Row>
					
    			</div>
				

			</TabPane>
			<TabPane label="预览">
				<Button type="success" @click="Preview">预览效果</Button>
				<div id="preview">

				</div>
			</TabPane>
		</Tabs>
    </d2-container>
</template>

<style scoped>
@import url("./style.css");
</style>



<script src="./script.js"></script>
