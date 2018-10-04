<template>
    <Form is="Form" :label-width="80">
        <Row> 
            <my-field-control 
              v-for="field in fields" 
              :key="field.Name"
              :oFieldObject="field"
              :ref="field.Name"
              ></my-field-control>
        </Row>
    </Form>
</template>

<script>
import MyFieldControl from '@/wisemis-components/controls/field-control';

export default {
  props: ["model"],
  components:{
    'my-field-control':MyFieldControl
  },
  data() {
    return {
      fields: [],
      database: ""
    };
  },
  methods: {
    /**
     * 检查数据有效性
     * @returns {boolean}
     */
    checkValid(){
      var oField=this.fields.find(item=>{
        return item.IsKey && !item.Value;
      });
      if(oField){
        alert(oField.Title+'不能为空！');
        oField.control.setFocus();
        return false;
      }
      return true;
    },
    /**
     * 设置焦点
     * @param {string} field 字段名称
     */
    setFocus(field) {
      var el = this.$refs[field][0];
      el.setFocus();
    },
    /**
     * 设置字段值
     * @param {string} field 字段名称
     * @param {any} value 字段值
     */
    setFieldValue(field, value) {
      var el = this.$refs[field][0];
      el.$emit("input", value);
    },
    /**
     * 获取字段值
     * @param {string} field 字段名称
     * @returns {any}
     */
    getFieldValue(field) {
      var el = this.$refs[field][0];
      return el.value;
    },
    /**
     * 查询数据库
     * @param {string} sql 查询语句
     * @param {any[]} params 参数数组
     * @param {string} database 数据库，默认当前模型数据库
     * @returns {Promise<any[]>}
     */
    getSqlValue(sql, params, database) {
        if(!sql){
            return Promise.reject(new Error('缺少查询语句！'));
        }
        if(!Array.isArray(params)){
            params=[];
        }
        if(!database){
            database=this.database;
        }

        var data={
            sql,
            params,
            database
        }
        return this.$axios.post('/query',data).then(value=>{
            if(value.success)
                return Promise.resolve(value.result);
            else
                return Promise.reject(new Error(value.message));
        });
    },
    getModel() {
      if (!this.model) {
        return;
      }
      this.$axios
        .post(`/models/${this.model}/form`)
        .then(value => {
          if (value.success) {
            this.database=value.result.Database;
            this.fields = value.result.Fields.map(item => {
              item.thisform=this;
              item.Value = item.DefaultValue;
              item.OldValue = item.DefaultValue;
              item.ColSpan = (24 / value.result.ColumnCount) * item.ColSpan;
              if (item.ColSpan > 24) item.ColSpan = 24;
              return item;
            });
          } else {
            alert(value.message);
          }
        })
        .catch(reason => {
          alert(reason.message);
        });
    },
    clear: function() {
      this.fields.forEach(item => {
        item.OldValue = item.DefaultValue;
        item.Value = item.DefaultValue;
      });
    },
    copy: function(data) {
      this.clear();
      this.fields.forEach(item => {
        item.Value = data[item.Name];
      });
    },
    setDefault(data) {
      Object.keys(data).forEach(item => {
        var field = this.fields.find(e => {
          return e.Name === item;
        });
        if (field) {
          field.DefaultValue = data[item];
        }
      });
    },
    setValue(data) {
      this.fields.forEach(item => {
        var value = data[item.Name];
        item.Value = value;
        item.OldValue = value;
      });
    },
    save: function() {
      var data = {};
      this.fields.forEach(item => {
        data[item.Name] = item.Value;
        data[item.Name + "_OldValue"] = item.OldValue;
      });

      return new Promise((resolve, reject) => {
        this.$axios
          .post(`/models/${this.model}/save`, data)
          .then(value => {
            if (value.success) {
              this.$Message.success("保存成功！");
              resolve(true);
            } else {
              this.$Modal.error({
                title: "保存失败提示",
                content: value.message
              });
              reject(new Error(value.message));
            }
          })
          .catch(reason => {
            this.$Modal.error({
              title: "保存失败提示",
              content: reason.message
            });
            reject(reason);
          });
      });
    }
  },
  mounted() {
    this.getModel();
  },
  computed: {
    modelName: function() {
      return this.model;
    }
  }
};
</script>
