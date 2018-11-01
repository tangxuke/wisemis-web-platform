<template>
	<Form is="Form" :label-width="80">
	<Tabs>
	  <TabPane v-for="myPage in thePages" :key="myPage.name" :label="myPage.name">
		  <Row>
			<my-field-control 
			v-for="field in myPage.fields" 
			:key="field.Name"
			v-show="field.ShowInForm"
			:oFieldObject="field"
			:ref="field.Name"
			></my-field-control> 
		  </Row>
	  </TabPane>
	</Tabs>

	<!--Row>
			<my-field-control 
			v-for="field in fields" 
			:key="field.Name"
			v-show="field.ShowInForm"
			:oFieldObject="field"
			:ref="field.Name"
			></my-field-control> 
		  </Row-->
	  
	</Form>
</template>

<script src="./script.js">
  
</script>