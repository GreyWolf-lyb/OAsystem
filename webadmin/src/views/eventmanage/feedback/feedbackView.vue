<template>
  <el-main>
    <el-form :inline="true" class="el-InputForm">
      <el-form-item label="反馈证明模板">
        <el-input
          prefix-icon="el-icon-search"
          size="medium"
          clearable
          placeholder="请输入反馈证明模板名称"
          v-model="SearchItem.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="办理事项名称">
        <el-input
          prefix-icon="el-icon-search"
          size="medium"
          clearable
          placeholder="请输入办理事项名称"
          v-model="SearchItem.itemName"
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈组织机构">
        <el-input
          prefix-icon="el-icon-search"
          size="medium"
          clearable
          placeholder="请输入反馈组织机构"
          v-model="SearchItem.organizationName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="routerAddEditDeletails(0,'新增')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="el_tab_alage" :data="tableData" style="width: 100%">
      <el-table-column fixed align="center" prop="name" label="反馈证明模板名称"></el-table-column>
      <el-table-column fixed align="center" prop="itemName" label="办理事项名称"></el-table-column>
      <el-table-column fixed align="center" prop="organizationName" label="反馈组织机构"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            :plain="true"
            @click="routerAddEditDeletails(scope.row,'详情')"
            size="small"
          >详情</el-button>
          <el-button
            type="primary"
            :plain="true"
            @click="routerAddEditDeletails(scope.row,'编辑')"
            size="small"
          >编辑</el-button>
          <el-button type="primary" :plain="true" @click="deleteData(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <pagination ref="page" :total="total" @pageChange="pageChange"></pagination>
      <feedbackAdd :title="title" ref="add" @getList="getList"></feedbackAdd>
    </el-col>
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
import TableList from "@/components/table/TableList.vue";
import Pagination from "@/components/table/Pagination.vue";
import { findAll, Delete } from "@/api/feedback";

export default {
  components: { TableList, Pagination },
  data() {
    return {
      inputFlag: false,
      tableData: [],
      tableData: [],
      tableHeader: [
        { id: false, type: "", label: "反馈证明模板名称", list: "name" },
        { id: false, type: "", label: "办理事项", list: "itemName" },
        {
          id: false,
          type: "",
          label: "反馈组织机构",
          list: "organizationName",
        },
      ],
      isSubmitLoading: false,
      SearchItem: {
        name: "",
      },
      lastItem: {
        name: "",
      },
      total: 0,
      pageSize: "20",
      currentPage: "1",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表信息
    async getList() {
      //取值
      const data = {
        page: this.currentPage,
        size: this.pageSize,
        name: this.SearchItem.name,
        itemName: this.SearchItem.itemName,
        organizationName: this.SearchItem.organizationName,
        type: "data",
      };
      //
      try {
        const res = await findAll(data);
        //数据处理
        // res.data.data.content.forEach(item => {

        // });
        //获取返回值并生成表格
        this.tableData = res.data.data.content;
        //获取数据总条数
        this.total = res.data.data.totalElements;
        this.inputFlag = false;
      } catch (even) {
        this.$message.error(even.msg);
      }
    },
    // 跳转 新增 编辑 详情
    routerAddEditDeletails(id, title) {
      this.$router.push({
        name: "addEditDetails",
        path: "/eventmanage/addEditDetails",
        params: {
          title,
          id,
        },
      });
    },
    SearchNoteList() {
      this.inputFlag = true;
      let that = this;
      this.currentPage = 1;
      this.$refs.page.Page(1);
      Object.entries(that.SearchItem).map((item) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.getList();
    },
    deleteData(row) {
      const that = this;
      that
        .$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          type: "warning",
        })
        .then(async () => {
          that.Loading = true;
          const response = await Delete(row.id);
          that.Loading = false;
          if (response.data.code === 1) {
            that.$message.success("删除成功");
            this.getList();
          } else {
            that.$message.error(response.data.msg);
          }
        })
        .catch(() => {
          return false;
        });
    },
    pageChange(item) {
      this.pageSize = item.limit;
      this.currentPage = item.page;
      Object.entries(this.SearchItem).map((item) => {
        this.SearchItem[item[0]] = this.lastItem[item[0]];
      });
      if (!this.inputFlag) {
        this.SearchItem.name = "";
        this.SearchItem.itemName = "";
        this.SearchItem.organizationName = "";
      }
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.work-query {
  display: flex;
  align-items: center;
  padding: 20px;
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