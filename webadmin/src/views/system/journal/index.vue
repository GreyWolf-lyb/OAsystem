<template>
  <div class="journal-page">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input
          prefix-icon="el-icon-search"
          v-model="formInline.user"
          placeholder="请输入姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          prefix-icon="el-icon-search"
          v-model="formInline.tel"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="组织机构">
        <el-input
          prefix-icon="el-icon-search"
          v-model="formInline.dept"
          placeholder="请输入组织机构"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="onSubmit" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <tableList
      :tableData="tableData"
      :table-label="[
        {id: false, type: '', label: '操作内容', list: 'content'},
        {id: false, type: '', label: '手机号', list: 'phone'},
        {id: false, type: '', label: '姓名', list: 'name'},
        {id: false, type: '', label: '组织机构', list: 'deptName'},
        {id: false, type: '', label: '角色', list: 'roleName'}
        ]"
      :tableOption="{}"
    ></tableList>
    <Pagination ref="page" :total="totalNum" @pageChange="pageChange"></Pagination>
  </div>
</template>
<script>
import tableList from "@/components/table/TableList";
import Pagination from "@/components/table/Pagination";
import { journalListApi } from "@/api/journal.js";
export default {
  components: {
    tableList,
    Pagination,
  },
  data() {
    return {
      inputFlag: false,
      formInline: {
        user: "",
        tel: "",
        dept: "",
      },
      tableData: [],
      totalNum: 0,
      pageNum: "1",
      sizeNum: "20",
    };
  },
  mounted() {
    this.defaultData();
  },
  methods: {
    defaultData() {
      let data = {
        name: this.formInline.user,
        phone: this.formInline.tel,
        deptName: this.formInline.dept,
        page: this.pageNum,
        size: this.sizeNum,
      };
      journalListApi(data).then((res) => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.totalNum = res.data.data.totalElements;
          this.inputFlag = false;
        }
      });
    },
    onSubmit() {
      this.inputFlag = true;
      this.$refs.page.Page(1);
      this.defaultData();
    },
    pageChange(item) {
      this.sizeNum = item.limit;
      this.pageNum = item.page;
      if (!this.inputFlag) {
        this.formInline.user = "";
        this.formInline.tel = "";
        this.formInline.dept = "";
      }
      this.defaultData();
    },
  },
};
</script>
<style lang="scss" scope>
.journal-page {
  padding: 0 20px;
  box-sizing: border-box;
}
</style>