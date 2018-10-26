<template>
	<my-modal title="从Excel导入数据" ref="dialog">
		<Row style="padding:10px;">
			<el-upload
				class="upload-demo"
				:action="action"
				name="myfile"
				:on-success="onSuccess"
				:on-error="onError"
				>
				<el-button size="small" type="primary">点击上传，只接受.xls或.xlsx类型文件</el-button>
			</el-upload>
			<div style="margin:10px 0">
				<Select v-model="sheetName" placeholder="请选择工作表..." @on-change="onSelectSheet">
					<Option v-for="sheet in sheets" :key="sheet" :value="sheet">{{sheet}}</Option>
				</Select>
			</div>
		</Row>
		<Row>
			<p style="margin-bottom:10px;">预览前10条记录和后10条记录</p>
			<Table :columns="columns" :data="data">
				
			</Table>
		</Row>
		<Row style="padding:10px 0;">
			<p style="margin-bottom:10px;">设置字段对应关系</p>
			<Table></Table>
		</Row>
		<Row style="padding:10px;">
			<Button type="success">开始导入</Button>
		</Row>
	</my-modal>
</template>

<script>
export default {
  props: ["model"],
  data() {
    return {
      columns: [],
      data: [],
      sheets: [],
      sheetName: "",
      filename: ""
    };
  },
  computed: {
    action() {
      return `http://localhost:3000/import/`;
    }
  },
  methods: {
    /**选择了工作表，开始预览 */
    onSelectSheet(sheetName) {
      var body = {
        filename: this.filename,
        sheetName: this.sheetName
      };
      this.$axios.post(`/import/preview`, body).then(value => {
        if (value.success) {
        }
      });
    },
    onSuccess(res) {
      if (res.success) {
        this.sheets = res.result.sheets.split(",");
        this.filename = res.result.filename;
      } else {
        alert(res.message);
      }
    },
    onError(err) {
      alert(err.message);
    }
  }
};
</script>
