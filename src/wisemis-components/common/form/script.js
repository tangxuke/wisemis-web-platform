
import MyFieldControl from "@/wisemis-components/controls/field-control";

export default {
  props: ["model", "column-count"],
  components: {
    "my-field-control": MyFieldControl
  },
  data() {
    return {
      fields: [],
      ColumnCount: 1,
      thePages: []
    };
  },
  methods: {
    /**
     * 表格事件
     * @param {{type:string,params:string,code:string}[]} events
     */
    setEvents(events) {
      if (!Array.isArray(events)) return;
      events.forEach(ev => {
        var params = ev.params || "";
        var aParams = params.split(",");
        var fn = new Function(...aParams, ev.code);

        this.$on(ev.type, (...aParams) => {
          fn.call(this, ...aParams);
        });
      });
    },
    /**
     * 检查数据有效性
     * @returns {boolean}
     */
    checkValid() {
      debugger;
      var oField = this.fields
        .filter(item => {
          return (item.IsInsert || item.IsUpdate) && item.ShowInForm;
        })
        .find(item => {
          return !item.$control.checkValid();
        });
      if (oField) {
        return false;
      }
      return true;
    },
    getModel() {
      if (!this.model) {
        return;
      }
      var _this = this;
      this.$axios
        .post(`/models/${this.model}`)
        .then(value => {
          if (value.success) {
            _this.ColumnCount = value.result.ColumnCount;
            _this.fields = value.result.Fields.map(item => {
              item.thisform = _this;
              item.OldValue = item.DefaultValue;
              item.ColSpan = (24 / this.formColumnCount) * item.ColSpan;
              if (item.ColSpan > 24) item.ColSpan = 24;
              if (!item.Page) {
                item.Page = "基本信息";
              }
              return item;
            });
            if (!value.result.Pages) value.result.Pages = "基本信息";
            _this.thePages = value.result.Pages.split(",").map(page => {
              return {
                name: page,
                fields: _this.fields.filter(field => {
                  return field.Page === page;
                })
              };
            });

            //设置表单事件
            this.setEvents(value.result.FormScripts);
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
      this.$emit("SET-DEFAULT-VALUE", data);
    },
    setValue(data) {
      this.fields
        .filter(item => {
          return Object.keys(data).includes(item.Name);
        })
        .forEach(item => {
          var value = data[item.Name];
          item.Value = value;
          item.OldValue = value;
        });
      this.$emit("FORM-SET-VALUE", data);
    },
    save: function() {
      debugger;
      if (!this.checkValid()) {
        return Promise.reject(new Error("验证数据有效性失败！"));
      }
      this.$emit("ON-SAVE-BEFORE");
      var data = {};
      this.fields
        .filter(item => {
          return item.IsInsert || item.IsUpdate || item.IsKey;
        })
        .forEach(item => {
          data[item.Name] = item.Value;
          data[item.Name + "_OldValue"] = item.OldValue;
        });

      return new Promise((resolve, reject) => {
        this.$axios
          .post(`/models/${this.model}/save`, data)
          .then(value => {
            if (value.success) {
              this.$emit("ON-SAVE-SUCCESS");
              this.$Message.success("保存成功！");
              resolve(true);
            } else {
              this.$Modal.error({
                title: "保存失败",
                content: value.message
              });
              this.$emit("ON-SAVE-FALIED", value.message);
              reject(new Error(value.message));
            }
          })
          .catch(reason => {
            this.$Modal.error({
              title: "保存失败",
              content: reason.message
            });
            this.$emit("ON-SAVE-FALIED", reason.message);
            reject(reason);
          });
      });
    }
  },
  mounted() {
    this.$fields={};
    this.getModel();
  },
  computed: {
    modelName: function() {
      return this.model;
    },
    formColumnCount() {
      return this["column-count"] || this.ColumnCount;
    }
  },
  watch: {
    model() {
      this.getModel();
    }
  }
};
