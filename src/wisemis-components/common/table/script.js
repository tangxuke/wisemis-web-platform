import SetValueDialog from './dialog/set-value-dialog';
import MyImport from './dialog/import';

export default {
    props: ["model", "hideAction", "hideButtons", "relatedTables","height"],
    components: {
        'set-value-dialog': SetValueDialog,
        'my-import':MyImport
    },
    data() {
        return {
            multiSelect: false,
            loading: false,
            Count: 0,
            current: 1,
            data1: [],
            tablename: '',
            selectionColumn: {
                width: 60,
                align: 'center',
                key: '__checked__',
                renderHeader: (h, {
                    column,
                    index
                }) => {
                    return h('Checkbox', {
                        props: {
                            indeterminate: this.SelectState === -1,
                            value: this.SelectState === 1 ? true : false
                        },
                        on: {
                            'on-change': value => {
                                this.selectAll(value);
                            }
                        }
                    });
                },
                render: (h, params) => {
                    return h('Checkbox', {
                        ref: 'check',
                        props: {
                            value: params.row.__checked__
                        },
                        on: {
                            'on-change': value => {
                                this.data1[params.index].__checked__ = value;
                            }
                        }
                    });
                }
            },
            actionColumn: {
                title: "Action",
                key: "action",
                fixed: "right",
                width: 120,
                render: (h, params) => {
                    return h("div", [
                        h(
                            "Button", {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row);
                                    }
                                }
                            },
                            "Edit"
                        ),
                        h(
                            "Button", {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: "删除提示",
                                            content: "你真的要删除这条记录吗？",
                                            onOk: () => {
                                                this.delete(params.row);
                                            }
                                        });
                                    }
                                }
                            },
                            "Del"
                        )
                    ]);
                }
            },
            where: {},
            query: {},
            title: "新建",
            modalWidth: 300,
            modalWidth2: 300,
            rowData: null,
            actions: [],
            actionState: {},
            fields: [],
            showMoreColumns: false,
            pagesize:10
        };
    },
    computed: {
        SelectState() {
            if (Array.from(this.data1).length === 0)
                return 0;
            //全选
            if (Array.from(this.data1).every(item => {
                    return item.__checked__;
                }))
                return 1;
            //全不选
            if (Array.from(this.data1).every(item => {
                    return !item.__checked__;
                }))
                return 0;
            //不确定状态
            return -1;
        },
        modelName: function() {
            return this.model;
        },
        columns() {
            var cols = [];
            if (this.multiSelect)
                cols.push(this.selectionColumn);
            var gridFields = this.fields.filter(item => {
                    return item.ShowInGrid;
                })
                .map(item => {
                    var column={
                        key: item.Name,
                        title: item.Title,
                        minWidth: item.Width,
                        ellipsis: true,
                        tooltip: true
                    };
                    if(item.GridRenderCode){
                        column.render=new Function('h','{row,column,index}',item.GridRenderCode);
                    };
                    if(item.GridHeaderRenderCode){
                        column.renderHeader=new Function('h','{column,index}',item.GridHeaderRenderCode);
                    };
                    //自动转换boolean类型字段
                    if(item.Type==='boolean' && !item.GridRenderCode){
                        column.render=new Function('h','{row,column,index}',`return h('Checkbox',{props:{value:row.${item.Name}}});`);
                    }
                    return column;
                });
            cols.push(...gridFields);
            if (!this.hideAction)
                cols.push(this.actionColumn);
            return cols;
        },

    },
    methods: {
        /**
         * 打印测试
         */
        Print(){

        },
        /**
         * 导出数据
         */
        ExportData(){
            this.$Loading.start();
            this.$axios
                .post(`/models/${this.model}/data`, {
                    ...this.where,
                    ...this.query,
                    export:true
                })
                .then(value => {
                    if (value.success) {
                        this.$Loading.finish();
                        var a=document.createElement('a');
                        a.href=value.result;
                        //a.download="test";
                        //a.setAttribute('target','_blank');
                        //a.setAttribute('download',"test");
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } else {
                        this.$Loading.error();
                        alert(value.message);
                    }
                })
                .catch(reason => {
                    alert(reason.message);
                });
        },
        /**
         * 每页条数改变时发生
         * @param {number} size 每页条数
         */
        onPageSizeChange(size){
            this.pagesize=size;
            this.refresh();
        },
        /**
         * 打开导入对话框
         */
        OpenImportDialog() {
            this.$refs.import.$refs.dialog.ShowDialog();
        },
        getEditableFields() {
            var form = this.getForm();
            if (!form)
                return [];
            return form.fields.filter(item => {
                return item.IsUpdate;
            });
        },
        /**
         * 选定列赋值返回结果
         * @param {{Name:string,UseExpression,Value:string}} oFieldObject 
         */
        onSetValueDialogOK(oFieldObject) {
            var keys = this.fields.filter(item => {
                return item.IsKey;
            }).map(item => {
                return item.Name;
            });
            var keysExpr = keys.map(key => {
                return '?'
            }).join(' and ');
            var values = [];
            
            var allSQL = Array.from(this.data1).filter(item => {
                return item.__checked__;
            }).map(item => {
                var sql = 'update `' + this.tablename + '` set ? where ' + keysExpr;
                var data = {};
                if(oFieldObject.UseExpression)
                    data[oFieldObject.Name]=new Function('data',oFieldObject.Value)(item);
                else
                    data[oFieldObject.Name]=oFieldObject.Value;

                values.push(data);

                keys.forEach(key => {
                    var keyValue = {};
                    keyValue[key] = item[key];
                    values.push(keyValue);
                });

                return sql;
            }).join(';');
            this.$methods.getSqlResults(allSQL, values)
                .then(value => {
                    this.$Message.success('选定记录赋值成功！');
                    this.refresh();
                })
                .catch(reason => {
                    this.$Modal.error({
                        title: '赋值失败',
                        content: reason.message
                    });
                });
        },
        ShowSetValueDialog() {
            this.$refs.set_value_dialog.$refs.dialog.ShowDialog();
        },
        /**
         * 确认删除选定记录的操作
         */
        confirmDeleteSelected() {
            this.$Modal.confirm({
                title: '系统提示',
                content: '你真的要删除选定记录吗？',
                onOk: () => {
                    setTimeout(() => {
                        this.deleteSelected();
                    }, 300);
                }
            })
        },
        /**
         * 多选操作
         */
        deleteSelected() {

            var keys = this.fields.filter(item => {
                return item.IsKey;
            }).map(item => {
                return item.Name;
            });
            var data = [];
            this.data1.filter(item => {
                return item.__checked__;
            }).forEach(item => {
                var keyData = {};
                keys.forEach(key => {
                    keyData[key] = item[key];
                });
                data.push(keyData);
            });

            this.$axios.post(`/models/${this.model}/deleteMany`, {
                    data
                })
                .then(value => {
                    if (value.success) {
                        this.$Message.success('删除成功！');
                        this.refresh();
                    } else {
                        this.$Modal.error({
                            title: '删除失败',
                            content: value.message
                        });
                    }
                })
                .catch(reason => {
                    this.$Modal.error({
                        title: '删除失败',
                        content: reason.message
                    });
                });
        },
        /**
         * 设置全选
         * @param {boolean} value 是否选中
         */
        selectAll(value) {
            this.data1.forEach(item => {
                this.$set(item, '__checked__', value);
            });
        },
        /**
         * 刷新动作状态
         */
        refreshActionState(row) {

            this.actions.forEach(action => {
                //检测启用条件
                var isEnable = action.enableFn.call(this, row);
                if (typeof isEnable !== 'boolean')
                    isEnable = true;
                //检测可视条件
                var isVisible = action.visibleFn.call(this, row);
                if (typeof isVisible !== 'boolean')
                    isVisible = true;
                //检查标题
                var title = action.titleFn.call(this, row);
                if (typeof title !== 'string')
                    title = action.Action;
                //设置状态
                this.actionState[action.Action].enable = isEnable;
                this.actionState[action.Action].visible = isVisible;
                this.actionState[action.Action].title = title;
            });
        },
        /**
         * 执行动作
         * @param {string} action 动作名称
         */
        doAction(action) {

            var theAction = this.actions.find(item => {
                return item.Action === action;
            });
            if (theAction) {
                theAction.operationFn.call(this, this.rowData);
            }
        },
        /**
         * 设置网格动作
         * @param {{Action:string,EnableCondition:string,VisibleCondition:string,Code:string}[]} actions 动作列表
         */
        setActions(actions) {
            actions.forEach(action => {
                action.enableFn = new Function('row', action.CheckEnableCode);
                action.visibleFn = new Function('row', action.CheckVisibleCode);
                action.titleFn = new Function('row', action.CheckTitleCode);
                action.operationFn = new Function('row', action.ActionCode);
                this.actions.push(action);

                var state = {
                    enable: true,
                    visible: true,
                    title: action.Action
                };
                this.actionState[action.Action] = state;
            });
            //首次刷新状态
            this.refreshActionState(null);
        },
        /**
         * 表格事件
         * @param {{type:string,params:string,code:string}[]} events
         */
        setEvents(events) {
            if (!Array.isArray(events))
                return;
            events.forEach(ev => {
                var params = ev.params || '';
                var aParams = params.split(',');
                var fn = new Function(...aParams, ev.code);
                this.$on(ev.type, (...aParams) => {
                    fn.call(this, ...aParams);
                });
            });
        },
        getForm() {
            return this.$refs.form;
        },
        /**
         * 保存数据
         * @param {MyModal} modal 对话框对象
         */
        onSave(modal) {
            this.$refs.form
                .save()
                .then(value => {
                    modal.value1 = false;
                    this.refresh();
                })
                .catch(reason => {
                    modal.$refs.modal.buttonLoading = false;
                });
        },
        setQuery(data) {
            this.query = {
                query: data
            };
        },
        onQuery() {
            var data = this.$refs.query.query();
            this.query = data;
            this.refresh();
            //
        },
        /**
         * 清除查询条件
         */
        clearQuery() {
            this.query = {};
            this.$refs.query.clear();
        },
        /**
         * 清除表单
         */
        clearForm() {
            this.$refs.form.clear();
        },
        getCount: function() {
            this.$axios.post(`models/${this.model}/count`).then(value => {
                if (value.success) {
                    this.Count = value.result;
                    this.current = 1;
                }
            });
        },
        copy() {
            const form = this.$refs.form;
            form.copy(this.rowData);
            this.title = "新建";
            this.$refs.modal1.ShowDialog();
        },
        createNew: function() {
            const form = this.$refs.form;
            form.clear();
            this.title = "新建";
            this.$refs.modal1.ShowDialog();
        },
        edit: function(data) {
            const form = this.$refs.form;
            form.setValue(data);
            this.title = "修改";
            this.$refs.modal1.ShowDialog();
        },
        delete: function(data) {
            this.$axios
                .post(`/models/${this.model}/delete`, data)
                .then(value => {
                    if (value.success) {
                        this.$Message.success("删除成功！");
                        this.refresh();
                    } else {
                        this.$Modal.remove();
                        setTimeout(() => {
                            this.$Modal.error({
                                title: "删除失败提示",
                                content: value.message
                            });
                        }, 300);
                    }
                })
                .catch(reason => {
                    this.$Modal.error({
                        title: "删除失败提示",
                        content: reason.message
                    });
                });
        },
        onRowClick: function(data) {
            this.rowData = data;
            //行点击事件通知
            this.$emit("ON-ROW-CLICK", data);
            //关系表格设置
            if (this.relatedTables) {
                console.log(this.relatedTables);
                if (Array.isArray(this.relatedTables)) {
                    Array.from(this.relatedTables).forEach(item => {
                        //item:{table, mainFields, childFields}
                        this.setRelation(item.table, item.mainFields, item.childFields, data);
                    })
                }
            }
        },
        setWhere(data) {
            this.where = {
                where: data
            };
        },
        refreshPage: function(pageNo) {
            this.loading = true;
            var page = {
                current: this.current, //当前页
                pagesize: this.pagesize //每页条数
            };
            this.$axios
                .post(`/models/${this.model}/data`, {
                    ...this.where,
                    ...this.query,
                    ...page
                })
                .then(value => {
                    if (value.success) {
                        this.data1 = value.result.map((item,index,arr) => {
                            return {
                                __checked__: false,
                                __index__:index+1,
                                ...item
                            };
                        });
                        this.loading = false;
                        this.rowData = null;
                    } else {
                        this.loading = false;
                        alert(value.message);
                    }
                })
                .catch(reason => {
                    this.loading = false;
                    alert(reason.message);
                });
        },
        refresh: function() {
            this.loading = true;
            this.$axios
                .post(`/models/${this.model}/count`, {
                    ...this.where,
                    ...this.query
                })
                .then(value => {
                    if (value.success) {
                        this.Count = value.result;
                        var pages = Math.ceil(this.Count / this.pagesize);
                        if (this.current > pages) this.current = pages;
                        this.refreshPage(this.current);
                    } else {
                        this.loading = false;
                        alert(value.message);
                    }
                })
                .catch(reason => {
                    this.loading = false;
                    alert(reason.message);
                });
        },
        /**
         * 设置联动关系
         * @param {Vue} child 子表格
         * @param {string} mainFields 主关联字段列表
         * @param {string} childFields 子关联字段
         * @param {any} row 主表格行数据
         */
        setRelation(child, mainFields, childFields, row) {
            if (!child || !mainFields || !childFields) {
                alert("关联参数不足！");
                return;
            }

            var mainFs = mainFields.split(",");
            var childFs = childFields.split(",");
            var data = {};
            for (var i = 0; i < mainFs.length; i++) {
                var childField = childFs[i];
                var mainField = mainFs[i];
                data[childField] = row[mainField];
            }
            child.clearQuery();
            child.setWhere(data);
            child.getForm().setDefault(data);
            child.refresh();

        },
        getModel() {
            if (!this.model) {
                return;
            }
            this.$axios
                .post(`/models/${this.model}`)
                .then(value => {
                    if (value.success) {
                        this.tablename = value.result.TableName;
                        this.modalWidth = value.result.ColumnCount * 300;
                        const fields = value.result.Fields.sort((a, b) => {
                            return a.OrderId - b.OrderId;
                        });
                        this.fields = fields;

                        if (value.result.AutoRefresh) {
                            this.refresh();
                        }
                        //设置表格事件
                        this.setEvents(value.result.GridScripts);
                        //设置表格动作
                        this.setActions(value.result.Actions);
                    }
                })
                .catch(reason => {
                    alert(reason.message);
                });

            this.$axios
                .post(`/models/${this.model}/query`)
                .then(value => {
                    if (value.success) {
                        this.modalWidth2 = value.result.ColumnCount * 300;
                    }
                })
                .catch(reason => {
                    alert(reason.message);
                });
        }
    },
    mounted: function() {
        this.getModel();
    },
    watch: {
        rowData(newVal, oldVal) {
            if (newVal === oldVal)
                return;
            this.refreshActionState(newVal);
        },
        multiSelect(newValue) {
            this.selectAll(newValue);
        }
    }
}