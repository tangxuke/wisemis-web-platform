<template>
  <el-menu-item :index="menu.path || uniqueid">
    <i :class="`fa fa-${menu.icon}`"></i>
    <span slot="title">{{menu.title}}</span>
  </el-menu-item>
</template>


<script>
import uniqueid from "lodash.uniqueid";
export default {
  name: "d2-layout-header-aside-menu-item",
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      uniqueid: uniqueid("d2-menu-empty-")
    };
  }
};
</script>