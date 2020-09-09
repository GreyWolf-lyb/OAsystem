<template>
  <el-drawer
    :title="modalObjj"
    direction="rtl"
    v-loading="loading"
    :visible.sync= "dialogFormVisible"
    :before-close="ClearTextConeten"
    custom-class="demo-drawer"
    size='45%'
    :wrapperClosable='false'
    ref="drawer">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  v-loading='loading'>
      <el-form-item
        prop="name"
        label="姓名"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-input clearable :disabled='ProhibitFromm' autocomplete="off" v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item
        prop="account"
        label="账号"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-input clearable :disabled='ProhibitFromm' autocomplete="off" v-model="ruleForm.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item
        prop="phone"
        label="手机号"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-input clearable :disabled='ProhibitFromm' autocomplete="off" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
       <el-form-item
        prop="town"
        label="行政区划"
        :label-width="this.formLabelWidth"
        class='InpitWidth small'>
        <el-select v-model="ruleForm.province" disabled placeholder="请输入省">
          <el-option
            key="1"
            label="河北省"
            value="河北省">
          </el-option>
        </el-select>
        <el-select v-model="ruleForm.city" disabled placeholder="请输入市">
          <el-option
            key="2"
            label="邢台市"
            value="邢台市">
          </el-option>
        </el-select>
        <el-select v-model="ruleForm.area" disabled placeholder="请输入区">
          <el-option
            key="3"
            label="南宫"
            value="南宫">
          </el-option>
        </el-select>
        <el-select v-model="ruleForm.town" placeholder="请选择乡镇">
            <el-option
              key="1"
              label="苏村镇"
              value="sucun">
            </el-option>
            <el-option
              key="2"
              label="高村镇"
              value="sucun">
            </el-option>
            <el-option
              key="3"
              label="垂杨镇"
              value="sucun">
            </el-option>
            <el-option
              key="4"
              label="明化镇"
              value="sucun">
            </el-option>
            <el-option
              key="5"
              label="段芦头镇"
              value="sucun">
            </el-option>
            <el-option
              key="6"
              label="紫冢镇"
              value="sucun">
            </el-option>
            <el-option
              key="7"
              label="大村乡"
              value="sucun">
            </el-option>
            <el-option
              key="8"
              label="南便乡"
              value="sucun">
            </el-option>
            <el-option
              key="8"
              label="大屯乡"
              value="sucun">
            </el-option>
            <el-option
              key="8"
              label="薛吴村乡"
              value="sucun">
            </el-option>
            <el-option
              key="8"
              label="王道寨乡"
              value="sucun">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item
        prop="deptId"
        label="组织机构:"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-select v-model="ruleForm.deptId" clearable  :disabled='ProhibitFromm' @change="selectGett" placeholder="请选择组织机构">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="roleId"
        label="角色:"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-select v-model="ruleForm.roleId" clearable  :disabled='ProhibitFromm' @change="selectGet" placeholder="请选择角色">
          <el-option
            v-for="item in userOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="人员分类:"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-select v-model="ruleForm.userTypeId" clearable  :disabled='ProhibitFromm' @change="selectGettt" placeholder="请选择人员分类">
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="性别:"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-select v-model="ruleForm.sex" clearable  :disabled='ProhibitFromm' placeholder="请选择角色">
           <el-option
              key="1"
              label="男"
              value="1">
            </el-option>
            <el-option
              key="0"
              label="女"
              value="0">
            </el-option>
        </el-select>
      </el-form-item>
       <el-form-item
        prop="duty"
        label="职务"
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-input clearable :disabled='ProhibitFromm' autocomplete="off" v-model="ruleForm.duty" placeholder="请输入职务"></el-input>
      </el-form-item>
      <el-form-item
        label="备注:"  
        :label-width="this.formLabelWidth"
        class='InpitWidth'>
        <el-input type="textarea" clearable :disabled='ProhibitFrom' autocomplete="off" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer drawer_footer">
      <el-button @click="CloseModal">取 消</el-button>
      <el-button v-if='!ProhibitFrom' type="primary" @click="SuretoAddClick('ruleForm')">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>

