import Vue from "vue";
import JsonFormat from "json-format";

export default {
  data() {
    return {
      data1: [{
        title: 'div',
        expand: true,
        tag:'div'
      }],
      code:''
    };
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
`
{
	"tag":"Input",
    "data":null,
    "text":null
}
`)
		.then(value=>{
			var node=JSON.parse(value);
			node.title=node.tag || "text:"+node.text,
			node.expand=true;
			const children = data.children || [];
			children.push(node);
            this.$set(data, "children", children);
            console.log(this.root);
            this.refreshDom();
		})
      
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
      this.refreshDom();
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
      var node = this.data1[0];
      var instance = new Vue({
        render(h) {
            var fn=new Function("h",_this.code);
            return fn(h);
        }
      });
      var component = instance.$mount();
      document.getElementById("demo").innerHTML = "";
      document.getElementById("demo").appendChild(component.$el);
    },
    /**
     * 渲染函数
     * @param {Function} h 渲染函数
     * @param {{tag:string,data:object,text:string,children:{tag,props,children}[]}} e 需渲染的数据对象
     */
    createMyElement(h, e) {
      var _this = this;
      if (Array.isArray(e.children)) {
        var childVNodes = Array.from(e.children).map(item => {
            if(!item.tag)
                return item.text;
            return _this.createMyElement(h, item);
        });
        return h(e.tag, e.data, childVNodes);
      }
      if(e.text){
          var a=[e.text];
          if(Array.isArray(e.children)){
              a.push(e.children);
          }
            return h(e.tag, e.data,a);
      }else{
            return h(e.tag, e.data, e.children);
      }
    }
  }
};