<template>
    <d2-container>
		<Tabs>
			<TabPane label="设计">
				<div style="padding: 10px;background: #f8f8f9">
					<Tabs>
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
						<TabPane label="render">
							<my-render 
								:oVue="oVue"
								ref="render"
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
			<TabPane label="预览">
				<Button type="success" @click="Preview">预览效果</Button>
				<Button type="primary" @click="Save">保存页面</Button>
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
