<!--
 * @Author: your name
 * @Date: 2020-08-12 16:07:56
 * @LastEditTime: 2020-08-21 13:24:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <div class="breadcrumb-icon">
      <i :class="`iconfont ${Icon}`"></i>
      <Breadcrumb></Breadcrumb>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { Icon } from "element-ui";
export default {
  name: "AppMain",
  components: {
    Breadcrumb,
  },
  data() {
    Icon: "icon-shouye";
    return {}
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.Icon = to.meta.icon;
      },
    },
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 0px);
  width: 100%;
  position: relative;
  /* overflow: hidden; */
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.breadcrumb-icon {
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
