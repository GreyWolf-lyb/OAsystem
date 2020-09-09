<!--
 * @Author: your name
 * @Date: 2020-08-13 17:06:11
 * @LastEditTime: 2020-08-26 10:55:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\layout\components\Sidebar\index.vue
-->

<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>-->
    <SidebarItem ref="ChildTree"></SidebarItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./navMenu";
import { PermissionFindAll } from '@/api/user'
import { sessionStorageGet } from '@/utils/storage'
// import SidebarItem from './SidebarItem'
import variables from "@/styles/variables.scss";

export default {
  components: { 
    SidebarItem, 
    Logo 
  },
  computed: {
    // ...mapGetters([
    //   'sidebar'
    // ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    // activeMenu() {
    //   const route = this.$route
    //   const { meta, path } = route
    //   // if set path, the sidebar will highlight the path you set
    //   if (meta.activeMenu) {
    //     return meta.activeMenu
    //   }
    //   return path
    // },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    // variables() {
    //   return variables
    // },
    // isCollapse() {
    //   return !this.sidebar.opened
    // }
  },
  mounted () {
    this.getMenuData()
  },
  methods: {
    async getMenuData () {
      let that = this
      let menu = []
      let parameters = { userId: sessionStorageGet('id') }
      const response = await PermissionFindAll(parameters)
      let Data = response.data.data
      if (response.data.code === 1) {
        Data.map(function(v, k){
          let sub = []
          v.childs.map(function(v1,k1){
            sub.push({id:v1.entity.id, index: v1.entity.route,title: v1.entity.name})
          })
          if(k === 0 && sub.length === 0){
             menu.push({id:v.entity.id,icon:v.entity.icon, index: v.entity.route,title: v.entity.name})
          }else{
            menu.push({id:v.entity.id,icon:v.entity.icon, index: v.entity.route,title: v.entity.name,subs:sub})
          }
          
        })
        that.$refs.ChildTree.SetParameters(menu)
      }
    }
  },
};
</script>
