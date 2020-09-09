<template>
  <div class="work-page">
    <el-form
      :inline="true"
      label-width="200px"
      :model="formInline"
      ref="formInline"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item label="申请人姓名：" prop="name">
        <el-input size="medium" v-model="formInline.name" placeholder="请输入申请人姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份证号码: " prop="applyUserId">
        <el-input size="medium" v-model="formInline.applyUserId" placeholder="请输入身份证号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="applyUserTelephone">
        <el-input
          size="medium"
          v-model="formInline.applyUserTelephone"
          placeholder="请输入联系电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input size="medium" v-model="formInline.email" placeholder="请输入电子邮箱" clearable></el-input>
      </el-form-item>
      <div class="table-inie">
        <span class="tips-text">所需反馈证明模板：</span>
        <tableList
          :tableData="tableData"
          :table-label="[
        {id: false, width: '', type: '', label: '反馈证明模板名称', list: 'itemName'},
        {id: false, width: '', type: '', label: '组织机构行政区划', list: `str`},
        {id: false, width: '',type: '', label: '反馈组织机构', list: 'organizationName'}
        ]"
          :tableOption="{
          label: '操作',
        width: '',
        value: 1,
        options: [{
          label: '预览',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
             this.handleClick(row)
          }
        }]
      }"
        ></tableList>
      </div>
    </el-form>
    <div class="work-button">
      <el-button type="primary" @click="resetForm('formInline')">取 消</el-button>
      <span style="margin:0 50px"></span>
      <el-button type="primary" @click="submitForm('formInline')" :disabled="disabled">确 定</el-button>
    </div>
  </div>
</template>
<script>
import tableList from "@/components/table/TableList";
import { applyAllTemplateApi, applyInsertApi } from "@/api/work.js";
import { reapplyApi, detailsOfReapplicationApi } from "@/api/applyList";
export default {
  components: {
    tableList,
  },
  data() {
    return {
      disabled: false,
      formInline: {
        name: "",
        applyUserTelephone: "",
        applyUserId: "",
        email: "",
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: "请输入申请人姓名", trigger: "blur" },
        ],
        applyUserId: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "身份证号码格式有误",
            trigger: "blur",
          },
        ],
        applyUserTelephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "联系电话格式有误",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "电子邮箱格式有误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.$route.query.router === "办事申请") {
      this.formInline = this.$route.params;
    }
    // else if (this.$route.query.router === "重新申请") {
    //   this.formInline.name = this.formInline.name;
    //   this.formInline.email = this.formInline.email;
    //   this.formInline.applyUserId = this.formInline.applyUserId;
    //   this.formInline.applyUserTelephone = this.formInline.applyUserTelephone;
    // }
    this.defiultData();
  },
  methods: {
    defiultData() {
      let id = this.$route.query.id;
      let itemId = this.$route.query.itemId;
      applyAllTemplateApi({ id }).then((res) => {
        let arr = [];
        if (res.data.code === 1) {
          res.data.data.map((item) => {
            arr.push({
              itemName: item.name,
              organizationName: item.organizationName,
              str: item.province + item.city + item.areaOrCounty,
              id: item.id,
              itemId: item.itemId,
              typeId: item.typeId,
            });
          });
          this.tableData = arr;
        }
      });
      if (itemId) {
        detailsOfReapplicationApi({ id: itemId }).then((res) => {
          this.formInline.name = this.$route.params.name
            ? this.$route.params.name
            : res.data.data.applicant;
          this.formInline.email = this.$route.params.email
            ? this.$route.params.email
            : res.data.data.email;
          this.formInline.applyUserId = this.$route.params.applyUserId
            ? this.$route.params.applyUserId
            : res.data.data.idNumber;
          this.formInline.applyUserTelephone = this.$route.params
            .applyUserTelephone
            ? this.$route.params.applyUserTelephone
            : res.data.data.tel;
        });
      }
    },
    handleClick(row) {
      this.$router.push({
        name: "Preview",
        path: "/apply/preview",
        query: {
          templateId: row.id,
          id: this.$route.query.id,
          itemId: this.$route.query.itemId,
          router: this.$route.query.router,
        },
        params: this.formInline,
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.disabled = true;
          let data = {
            applicant: this.formInline.name,
            email: this.formInline.email,
            idNumber: this.formInline.applyUserId,
            itemId: this.$route.query.id,
            itemName: this.$route.query.name,
            tel: this.formInline.applyUserTelephone,
          };
         
          if (!this.$route.query.itemId) {
            applyInsertApi(data).then((res) => {
              if (res.data.code === 1) {
                setTimeout(() => {
                  this.$message({
                    type: "success",
                    message: res.data.msg,
                  });
                  this.$router.push("/apply/list");
                }, 2000);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            reapplyApi(data).then((res) => {
              if (res.data.code === 1) {
                setTimeout(() => {
                  this.$message({
                    type: "success",
                    message: res.data.msg,
                  });
                  this.$router.push("/apply/list");
                }, 2000);
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
    resetForm(formName) {
      if (this.$route.query.itemId) {
        this.$router.push("/apply/list");
      } else {
        this.$router.push("/apply/work");
      }
    },
  },
};
</script>
<style lang="scss" scope>
.work-page {
  padding: 20px;
  box-sizing: border-box;
}
.table-inie {
  display: flex;
  .tips-text {
    width: 190px;
    text-align: end;
    font-size: 14px;
    color: #606266;
    vertical-align: middle;
    font-weight: bold;
    line-height: 40px;
  }
}
.work-button {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-message {
  min-width: 270px !important;
}
</style>