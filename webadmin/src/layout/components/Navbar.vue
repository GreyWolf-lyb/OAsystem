<!--
 * @Author: your name
 * @Date: 2020-08-13 15:56:49
 * @LastEditTime: 2020-08-26 10:05:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webadmin\src\layout\components\Navbar.vue
-->
<template>
  <div class="navbar">
    <div class="main">
      <div class="title">
        <h2>南宫市政务证明OA系统</h2>
      </div>
      <div class="mens">
        <span>线上办公，让办公更智能化</span>
      </div>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="right-heade-nav">
          <div class="avtor">
            <img src="../../assets/image/user.png" class="user-avatar" />
            <span class="na">{{name}}</span>
          </div>
          <div class="time-data">
            {{time}} | {{deptName}}
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="add">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <drawer ref="call" :drawer-dialog="mode" @Reload="initial"></drawer>
  </div>
</template>
<script>
import { resetPassword } from "@/api/user";
import { resetRouter } from "@/router";
import md5 from "js-md5";
import drawer from "@/components/dialog/dialog.vue";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { sessionStorageSet, sessionStorageGet } from "@/utils/storage";
export default {
  components: {
    drawer,
  },
  data() {
    return {
      collapse: false,
      name: sessionStorageGet("account"),
      deptName: sessionStorageGet("deptName"),
      time: this.timeDate(),
      mode: {
        type: "dialog",
        form: [
          {
            type: "input",
            label: "旧密码:",
            placeholder: "请输入旧密码",
            model: "oldPassword",
            state: ["detail", "new", "modify"],
            rules: [
              {
                required: true,
                message: "请输入旧密码",
                trigger: "blur",
              },
            ],
          },
          {
            type: "input",
            label: "新密码:",
            placeholder: "请输入6~15位新密码",
            model: "newPassword",
            state: ["detail", "new", "modify"],
            rules: [
              {
                required: true,
                message: "请输入新密码",
                trigger: "blur",
              },
              {
                pattern: /^[0-9A-Za-z]{6,15}$/, //正则
                message: "请输入6-15新密码",
              },
            ],
          },
        ],
        event: [
          {
            bind: "increase",
            method: (row) => {
              this.increase(row);
            },
          },
          {
            bind: "modify",
            method: (row) => {
              this.bindModify(row);
            },
          },
        ],
      },
    };
  },
  methods: {
    timeDate() {
      let da = new Date();
      let year = da.getFullYear() + "年";
      let month = da.getMonth() + 1 + "月";
      let date = da.getDate() + "日";
      return year + month + date;
    },
    async logout() {
      this.$confirm("是否退出登录?", "提示", {
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("user/logout");
          this.$router.push("/login");
        })
        .catch(() => {
          return false;
        });
    },
    async increase(row) {
      const data = {
        id: sessionStorageGet("id"),
        newPassword: md5(row.data.newPassword),
        oldPassword: md5(row.data.oldPassword),
      };
      try {
        let res = await resetPassword(data);
        if (res.data.code === 1) {
          this.$message.success(res.data.msg);
          this.$refs.call.closeDialog();
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (even) {
        this.$message.error(even.msg);
      }
    },
    add() {
      let that = this;
      that.$refs.call.popup("修改密码", "increase", "");
    },
  },
};
</script>
<style lang="scss" scope>
.right-menu /deep/ .el-dropdown-menu {
  top: 48px !important;
}
.navbar {
  height: 80px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background: #2281dc;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .main {
    display: inline-block;
  }
  .title {
    display: inline-block;
    padding-top: 15px;
    padding-left: 20px;
    color: #fff;
  }
  h2 {
    display: inline-block;
    margin: 0;
    padding: 0;
    line-height: 1;
  }
  .right-heade-nav {
    height: 80px;
    float: right;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 20px;
    box-sizing: border-box;
    cursor: pointer;
    .avtor {
      display: flex;
      align-items: center;
      padding-right: 20px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }
    }
    .time-data {
      line-height: 20px;
    }
  }
  .mens {
    width: 300px;
    padding-left: 25px;
    padding-top: 5px;
    color: #fff;
    font-size: 16px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>