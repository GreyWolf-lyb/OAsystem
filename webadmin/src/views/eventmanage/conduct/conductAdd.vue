<template>
  <el-drawer
    :title="title"
    direction="rtl"
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    :before-close="resetForm"
    custom-class="demo-drawer"
    size="45%"
    :wrapperClosable="false"
    ref="drawer"
    class="specialStyle"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="办理事项名称：" prop="name">
        <el-input
          clearable
          size="medium"
          :disabled="disabled"
          placeholder="请输入办理事项名称"
          v-model="ruleForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" v-if="id">
        <el-input clearable size="medium" disabled v-model="ruleForm.createTime"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          :disabled="disabled"
          size="medium"
          style="width: 65% !important;"
          type="textarea"
          :rows="2"
          placeholder="请输入备注"
          v-model="ruleForm.remark"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer drawer_footer">
      <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
      <el-button size="medium" type="primary" v-if="!disabled" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { insert, update, findById } from "@/api/conduct";

export default {
  props: {
    title: {
      type: String,
      default: () => {},
    },
  },

  data() {
    return {
      id: "",
      type: "",
      disabled: false,
      ruleForm: {
        name: "",
        remark: "",
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          {
            required: true,
            message: "请输入办理事项名称",
            trigger: "change",
          },
        ],
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      loading: false,
    };
  },
  watch: {
    title(val) {
      if (val === "详情") {
        this.rules.name[0].required = false;
      } else {
        this.rules.name[0].required = true;
      }
    },
  },
  methods: {
    initial(value, type) {
      this.dialogFormVisible = true;
      if (type === 2) {
        this.disabled = true;
      }
      if (value) {
        this.id = value;
        this.detail();
      }
    },
    // 详情
    async detail() {
      const res = await findById({ id: this.id });
      this.ruleForm = res.data.data;
    },
    resetForm(ruleForm) {
      this.$refs["ruleForm"].resetFields();
      this.CloseModal();
    },
    // 初始化表单
    CloseModal() {
      this.disabled = false;
      this.id = "";
      this.ruleForm.name = "";
      this.ruleForm.remarks = "";
      this.dialogFormVisible = false;
    },
    submitForm(ruleForm) {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // this.loading = true;
          // 取值
          let data = {
            name: this.ruleForm.name,
            remark: this.ruleForm.remark,
          };
          if (this.id) {
            data.id = this.id;
            // 编辑
            update(data).then((res) => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg);
                // 刷新表格
                this.$emit("getList");
                this.CloseModal();
                this.loading = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            // 新增
            insert(data).then((res) => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg);
                // 刷新表格
                this.$refs["ruleForm"].resetFields();
                this.$emit("getList");
                this.CloseModal();
                this.loading = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
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
</style>