import { userUpdate, roleList, userInsert, userFindById, getSystem, getUserType} from '@/api/user'
import { roleFindAll } from '@/api/role'
import { isMPStrict } from '@/utils/validate'
import { getToken } from '@/utils/auth'
export default {
  components: {
    // 注册组件
    // editor: editor
  },

  props: {
    modalObjj: {
      type: String,
      default: () => {}
    }
  },

  data () {
    return {
      ruleForm: {
        name: '',
        account: '',   
        phone: '',
        sex: '',
        deptName: '',
        province: '河北省',
        city: '邢台市',
        area: '南宫市',
        town: '',
        duty: '',
        userTypeName: '',
        remark: '',
        roleName: '',
        roleId: '',
        userTypeId: '',
        deptId: ''
      },
      fileList: [],
      obj: {},
      objPeople: {},
      objUser: {},
      rule: {},
      options: [],
      peopleOptions: [],
      userOptions: [],
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: ['change', 'blur']
        }],
        account: [{
          required: true,
          message: '请输入账号',
          trigger: ['change', 'blur']
        }],
        phone: [{
          required: true,
          message: '请输入输手机号码',
          trigger: ['change', 'blur']
        },
        {
            pattern:  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g,  //正则
            message: '请输入正确的手机号'
        }],
        town: [{
          required: true,
          message: '请输入行政区划',
          trigger: ['change', 'blur']
        }],
        deptId: [{
          required: true,
          message: '请选择组织机构',
          trigger: ['change', 'blur']
        }],
        roleId: [{
          required: true,
          message: '请选择角色',
          trigger: ['change', 'blur']
        }]
      },
      // 是否触发禁用表单项
      ProhibitFrom: false,
      ProhibitFromm: false,
      dialogFormVisible: this.show,
      formLabelWidth: '120px',
      lock: false,
      // Http: 'http://apptest.liangxin.net.cn/',
      dialogVisible: true,
      loading: false,
     
    }
  },
  watch: {
    show () { this.dialogFormVisible = this.show }
  },
  created() {
    this.findRoles()
    this.findOragins()
    this.findPeoples()
  },
  methods: {
    /**
     * @param value 当前需要操作的数据集
     * @param state 根据不同状态 展示不同操作
     */
    initial: function (value) {
      const that = this
      // that.namee = '名称:'
      // that.ruleForm.type = name
      // that.action = process.env.VUE_APP_BASE_API  + '/webadmin/service/file/uploadRegulationKnowledgeFile?type=' + name + ''
      // that.rules.name  =  [{
      //   required: true,
      //   message: '请输入名称',
      //   trigger: 'blur'
      // }],
      that.dialogFormVisible = true
      if (value) {
        that.nowId = value
        that.initFormDetail(value)
      } else {
        // let year = new Date().getYear()
        that.ProhibitFrom = false
      }
    },

    selectGet(vId){
      const that = this 
      that.obj = this.userOptions.find((item)=>{//this.ruleForm
        return item.value === vId;//筛选出匹配数据
      });
    },

    selectGett(vId){
      const that = this 
      that.objj = this.peopleOptions.find((item)=>{//this.ruleForm
        return item.value === vId;//筛选出匹配数据
      });
    },    

    selectGettt(vId){
      const that = this 
      that.objj = this.peopleOptions.find((item)=>{//this.ruleForm
        return item.value === vId;//筛选出匹配数据
      });
    }, 
    /**
     * 初始化获取当前需要编辑 查看的详细数据
     * @param value 当前需要操作的唯一iD
     */
    async initFormDetail (value) {
      const that = this
      try {
        let parameter = {id: value}
        that.loading = true
        const response = await userFindById(parameter)
        that.loading = false
        that.ruleForm = response.data.data
        if (this.modalObjj === '详情') {
          that.ProhibitFrom = true
          // 禁用编辑器
        } else if (this.modalObjj === '编辑') {
          if(value === 'admin'){
            that.ProhibitFrom = false
            that.ProhibitFromm = true
          } else {
            that.ProhibitFrom = false
            that.ProhibitFromm = false
          }
          that.lock = true
        }  else {
          that.lock = false
          that.ProhibitFrom = false
          that.ProhibitFromm = false
        }
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },

    // 关闭模态框 清空所有表单项 为编辑器初始化
    CloseModal () {
      const that = this
      that.ClearTextConeten()
      that.ProhibitFrom = false
      // if (!that.rules.name) {
      //   that.rules = that.rule
      // }
    },

    // 初始化表单
    ClearTextConeten () {
      const that = this
      that.$refs['ruleForm'].resetFields()
      that.ruleForm.name = ''
      that.ruleForm.account = ''
      that.ruleForm.phone = ''
      that.ruleForm.sex = ''
      that.ruleForm.deptName = ''
      that.province = '河北省'
      that.city = '邢台市'
      that.area = '南宫市'
      that.town = ''
      that.duty = ''
      that.userTypeName = ''
      that.remark = ''
      that.roleName = ''
      that.roleId = ''
      that.userTypeId = ''
      that.deptId = ''
      that.ProhibitFromm = false
      that.ProhibitFrom = false
      that.dialogFormVisible = false
      if (that.ruleForm.id) {
        delete that.ruleForm.id
      }
    },

    SuretoAddClick (ruleForm) {
      const that = this
      that.$refs[ruleForm].validate((index) => {
        if (index === false) {
          return false
        }
        Object.entries(that.ruleForm).map((a, b) => {
          if (a[0] === 'id') {
            delete that.ruleForm[a[0]]
          }
        })
        if (this.modalObjj === '添加') {
          that.add(that.ruleForm)
          return false
        } else if (this.modalObjj === '编辑') {
          that.ruleForm.id = that.nowId
          that.edit(that.ruleForm)
          return false
        }
      })
    },
    selectGet(vId){
      const that = this 
      that.objUser = this.userOptions.find((item)=>{//this.ruleForm
        return item.value === vId;//筛选出匹配数据
      });
    },
    selectGett(vId){
      const that = this 
      that.obj = this.options.find((item)=>{//this.ruleForm
        return item.value === vId;//筛选出匹配数据
      });
    },
    selectGettt(vId){
      const that = this 
      that.objPeople = this.peopleOptions.find((item)=>{//this.ruleForm
        return item.value === vId;//筛选出匹配数据
      });
    },
    async findRoles(data) {
      const that = this
      that.loading = true
      const response = await roleList()
      that.loading = false
      if (response.data.code === 1) {
        that.userOptions = []
        response.data.data.content.map(function(v, k){
          that.userOptions.push({value: v.id, label:v.name})
        })
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },
    async findOragins(data) {
      const that = this
      that.loading = true
      const response = await getSystem()
      that.loading = false
      if (response.data.code === 1) {
        that.options = []
        response.data.data.content.map(function(v, k){
          that.options.push({value: v.id, label:v.name})
        })
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },
    async findPeoples(data) {
      const that = this
      that.loading = true
      const response = await getUserType()
      that.loading = false
      if (response.data.code === 1) {
        that.peopleOptions = []
        response.data.data.content.map(function(v, k){
          that.peopleOptions.push({value: v.id, label:v.name})
        })
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },
    // 添加方法
    async add(data) {
      const that = this
      // POST请求添加轮播图数据
      let da = data
      if(that.obj.label !== null && typeof (that.obj.label) !== 'undefined' && that.obj.label !== undefined &&  that.obj.label !== '' && that.obj.label !== 'null'){
          da.roleName = that.objUser.label
          da.deptName = that.obj.label
          da.userTypeName = that.objPeople.label
      }
      that.loading = true
      const response = await userInsert(da)
      that.loading = false
      if (response.data.code === 1) {
        // 添加成功后 回调效果
        that.$message.success(response.data.msg)
        /**
         * 清空表单元素 重置验证信息.
         * @param imageUrl
         * @param detail
         */
        that.ClearTextConeten()
        // 重新触发父组件加载loading
        that.$emit('Reload')
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },
 
    // 修改方法
    async edit(data) {
      const that = this
      // PUT 请求修改数据
      that.loading = true
      let da = data
      if(that.obj.label !== null && typeof (that.obj.label) !== 'undefined' && that.obj.label !== undefined &&  that.obj.label !== '' && that.obj.label !== 'null'){
          da.roleName = that.objUser.label
          da.deptName = that.obj.label
          da.userTypeName = that.objPeople.label
      }
      const response = await userUpdate(da)
      that.loading = false
      if (response.data.code === 1) {
        // 添加成功后 回调效果
        that.$message.success(response.data.msg)
        /**
         * 清空表单元素 重置验证信息.
         * @param imageUrl
         * @param detail
         */
        that.ClearTextConeten()
        // 重新触发父组件加载loading
        that.$emit('Reload')
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
   :focus{
        outline:0;
    }
</style>
<style lang="scss" scoped>
.small /deep/ .el-select{
   width: 90px;
   margin-left: 10px;
 }
.el-drawer {
  .el-drawer {
    .el-drawer__body {
      padding: 10px 20px !important;
    }
  }
  .InpitWidth {
    width: 80%;
    min-width: 302px;
  }
  .avatar-border-red .el-upload{
    border:1px dashed #f56c6c !important;
    border-radius: 6px;
    cursor: pointer;
    float: left;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #b6b5b5;
    }
    .el-progress {
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      .el-progress-circle {
        margin: 13% auto 10%;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    float: left;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #b6b5b5;
    }
    .el-progress {
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      .el-progress-circle {
        margin: 13% auto 10%;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
  }
  .avatar {
    width: 200px;
    height: 180px;
    display: block;
  }
}

.edit_main {
  text-align: left;
  padding: 10px 15px;
  border-radius: 5px;
  min-height: 250px;
  background-color: #f5f7fa;
  border:1px solid #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  img {
    width: auto;
    height: auto;
  }
}

.ClassDisable .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  float: left;
  position: relative;
  overflow: hidden;
  cursor: no-drop;
  &:hover {
    border-color: #b6b5b5;
  }
  .el-progress {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    .el-progress-circle {
      margin: 13% auto 10%;
    }
  }
}

.buttonentry {
  float: left;
  text-align: left;
}
.a{
  width: 6vw!important;
}
.drawer_footer{
  text-align: center;
}
:focus {
  outline:0!important;
}

/deep/ .el-drawer__open .el-drawer.rtl{
  overflow: scroll;
}
</style>
