<template>
    <Form is="Form" :label-width="80">
        <Row>
            <Col :span="8" v-for="field in fields" :key="field.Name">
                <my-query-control :oFieldObject="field" :key="field.Name" :ref="field.Name">
                </my-query-control>
            </Col>  
        </Row> 
        <Row>
            <!--Col :span="8"-->
                <Dropdown trigger="click" @on-click="AddSearchField">
                    <Button type="dashed" icon="md-add">添加查询字段</Button>
                    <DropdownMenu slot="list">
                        <el-scrollbar wrapClass="scrollbar-wrapper">
                            <div style="max-height:500px;width:80px;">
                                <DropdownItem 
                                v-for="field in fields2"
                                :key="field.Name"
                                :name="field.Name"
                                >
                                {{field.Title}}
                                </DropdownItem>
                            </div>
                        </el-scrollbar>
                    </DropdownMenu>
                </Dropdown>
            <!--/Col>
            <Col :span="8"-->
                <Button type="dashed" icon="md-add" style="margin-left:10px;" @click="openTextDialog">添加自定义条件</Button>
            <!--/Col-->
        </Row> 
    </Form>
</template>

<script>
import MyQueryControl from "@/wisemis-components/controls/query-control";
export default {
  props: ["model"],
  components: {
    "my-query-control": MyQueryControl
  },
  data() {
    return {
      oModelObject: {}
    };
  },
  computed: {
    fields() {
      if (!Array.isArray(this.oModelObject.Fields)) return [];
      return this.oModelObject.Fields.filter(item => {
        return item.SearchField;
      });
    },
    fields2() {
      if (!Array.isArray(this.oModelObject.Fields)) return [];
      return this.oModelObject.Fields.filter(item => {
        return !item.SearchField;
      });
    }
  },
  methods: {
    /**打开文本对话框 */
    openTextDialog() {
      this.$dialogs
        .OpenTextDialog("添加自定义条件")
        .then(value => {
          alert(value);
        })
        .catch(() => {});
    },
    /**
     * 添加查询字段
     * @param {string} name 字段名称
     */
    AddSearchField(name) {
      var oField = this.oModelObject.Fields.find(item => {
        return item.Name === name;
      });
      if (oField) {
        oField.SearchField = true;
      }
    },
    query() {
      var where = [];
      for (var key in this.$refs) {
        var searchExpr = this.$refs[key][0].getSearchExpr();
        where.push(searchExpr);
      }
      return { query: where };
    },
    clear() {
      this.fields.forEach(item => {
        item.Value = item.DefaultValue;
      });
    },
    getModel() {
      if (!this.model) return;
      this.$axios.post(`/models/${this.model}`).then(value => {
        if (value.success) {
          this.oModelObject = value.result;
        }
      });
    }
  },
  mounted() {
    this.getModel();
  }
};
</script>
