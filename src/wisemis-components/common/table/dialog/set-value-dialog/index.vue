<template>
	<my-modal title="对选定行的字段赋值" ref="dialog" @OK="onOK">
		<Form :label-width="100">
			<FormItem label="选择字段">
				<Select v-model="fieldName">
					<Option v-for="field in fields" :key="field.Name" :value="field.Name">{{field.Title}}</Option>
				</Select>
			</FormItem>
			<FormItem v-if="fieldName">
				<Checkbox v-model="useExpression">使用自定义函数</Checkbox>
			</FormItem>
			<FormItem label="字段赋值" v-if="fieldName && !useExpression">
				<div :is="oFieldObject.ControlType" :oFieldObject="oFieldObject" ref="field"></div>
			</FormItem>
			<FormItem label="自定义函数代码" v-if="fieldName && useExpression">
				<Row>
					<Alert type="success">唯一参数：data，代表当前行数据，可用data.__index__表示当前行号</Alert>
					data数据项：
					<Alert type="success">{{fields.map(item=>item.Name+':'+item.Title).join(',')}}</Alert>
				</Row>
				<Row>
					<Input type="textarea" v-model="expression" placeholder="请输入函数代码，必须有返回语句。"/>
				</Row>	
			</FormItem>
		</Form>
	</my-modal>
</template>

<script>
export default {
  props: ["fields"],
  data(){
	  return {
		  fieldName:'',
		  useExpression:false,
		  expression:''
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
		  this.$emit('ON-OK',{Name:this.oFieldObject.Name,UseExpression:this.useExpression,Value:this.useExpression?this.expression:this.oFieldObject.Value});
	  }
  }
};
</script>
