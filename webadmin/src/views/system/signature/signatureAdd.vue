<template>
  <el-drawer
    :title="title"
    direction="rtl"
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    :before-close="CloseModal"
    custom-class="demo-drawer"
    size="45%"
    :wrapperClosable="false"
    ref="drawer"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="行政区划：" :required="true">
        <el-select size="medium" disabled v-model="ruleForm.province">
          <el-option label="河北省" value="河北省"></el-option>
        </el-select>

        <el-select
          size="medium"
          disabled
          v-model="ruleForm.city"
          style="margin-left: 10px;"
          placeholder="邢台市"
        >
          <el-option label="邢台市" value="邢台市"></el-option>
        </el-select>

        <el-select size="medium" disabled v-model="ruleForm.area" placeholder="南宫市">
          <el-option label="南宫市" value="南宫市"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织机构：" prop="deptId">
        <el-select disabled clearable size="medium" v-model="ruleForm.deptId" placeholder="请选择行政审批">
          <el-option v-for="item in deptList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签章名称：" prop="name">
        <el-input
          clearable
          size="medium"
          v-model="ruleForm.name"
          placeholder="请输入签章名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否需要审批：" prop="isApproval">
        <el-select clearable size="medium" v-model="ruleForm.isApproval" placeholder="请选择是否需要审批">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>

      <!--  -->
      <el-form-item label="角色：" prop="roleId" :required="isHaveTo" v-show="ruleForm.isApproval==1">
        <el-select
          clearable
          size="medium"
          v-model="ruleForm.roleId"
          placeholder="请选择角色"
          @change="roleChange"
        >
          <el-option v-for="item in roleList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人：" prop="userId" :required="isHaveTo" v-show="ruleForm.isApproval==1">
        <el-select clearable size="medium" v-model="ruleForm.userId" placeholder="请选择审批人">
          <el-option v-for="item in userList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!--  -->

      <el-form-item label="签章照片：" prop="url">
        <el-input style="display:none;" v-model="ruleForm.url"></el-input>
        <el-image
          v-if="ruleForm.url"
          style="width: 100px; height: 100px"
          :src="img"
          :preview-src-list="[img]"
        ></el-image>
        <div>
          <el-button type="primary" size="medium" v-if="ruleForm.url" @click="deleteImg">删除</el-button>
        </div>
        <div style="position: relative;">
          <el-upload
            class="upload-demo"
            accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .PBG, .GIF, .BMP"
            :action="fileUrl"
            :headers="header"
            :show-file-list="false"
            :before-upload="handleContentChange"
            :on-success="handleAvatarSuccess"
          >
            <el-button size="medium" type="primary">上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >注：签章照片只能上传一张PNG格式的照片，文件大小≤2MB，长、宽均为166像素且背景透明的图片，必须保证照片清洗切除盖章外无其他内容</div>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer drawer_footer">
      <el-button size="medium" @click="CloseModal">取 消</el-button>
      <el-button size="medium" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>
import {
  insert,
  update,
  findById,
  findAllRoleList,
  findAllUserList,
} from "@/api/signature";
import { getToken } from "@/utils/auth";
import { findAllList, findAllListUser } from "@/api/framework";
import { sessionStorageGet } from "@/utils/storage";

