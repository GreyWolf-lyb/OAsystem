<template>
  <el-drawer
    :title="title"
    direction="rtl"
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    :before-close="ClearTextConeten"
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
      <el-form-item label="组织机构名称：" prop="name">
        <el-input clearable size="medium" :disabled="disabled" v-model="ruleForm.name" placeholder="请输入组织机构名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织机构行政区划：" prop="town">
        <el-select clearable size="medium" disabled v-model="ruleForm.province">
          <el-option
            label="河北省"
            value="河北省"
          ></el-option>
        </el-select>

        <el-select clearable size="medium" disabled v-model="ruleForm.city" style="margin-left: 10px;" placeholder="邢台市" >
          <el-option
            label="邢台市"
            value="邢台市"
          ></el-option>
        </el-select>

        <el-select clearable size="medium" disabled v-model="ruleForm.area" placeholder="南宫市" >
          <el-option
            label="南宫市"
            value="南宫市"
          ></el-option>
        </el-select>

        <el-select clearable size="medium"  :disabled="disabled" v-model="ruleForm.town" style="margin-left: 10px;" placeholder="请选择乡镇" >
          <el-option
            v-for="item in address"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input size="medium" style="width: 65% !important" type="textarea" :rows="2" placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer drawer_footer">
      <el-button size="medium" @click="CloseModal">取 消</el-button>
      <el-button size="medium" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { insert, update, findById } from "@/api/framework";

export default {
  props: {
    title: {
      type: String,
      default: () => {},
    },
  },

  data() {
    return {
      id: '',
      address: [
        {
          value: "苏村镇",
          label: "苏村镇",
        },
        {
          value: "高村镇",
          label: "高村镇",
        },
        {
          value: "垂杨镇",
          label: "垂杨镇",
        },
        {
          value: "明化镇",
          label: "明化镇",
        },
        {
          value: "段芦头镇",
          label: "段芦头镇",
        },
        {
          value: "紫冢镇",
          label: "紫冢镇",
        },
        {
          value: "大村乡",
          label: "大村乡",
        },
        {
          value: "南便乡",
          label: "南便乡",
        },
        {
          value: "明大屯乡",
          label: "明大屯乡",
        },
        {
          value: "薛吴村乡",
          label: "薛吴村乡",
        },
        {
          value: "王道寨乡",
          label: "王道寨乡",
        },
      ],
      ruleForm: {
        name: '',
        province: '河北省',
        city:'邢台市',
        area:'南宫市',
        town:'',
        remark: ''
      },
      disabled: false,
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "请输入组织机构名称", trigger: "blur" }],
        // blur: 失去焦点事件
        // change：操作表单事件
        // town: [{ required: true, message: "请选择乡镇", trigger: ["blur", 'change'] }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    initial (value) {
      const that = this;
      that.dialogFormVisible = true;
      if (value) {
        that.id = value;
        // 详情
        that.detail();
      }

    },
    // 详情
    async detail () {
      const res = await findById({ id: this.id })
      this.ruleForm = res.data.data
      if(this.id === 'e59e824e949a4c9ba5029396449684f4'){
          this.disabled = true
      }else{
          this.disabled = false
      }
    },

    // 初始化表单
    CloseModal() {
      const that = this;
      that.$refs["ruleForm"].resetFields();
      that.id = "";
      // 初始化表单数据
      that.ruleForm = {
        name: '',
        province: '河北省',
        city:'邢台市',
        area:'南宫市',
        town:'',
        remark: ''
      };
      this.disabled = false
      that.dialogFormVisible = false;
    },

    submitForm (ruleForm) {
      const that = this
      that.$refs[ruleForm].validate(async (index) => {
        if (index === false) {
          return false
        }
        that.loading = true
        // 取值
        let data = {
          name: this.ruleForm.name,
          province: this.ruleForm.province,
          city: this.ruleForm.city,
          area: this.ruleForm.area,
          town: this.ruleForm.town,
          remark: this.ruleForm.remark
        }
        let response = null
        if (that.id) {
          data.id = that.id
          // 编辑
          response = await update(data)
        } else {
          // 新增
          response = await insert(data)
        }
        that.loading = false
        // success：成功处理
        if (response.data.code === 1) {
          that.$message.success(response.data.msg)
          // 刷新表格
          that.$emit('getList')
          that.CloseModal()
          return false
        }
        // error：失败处理
        this.$message.error(response.data.msg)
      })
    }
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

