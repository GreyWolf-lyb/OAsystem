<template>
  <div class="login-container">
    <div class="center" v-show="isShow === 1">
      <div class="left">
      </div>
      <div class="right">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">南宫市证明政务OA系统</h3>
      </div>
      <el-form-item prop="username" class="item">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password" class="item">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="tips">
        <span @click.stop="isShow = 2" style="margin-right:5px;">忘记密码?</span>
        <span></span>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form> 
      </div>
    </div>
    <div class="center"  v-show="isShow === 2">
      <div class="left">
      </div>
      <div class="right">
        <el-form ref="passwdForm" :model="passwdForm" :rules="passwdRules" class="passwd-form" auto-complete="on" label-position="left">
            <div class="title-container">
              <h3 class="title">找回密码</h3>
            </div>
          <el-form-item prop="phone" 
          :label-width="this.formLabelWidth"
           class='InpitWidth' 
           label="手机号:">
            <el-input
              v-model="passwdForm.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
              tabindex="1"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="code"  
            :label-width="this.formLabelWidth"
            class='InpitWidth' 
            label="验证码:">
            <el-input style="width: 150px;"
              v-model="passwdForm.code"
              placeholder="请输入验证码"
              name="code"
              type="text"
              tabindex="1"
              autocomplete="off"
            />
          <el-button size="small" :disabled="disabled" type="primary" @click="send" style="margin-left: 15px;">{{sends}}</el-button>
          </el-form-item>
          <el-form-item prop="newPasswd" 
            :label-width="this.formLabelWidth"
            class='InpitWidth'  
            label="新密码:">
            <el-input
              ref="newPasswd"
              v-model="passwdForm.newPasswd"
              placeholder="请输入新密码"
              name="newPasswd"
             :type="passwordType"
              tabindex="1"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="oldPasswd"  style="margin-bottom: 15px;"
            :label-width="this.formLabelWidth"
            class='InpitWidth'  
            label="确认密码:">
            <el-input
              ref="newPasswd"
              v-model="passwdForm.oldPasswd"
              placeholder="请输入确认密码"
              name="oldPasswd"
              :type="passwordType"
              tabindex="1"
              autocomplete="off"
            />
             <span style="color:red">{{passwordCheckValidate.errorText}}</span>
          </el-form-item>
            <div class="tips" >
              <span @click.stop="isShow = 1" style="margin-right:5px;">立即登录</span>
              <span></span>
            </div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handl">确定</el-button>    
        </el-form>
      </div> 
    </div>  
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { SmsSend, forgetPassword } from '@/api/user'
import { getScrollPosition } from '@/utils/browser'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入超过6位数密码'))
      } else {
        callback()
      }
    }
    const validateOldPassword = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请输入确认密码'))
      } else if(this.passwdForm.oldPasswd !== this.passwdForm.newPasswd) {
        callback(new Error('新密码与确认密码输入不一致'))
      }else{
         callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwdForm:{
        code: '',
        phone: '',
        password: '',
        newPasswd: '',
        oldPasswd: ''
      },
      count: 60,
      timer: null,
      formLabelWidth: '90px',
      loginRules: {
        username: [{ required: true,  message: "请输入账号", trigger: 'blur'}],
        password: [{ required: true, message: "请输入密码", trigger: 'blur'},{
          pattern:  /^[0-9A-Za-z]{6,15}$/, //正则
          message: '请输入6-15新密码'
        }],
        
      },
      passwdRules: {
        code: [{ required: true,  message: "请输入验证码", trigger: 'blur'}],
        phone: [{ required: true, message: "请输入手机号", trigger: 'blur'}, {
            pattern:  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g,  //正则
            message: '请输入正确的手机号'
        }],
        newPasswd: [{ required: true, message: "请输入新密码", trigger: 'blur'},{
          pattern:  /^[0-9A-Za-z]{6,15}$/, //正则
          message: '请输入6-15新密码'
        }],
        oldPasswd: [{ required: true, trigger: 'blur', validator: validateOldPassword}],
      },
      passwordCheckValidate:{
        errorText: ''
      },
      sends: '获取验证码',
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      isShow: 1,
      disabled: false,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handl() {
      this.$refs.passwdForm.validate(valid => {
        if (valid) {
          this.updateP()
        } else {
          return false
        }
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((data) => {
            if (data.code === 1) {
              if(data.data.route !== ''){
                this.$router.push({ path: data.data.route})
              }
            } else {
               this.$message.error(data.msg);
            } 
            // this.loading = false
          }).catch((data) => {
            // this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async send() {
      let that = this
      if(that.passwdForm.phone === ''){
        return  that.$message.warning('请先输入手机号');
      }
      if(that.timer === null) {
        that.disabled = true
        that.sends = that.count + "秒后获取验证码";
        that.timer = setInterval(function(){
        that.count--;
        that.sends = that.count + "秒后获取验证码";
          if(that.count <= 0 ){
            clearInterval(that.timer);
            that.sends = "获取验证码";
            that.timer = null;
            that.disabled = false;
          }
        },1000);
      }
      let data = {
        phone: this.passwdForm.phone,
      }
      const res = await SmsSend(data)
      if (data.code === 1) {
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
      }
    },
    async updateP () {
      let data = {
        phone: this.passwdForm.phone,
        password: this.passwdForm.oldPasswd,
        code: this.passwdForm.code,
      }
      const res = await forgetPassword(data)
      if (res.data.code === 1) {
          this.$message.success(res.data.msg);
          this.isShow = 1
        } else {
          this.$message.error(res.data.msg);
      } 
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 35px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 2px 5px 2px 15px;
      color: $light_gray;
      height: 35px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  
  .center{
    width: 45%; 
    height: 60%;
    min-width: 600px;
    min-width: 720px;
    margin: 0 auto;  
    position: absolute;  
    top: 50%; left: 50%;  
    -webkit-transform: translate(-50%,-50%);  
    -ms-transform: translate(-50%,-50%);  
    transform: translate(-50%,-50%);
    .left{
      width: 25%;
      height: 100%;
      float: left;
      background: url('../../assets/image/left.png');
      background-size: 100% 100%;
       min-height: 430px;
    }
    .right{
      float: right;
      width: 75%;
      height: 100%;
      background: #fff;
      min-height: 430px;
    }
  }
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:rgb(255, 255, 255);
.el-button--primary{
  // background: rgb(83, 190, 119);
  border: none;
}
 .InpitWidth {
    width: 80%;
    min-width: 402px;
  }
.item{
  height: 44px;
  line-height: 44px;
}
 /deep/ .el-form-item__content{
    line-height: 35px;
  }
.login-container {
  height: 100%;
  min-height: 550px;
  width: 100%;
  // background-color: $bg;
  // background: #005C97;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: url('../../assets/image/bank.png');
  overflow: hidden;
 
  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 70px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .el-form-item {
      border: 1px solid rgb(192, 189, 189);
      background:#fff;
      border-radius: 5px;
      color: #000;
    }
  }
  .passwd-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 10px 30px 0;
    margin: 0 auto;
    overflow: hidden;
    .el-form-item {
      background:#fff;
      border-radius: 5px;
      color: #000;
    }
    /deep/ .el-input__inner{
      border: 1px solid rgb(192, 189, 189);
      background-color: #FFF;
      background-image: none;
      border-radius: 4px;
      line-height: 40px;
      height: 40px;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      padding: 0 15px;

    }
  /deep/ .el-form-item__label{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }  
     
  }
  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    span {
      &:first-of-type {
        margin-right: 1px;
        float: right;
      }
    }
   :hover{
     color: blue;
   }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 32px;
      color: #646bbf;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: 548;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
