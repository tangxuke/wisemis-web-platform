<template>
    <d2-container>
				<Tabs>
					<TabPane label="组件列表">
						<Row>
							<Col :span="12">
								<my-table model="components" @ON-ROW-CLICK="onRowClick" :hideButtons="true" ref="components"></my-table>
							</Col>
							<Col :span="12">
								<Form :label-width="80">
									<FormItem label="组件名"><Input v-model="ComponentName"/></FormItem>
									<FormItem label="标签名"><Input v-model="ComponentTag"/></FormItem>
									<FormItem label="备注"><Input v-model="ComponentRemark"/></FormItem>
									<FormItem>
										<Button type="primary" @click="Save">保存</Button>
										<Button @click="createNewObject" style="margin-left:10px;">新建</Button>
									</FormItem>
								</Form>
							</Col>
						</Row>
					</TabPane>
					<TabPane label="设计">
						<div style="padding: 10px;background: #f8f8f9">
							<Tabs>
								<TabPane label="render">
									<my-render 
										:oVue="oVue"
										ref="render"
									/>
								</TabPane>
								<TabPane label="props">
									<Form :label-width="100">
										<FormItem label="属性列表">
											<Input v-model="oVue.theProps"/>
										</FormItem>
									</Form>
								</TabPane>
								<TabPane label="data">
									<my-data 
										:oVue="oVue"
										ref="data"
									/>
								</TabPane>
								<TabPane label="computed">
									<my-computed 
										:oVue="oVue"
										ref="computed"
									/>
								</TabPane>
								<TabPane label="methods">
									<my-methods 
										:oVue="oVue"
										ref="methods"
									/>
								</TabPane>
								
								<TabPane label="mounted">
									<base-editbox v-model="oVue.mounted" :rows="15"></base-editbox>
								</TabPane>
								<TabPane label="created">
									<base-editbox v-model="oVue.created" :rows="15"></base-editbox>
								</TabPane>
								<TabPane label="watch">
									<my-watch 
										:oVue="oVue"
										ref="watch"
									/>
								</TabPane>
							</Tabs>
						</div>
					</TabPane>
					<TabPane :label="labelPreview">
						<Row>
							<div id="preview" style="padding:10px;">

							</div>
						</Row>
						
					</TabPane>
				</Tabs>
    </d2-container>
</template>

<style scoped>
@import url("./style.css");
</style>
<script src="./script.js"></script>
