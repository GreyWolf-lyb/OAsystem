<template>
  <div class="add-edit-details">
    <el-form
      :model="ruleForm"
      :rules="this.$route.params.title !== '详情'?rules:null"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="办理事项名称：" prop="itemName">
        <el-select
          clearable
          size="medium"
          v-model="ruleForm.itemName"
          @change="itemNameListChange"
          placeholder="请选择办理事项名称"
          :disabled="this.$route.params.title === '详情'"
        >
          <el-option v-for="item in itemIdList" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈证明模板名称：" prop="name">
        <el-input
          style="width:206px"
          clearable
          size="medium"
          v-model="ruleForm.name"
          placeholder="请输入反馈证明模板名称"
          :disabled="this.$route.params.title === '详情'"
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈组织机构：" prop="organizationName">
        <el-select
          clearable
          size="medium"
          v-model="ruleForm.organizationName"
          @change="organizationNameChange"
          placeholder="请选择反馈组织机构"
          :disabled="this.$route.params.title === '详情'||this.$route.params.title === '编辑'"
        >
          <el-option
            v-for="item in organizationIdList"
            v-if="item.status!=='0'"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织机构行政区划：">
        <el-select size="medium" disabled v-model="ruleForm.province">
          <el-option label="河北省" value="河北省"></el-option>
        </el-select>
        <el-select
          size="medium"
          v-model="ruleForm.city"
          style="margin:0 10px;"
          disabled
          placeholder="邢台市"
        >
          <el-option label="邢台市" value="邢台市"></el-option>
        </el-select>
        <el-select clearable size="medium" disabled v-model="ruleForm.areaOrCounty">
          <el-option label="南宫市" value="南宫市"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈人员分类：" prop="typeName">
        <el-select
          clearable
          size="medium"
          v-model="ruleForm.typeName"
          @change="typeNameChange"
          placeholder="请选择反馈人员分类"
          :disabled="this.$route.params.title === '详情'"
        >
          <el-option v-for="item in typeIdList" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈模板：" prop="template">
        <el-input
          style="width:200px;position:absolute; z-index:-1; margin-top:20px;"
          v-if="this.$route.params.title !== '详情'"
          v-model="ruleForm.template"
        ></el-input>
        <div
          style="background:#fff;"
          v-html="ruleForm.template"
          v-if="this.$route.params.title === '详情'"
        ></div>
        <Editor @monitor="monitor" ref="textDate" v-else></Editor>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" @click="resetForm('ruleForm')">取 消</el-button>
        <el-button
          v-if="this.$route.params.title !== '详情'"
          size="medium"
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  insert,
  update,
  findById,
  userFindAllList,
  itemFindAllList,
} from "@/api/feedback";
import { findAllList } from "@/api/framework";
import Editor from "@/components/editor/wangEditor.vue";
import { sessionStorageGet } from "@/utils/storage";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      status: sessionStorageGet("status"),
      deptName: sessionStorageGet("deptName"),
      ruleForm: {
        name: "",
        itemId: "",
        itemName: "",
        organizationId: "",
        organizationName: "",
        typeId: "",
        typeName: "",
        province: "河北省",
        city: "邢台市",
        areaOrCounty: "南宫市",
        template: "",
      },
      itemIdList: [],
      organizationIdList: [],
      typeIdList: [],
      rules: {
        itemName: [
          {
            required: true,
            message: "请选择办理事项名称",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入反馈证明模板名称",
            trigger: "blur",
          },
        ],
        organizationName: [
          {
            required: true,
            message: "请选择反馈组织机构",
            trigger: "change",
          },
        ],
        typeName: [
          {
            required: true,
            message: "请选择反馈人员分类",
            trigger: "change",
          },
        ],
        template: [
          {
            required: true,
            message: "请输入反馈模板",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  computed: {
    "ruleForm.template"() {
      return this.ruleForm.template;
    },
  },
  watch: {
    "ruleForm.template"(val) {
      this.ruleForm.template = val;
    },
  },
  mounted() {
    this.$route.meta.title = this.$route.params.title;
    this.initData();
  },
  methods: {
    initData() {
      // 办理事项名称列表
      itemFindAllList().then((res) => {
        if (res.data.code === 1) {
          this.itemIdList = res.data.data;
        }
      });
      // 反馈证明模板名称列表
      findAllList().then((res) => {
        if (res.data.code === 1) {
          this.organizationIdList = res.data.data;
        }
      });

      if (
        this.$route.params.title === "编辑" ||
        this.$route.params.title === "详情"
      ) {
        findById({ id: this.$route.params.id.id }).then((res) => {
          if (res.data.code === 1) {
            this.ruleForm = res.data.data;
            this.userList(this.ruleForm.organizationId);
            if (this.$route.params.title === "编辑") {
              this.$refs.textDate.setContent(res.data.data.template);
            }
          }
        });
      }
    },
    resetForm() {
      this.$router.go(-1);
    },
    itemNameListChange(val) {
      this.ruleForm.itemId = val.id;
      this.ruleForm.itemName = val.name;
    },
    organizationNameChange(val) {
      this.userList(val.id);
      this.ruleForm.typeId = "";
      this.ruleForm.typeName = "";
      this.ruleForm.organizationId = val.id;
      this.ruleForm.organizationName = val.name;
    },
    userList(val) {
      // 反馈人员分类列表
      userFindAllList({ deptId: val }).then((res) => {
        if (res.data.code === 1) {
          this.typeIdList = res.data.data;
        }
      });
    },
    typeNameChange(val) {
      this.ruleForm.typeId = val.id;
      this.ruleForm.typeName = val.name;
    },
    monitor() {
      this.ruleForm.template = this.$refs.textDate.htmlContent().html;
    },
    submitForm(formName) {
      if (
        this.$refs.textDate.htmlContent().text === "" ||
        this.$refs.textDate.htmlContent().text === null
      ) {
        this.ruleForm.template = "";
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.params.title === "新增") {
            insert(this.ruleForm).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                this.$router.push("/eventmanage/feedbackView");
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg,
                });
              }
            });
          } else if (this.$route.params.title === "编辑") {
            update(this.ruleForm).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                this.$router.push("/eventmanage/feedbackView");
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg,
                });
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
<style lang="scss" scope>
.add-edit-details {
  padding: 10px 20px;
  box-sizing: border-box;
}
.el-select-dropdown__item.selected {
  color: #606266;
  font-weight: normal;
}
</style>