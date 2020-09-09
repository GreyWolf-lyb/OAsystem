<template>
  <el-scrollbar class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      background-color="#15253a"
      :default-active="onRoutes"
      :collapse="collapse"
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.id">
                <template slot="title">
                  <span slot="title">{{ subItem.title }}</span>
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.id">
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.id">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import transmit from "../../../utils/transmit";
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  props: {
    message: Boolean,
  },
  // computed: {
  //   ...mapGetters(["sidebar"]),
  //   isCollapse() {
  //     return !this.sidebar.opened;
  //   },
  // },
  data() {
    return {
      collapse: false,
      items: [
        // {
        //   id: "1",
        //   icon: "iconfont icon-shouye",
        //   index: "/dashboard",
        //   title: "统计报表",
        // },
        // {
        //   id: "2",
        //   icon: "iconfont icon-17",
        //   index: "2",
        //   title: "办事申请管理",
        //   subs: [
        //     {
        //       id: "2-1",
        //       index: "/apply/primary",
        //       title: "办事申请初审",
        //     },
        //     {
        //       id: "2-2",
        //       title: "办事申请",
        //       index: "/apply/work",
        //     },
        //     {
        //       id: "2-3",
        //       title: "申请列表",
        //       index: "/apply/list",
        //     },
        //   ],
        // },
        // {
        //   id: "3",
        //   icon: "iconfont icon-wailian",
        //   index: "3",
        //   title: "反馈证明审批",
        //   subs: [
        //     {
        //       id: "3-1",
        //       index: "/feedback/feedback",
        //       title: "反馈证明管理",
        //     },
        //     {
        //       id: "3-2",
        //       title: "领导审批",
        //       index: "/feedback/leader",
        //     },
        //     {
        //       id: "3-3",
        //       title: "反馈证明记录",
        //       index: "/feedback/feedbackLu",
        //     },
        //   ],
        // },
        // {
        //   id: "4",
        //   icon: "iconfont icon-shuzhuangtu",
        //   index: "4",
        //   title: "办理事项管理",
        //   subs: [
        //     {
        //       id: "4-1",
        //       index: "/eventmanage/conductView",
        //       title: "办理事项管理",
        //     },
        //     {
        //       id: "4-2",
        //       index: "/eventmanage/feedbackView",
        //       title: "反馈证明模板",
        //     },
        //   ],
        // },
        // {
        //   id: "5",
        //   icon: "iconfont icon-biaoge",
        //   index: "5",
        //   title: "系统管理",
        //   subs: [
        //     {
        //       id: "5-1",
        //       index: "/system/frameworkView",
        //       title: "组织机构管理",
        //     },
        //     {
        //       id: "5-2",
        //       title: "电子签章管理",
        //       index: "/system/signatureView",
        //     },
        //     {
        //       id: "5-3",
        //       title: "人员分类",
        //       index: "/system/classificationView",
        //     },
        //     {
        //       id: "5-4",
        //       title: "人员管理",
        //       index: "/system/personnel",
        //     },
        //     {
        //       id: "5-5",
        //       title: "角色管理",
        //       index: "/system/role",
        //     },
        //     {
        //       id: "5-6",
        //       title: "日志管理",
        //       index: "/system/journal",
        //     },
        //   ],
        // },
      ],
    };
  },

  computed: {
    // onRoutes() {
    //   return this.$route.path;
    // },
  },
  created() {
    // transmit.$on("collapse", (msg) => {
    //   this.collapse = msg;
    // });
  },
  methods: {
    SetParameters (key) {
      const that = this
      if (key != null) {
        //  that.items.push(key)
        that.items = key
        console.log(that.items)
      }
    }
  }
};
</script>

<style scoped lang="scss">
// .el-menu-item.is-active {
//   background-color: #0c192bff !important;
// }
.sidebar {
  display: block;
  // position: absolute;
  // left: 0;
  // top: 60px;
  // bottom:0;
  overflow-y: hidden;
  z-index: 999;
  text-align: left;
  background: #15253a;
  width: 100%;
  // padding: 5px;

  ul {
    height: 100%;
    background: #15253a;
  }

  .Admin {
    font-size: 22px;
    margin-right: 10px;
  }
}
.el-submenu {
  color: rgb(191, 203, 217) !important;
  background: #15253a;
  .el-submenu__title {
    color: rgb(191, 203, 217) !important;
    background: #15253a;
  }
}
.is-opened {
  background: #001f28;
}
.el-submenu__title,
.el-submenu__title span {
  color: rgb(191, 203, 217) !important;
}
.sidebar-el-menu {
  background: #15253a;
  vertical-align: middle;
}
.sidebar-el-menu span {
  padding-left: 15px;
}
.sidebar-el-menu .iconfont {
  font-size: 20px;
  font-weight: bold;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background: #001f28;
}
.el-menu-item {
  color: rgb(191, 203, 217);
}
.el-scrollbar {
  height: calc(100% - 43px);
}

.el-scrollbar__wrap {
  overflow-x: hidden !important;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
