<template>
	<my-modal title="对选定行的字段赋值" ref="dialog" @OK="onOK">
		<Form :label-width="100">
			<FormItem label="选择字段">
				<Select v-model="fieldName">
					<Option v-for="field in fields" :key="field.Name" :value="field.Name">{{field.Title}}</Option>
				</Select>
			</FormItem>
			<FormItem label="字段赋值" v-if="oFieldObject">
				<div :is="oFieldObject.ControlType" :oFieldObject="oFieldObject" ref="field"></div>
			</FormItem>
		</Form>
	</my-modal>
</template>

<script>
export default {
  props: ["fields"],
  data(){
	  return {
		  fieldName:''
	  }
  },
  computed:{
	  oFieldObject(){
		  return this.fields.find(item=>{
			  return item.Name===this.fieldName;
		  });
	  }
  },
  methods:{
	  onOK(){
		  this.$emit('ON-OK',this.oFieldObject);
	  }
  }
};
</script>
