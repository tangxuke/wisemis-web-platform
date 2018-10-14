<template>
    <d2-container>
		<Tabs>
			<TabPane label="设计">
				<div style="padding: 10px;background: #f8f8f9">
					<Row>
							<my-render 
								:oVue="oVue"
								ref="render"
							/>
					</Row>
					
    			</div>
				

			</TabPane>
			<TabPane label="预览">
				<Button type="success" @click="Preview">预览效果</Button>
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
