<template>
    <d2-container>
        <Row>
            <Col :span="8">
				<Row>
					<Button type="primary" @click="refreshDom">Preview</Button>

					<Tree :data="treeData" :render="renderContent"></Tree>
				</Row>
            	<Row>
					<Input type="textarea" :value="code" autosize/>
				</Row>
			</Col>
			<Col :span="16" style="padding:10px;">
				<div id="demo" style="border:#c0c0c0 1px solid;min-height:100px;">
				</div>
			</Col>
        </Row>
    </d2-container>
</template>

<script>
import Vue from "vue";
import JsonFormat from "json-format";

export default {
  data() {
    return {
      data1: [{
        title: 'div',
        expand: true,
        render: (h, { root, node, data }) => {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%"
              }
            },
            [
              h("span", [
                h("Icon", {
                  props: {
                    type: "ios-folder-outline",size:32
                  },
                  style: {
                    marginRight: "8px"
                  }
                }),
                h("span", data.title)
              ]),
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    float: "right",
                    marginRight: "32px"
                  }
                },
                [
                  h("Button", {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "ios-add",
                      type: "primary"
                    }),
                    style: {
                      width: "64px"
                    },
                    on: {
                      click: () => {
                        this.append(data);
                      }
                    }
                  })
                ]
              )
            ]
          );
        }
      }],
      nodes: [],
      root: {
        tag: "div",
        children: "test"
      }
    };
  },
  computed: {
    code() {
      return JsonFormat(this.treeData);
    },
    treeData() {
      var data = [];
      var rootNode = this.mapTreeNode(this.root);
      data.push(rootNode);
      return data;
    }
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
				type: "ios-paper-outline",
				size:24
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(data) {
		this.$dialogs.OpenTextDialog('添加节点',
`{
	"tag":"Input",
	"data":null
}`)
		.then(value=>{
			var node=JSON.parse(value);
			node.title=node.tag,
			node.expand=true;
			const children = data.children || [];
			children.push(node);
			this.$set(data, "children", children);
		})
      
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    mapTreeNode(node) {
      var _this = this;
      var target = {
        title: node.tag,
        expand: true
      };
      if (Array.isArray(node.children)) {
        var nodes = Array.from(node.children).map(item => {
          return _this.mapTreeNode(item);
        });
        target.children = nodes;
      }
      return target;
    },
    /**
     * 刷新效果
     */
    refreshDom() {
      var _this = this;
      var node = this.root;
      var instance = new Vue({
        render(h) {
          return _this.createMyElement(h, node);
        }
      });
      var component = instance.$mount();
      document.getElementById("demo").innerHTML = "";
      document.getElementById("demo").appendChild(component.$el);
    },
    /**
     * 渲染函数
     * @param {Function} h 渲染函数
     * @param {{tag:string,data:object,children:{tag,props,children}[]}} e 需渲染的数据对象
     */
    createMyElement(h, e) {
      var _this = this;
      if (Array.isArray(e.children)) {
        var childVNodes = Array.from(e.children).map(item => {
          if (typeof item === "string") return item;
          else {
            return _this.createMyElement(h, item);
          }
        });
        return h(e.tag, e.data, childVNodes);
      }
      return h(e.tag, e.data, e.children);
    }
  },
  mounted() {
    this.refreshDom();
  },
  watch: {
    root(newVal) {
      this.refreshDom();
    }
  }
};
</script>
