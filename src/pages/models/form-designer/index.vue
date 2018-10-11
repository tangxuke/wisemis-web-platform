<template>
    <d2-container>
        <Row>
            <Col :span="8">
				<Row>
					<Button type="primary" @click="refreshDom">Preview</Button>

					<Tree :data="data1" :render="renderContent"></Tree>
				</Row>
            	<Row>
					<Input type="textarea" v-model="code" autosize/>
				</Row>
			</Col>
			<Col :span="16" style="padding:10px;">
				<div id="demo" style="border:#c0c0c0 1px solid;min-height:100px;">
				</div>
			</Col>
        </Row>
    </d2-container>
</template>

<script src="./script.js"></script>
