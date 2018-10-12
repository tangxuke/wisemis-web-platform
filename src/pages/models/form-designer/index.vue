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
						<Col :span="17" style="padding:10px;border-left:#c0c0c0 1px dashed;">
							<my-data 
								v-if="showType==='data'"
								:oVue="oVue"
							/>
							<my-render 
								v-if="showType==='render'"
								:oVue="oVue"
							/>
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
