<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
