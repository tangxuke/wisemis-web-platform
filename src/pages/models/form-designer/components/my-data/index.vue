<template>
	<Row>
		<Col :span="10">
			<Form :label-width="100">
				<FormItem label="变量名称" required>
					<Input v-model="name"/>
				</FormItem>
				<FormItem label="变量值" required>
					<Input v-model="value" type="textarea" autosize/>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="remark"/>
				</FormItem>
				<FormItem>
					<Button type="success" @click="Apply">应用</Button>
					<Button @click="clear" style="margin-left:5px;">清空</Button>
				</FormItem>
			</Form>
		</Col>
		<Col :span="14" style="padding:10px;">
			<Table :columns="columns" :data="oVue.data" @on-row-click="onRowClick" />
		</Col>
	</Row>
</template>
<script>
export default {
	props:['oVue'],
  data() {
    return {
      name: "",
      value: "",
      remark: "",
      index: -1,
      columns: [
        {
          key: "name",
          title: "变量名称",
          width: 100,
          render: (h, { row, column, index }) => {
            return h(
              "Tooltip",
              {
                props: {
                  content: row.remark
                }
              },
              row.name
            );
          }
        },
        {
          key: "value",
          title: "变量值",
          ellipsis: true
        },
        {
		  title: "Action",
		  fixed:'right',
		  width:80,
          render: (h, { row, column, index }) => {
            var _this = this;
            return h(
              "Button",
              {
                props: {
                  type: "text"
                },
                on: {
                  click() {
                    _this.data1.splice(index, 1);
                  }
                }
              },
              "Del"
            );
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    clear() {
      this.name = "";
      this.value = "";
      this.remark = "";
      this.index = -1;
    },
    onRowClick(row, index) {
      this.name = row.name;
      this.value = row.value;
      this.remark = row.remark;
      this.index = index;
    },
    Apply() {
      if (this.index > -1) {
        this.oVue.data[this.index].name = this.name;
        this.oVue.data[this.index].value = this.value;
        this.oVue.data[this.index].remark = this.remark;
      } else {
        this.oVue.data.push({
          name: this.name,
          value: this.value,
          remark: this.remark
        });
      }
      this.clear();
    }
  }
};
</script>