export default {
  props: {
    title: {
      type: String,
      default: () => {},
    },
  },

  data() {
    let validateName = (rule, value, callback) => {
      console.log(rule);
      if (!value && this.isHaveTo) {
        callback(new Error(rule.msg));
      } else {
        callback();
      }
    };
    return {
      deptList: [],
      roleList: [],
      userList: [],
      ruleForm: {
        name: "",
        deptId: "",
        url: "",
        province: '',
        city: '',
        area: '',
        isApproval: "",
        roleId: "",
        userId: "",
      },
      rules: {
        deptId: [
          {
            required: true,
            message: "请选择组织机构",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入签章名称",
            trigger: ["blur", "change"],
          },
        ],
        url: [
          {
            required: true,
            message: "请上传签章照片",
            trigger: ["blur", "change"],
          },
        ],
        isApproval: [
          {
            required: true,
            message: "请选择是否需要审批",
            trigger: ["blur", "change"],
          },
        ],
        roleId: [
          {
            msg: "请选择角色",
            validator: validateName,
            trigger: ["blur", "change"], // message: '请选择方法'
          },
        ],
        userId: [
          {
            msg: "请选择审批人",
            validator: validateName,
            trigger: ["blur", "change"], // message: '请选择方法'
          },
        ],
      },
      dialogFormVisible: false,
      loading: false,
      fileUrl:
        process.env.VUE_APP_BASE_API + "/webadmin/system/signature/uploadFile",
      header: {
        Authorization: "token " + getToken(),
      },
    };
  },
  computed: {
    isHaveTo() {
      return this.ruleForm.isApproval == 1;
    },
  },
  methods: {
    handleContentChange(file) {
      let that = this;
      let FileSize = file.size / 1024 / 1024 < 500;
      if (!FileSize) {
        that.$message.error("上传超出文件限制大小");
        return false;
      }
      this.isSubmitLoading = true;
    },
    handleAvatarSuccess(response, file, fileList) {
      let that = this;
      if (response.fileName) {
        let fileDownloadUri = response.fileDownloadUri;
        let fileName = response.fileName;
        this.img = fileDownloadUri;
        this.ruleForm.url = fileName;
        this.$message.success("上传成功");
        return false;
      }
    },
    deleteImg() {
      this.img = "";
      this.ruleForm.url = "";
    },
    initial(value) {
      const that = this;
      that.dialogFormVisible = true;
      that.userData = JSON.parse(sessionStorageGet("userData"));
      that.ruleForm.province = that.userData.province,
      that.ruleForm.city = that.userData.city,
      that.ruleForm.area = that.userData.area,
      this.deptList = [];
      this.roleList = [];
      this.userList = [];
      this.getDeptList();
      this.getRoleList();
      // 联动第二个下拉框初始化表单时不需要调用该方法
      // this.getUserList();
      if (value) {
        that.id = value;
        that.detail();
      }
    },
    async getDeptList() {
      let data = {
        province: "河北省",
        city: "邢台市",
        area: "南宫市",
        status: "1",
      };
      const res = await findAllList(data);
      res.data.data.forEach((item) => {
        this.deptList.push({
          id: item.id,
          name: item.name,
        });
        // if (this.id) {
        this.ruleForm.deptId = this.userData.deptId;
        // console.log(this.userData.deptId);
        // }
      });
    },

    // 角色
    async getRoleList() {
      let data = {
        page: "1",
        size: "10000",
      };
      const res = await findAllRoleList(data);
      res.data.data.forEach((item) => {
        this.roleList.push({
          id: item.id,
          name: item.name,
        });
      });
    },

    // 角色审批人联动
    roleChange() {
      this.ruleForm.userId = "";
      this.userList = [];
      if (this.ruleForm.roleId) {
        this.getUserList();
      }
    },

    // 审批人
    async getUserList() {
      let data = {
        // 联动取值 然后把data传给后台
        roleId: this.ruleForm.roleId,
      };
      const res = await findAllUserList(data);
      res.data.data.forEach((item) => {
        this.userList.push({
          id: item.id,
          name: item.name,
        });
      });
    },

    // 详情
    async detail() {
      const res = await findById({ id: this.id });
      this.ruleForm = res.data.data;
      this.img = process.env.VUE_APP_FILE_API + res.data.data.url;
      this.getUserList();
    },

    // 初始化表单
    CloseModal() {
      const that = this;
      that.$refs["ruleForm"].resetFields();
      that.id = "";
      that.img = "";
      that.ruleForm = {
        name: "",
        deptId: "",
        url: "",
        province: "河北省",
        city: "邢台市",
        area: "南宫市",
        isApproval: "",
        roleId: "",
        userId: "",
      };
      that.dialogFormVisible = false;
    },
    submitForm(ruleForm) {
      const that = this;
      that.$refs[ruleForm].validate(async (index) => {
        if (index === false) {
          return false;
        }
        that.loading = true;
        // 取值
        let data = {
          name: this.ruleForm.name,
          url: this.ruleForm.url,
          deptId: this.ruleForm.deptId,
          province: this.ruleForm.province,
          city: this.ruleForm.city,
          area: this.ruleForm.area,
          isApproval: this.ruleForm.isApproval,
          roleId: this.ruleForm.roleId,
          userId: this.ruleForm.userId,
        };

        let response = null;
        if (that.id) {
          data.id = that.id;
          // 编辑
          response = await update(data);
        } else {
          // 新增
          response = await insert(data);
        }
        that.loading = false;
        // success：成功处理
        if (response.data.code === 1) {
          that.$message.success(response.data.msg);
          // 刷新表格
          that.$emit("getList");
          that.CloseModal();
          return false;
        }
        // error：失败处理
        this.$message.error(response.data.msg);
      });
    },
  },
};
</script>

<style lang="scss">
.upload-img {
  width: 60px !important;
  height: 60px !important;
  border: 1px solid #333;
  margin-right: 20px;
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
  .avatar-border-red .el-upload {
    border: 1px dashed #f56c6c !important;
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
  border: 1px solid #e4e7ed;
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
.a {
  width: 6vw !important;
}
.drawer_footer {
  text-align: center;
}
:focus {
  outline: 0;
}
.el-drawer__open .el-drawer.rtl {
  overflow: scroll;
}
</style>

