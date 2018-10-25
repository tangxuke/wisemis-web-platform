<template>
	<my-modal title="对选定行的字段赋值" ref="dialog">
		<Form :label-width="100">
			<FormItem label="选择字段">
				<Select>
					<Option v-for="field in fields" :key="field.Name" :value="field.Name">{{field.Title}}</Option>
				</Select>
			</FormItem>
			<FormItem label="字段赋值">
				<Input/>
			</FormItem>
		</Form>
	</my-modal>
</template>

<script>
export default {
  props: ["fields"]
};
</script>
