<template>
  <div class="work-list-page">
    <div class="work-query">
      <span>办理事项名称</span>
      <el-input
        type="primary"
        size="medium"
        style="width:200px;margin:0 20px;"
        prefix-icon="el-icon-search"
        v-model="input"
        placeholder="请输入办理事项名称"
        clearable
      ></el-input>
      <el-button type="primary" size="medium" @click="searchClick" icon="el-icon-search">搜 索</el-button>
    </div>
    <div class="table-list">
      <tableList
        :tableData="tableData"
        :table-label="[
        {id: false, type: '', label: '办理事项名称', list: 'name'},
        {id: false, type: '', label: '反馈组织机构', list: 'organizations'}
        ]"
        :tableOption="{
          label: '操作',
        width: '',
        value: 1,
        options: [{
          disabled:false,
          label: '办事申请',
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
    <div class="table-pagination">
      <Pagination ref="page" :total="totalNum" @pageChange="pageChange"></Pagination>
    </div>
  </div>
</template>
<script>
import { sessionStorageGet } from "@/utils/storage";
import tableList from "@/components/table/TableList";
import Pagination from "@/components/table/Pagination";
import { applyListApi } from "@/api/work.js";
export default {
  components: {
    tableList,
    Pagination,
  },
  data() {
    return {
      status: sessionStorageGet("status"),
      deptName: sessionStorageGet("deptName"),
      inputFlag: false,
      input: "",
      tableData: [],
      totalNum: 0,
      sizeNum: "20",
      pageNum: "1",
    };
  },
  mounted() {
    this.defaultData();
  },
  methods: {
    defaultData() {
      let data = {
        name: this.input,
        size: this.sizeNum,
        page: this.pageNum,
      };
      applyListApi(data).then((res) => {
        if (res.data.code === 1) {
          this.tableData = res.data.data.content;
          this.totalNum = res.data.data.totalElements;
          this.inputFlag = false;
        }
      });
    },
    searchClick() {
      this.inputFlag = true;
      this.$refs.page.Page(1);
      this.defaultData();
    },
    handleClick(row) {
      this.$router.push({
        path: "/apply/workPage",
        query: {
          id: row.id,
          name: row.name,
          router: "办事申请",
        },
      });
    },
    pageChange(item) {
      this.sizeNum = item.limit;
      this.pageNum = item.page;
      if (!this.inputFlag) {
        this.input = "";
      }
      this.defaultData();
    },
  },
};
</script>
<style lang="scss" scoped>
.work-query {
  display: flex;
  align-items: center;
  padding: 20px;
  span {
    font-size: 14px;
    font-weight: bold;
    color: #606266;
  }
}
.table-list {
  padding: 0 20px;
  box-sizing: border-box;
}
.table-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}
</style>