<template>
  <el-main>
    <el-form :inline="true" class="el-InputForm">
      <el-form-item label="人员分类名称">
        <el-input size="medium" prefix-icon="el-icon-search" clearable placeholder="请输入人员分类名称" v-model="SearchItem.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="el_tab_alage" :data="tableData" style="width: 100%">
      <el-table-column fixed align="center" prop="name" label="人员分类名称"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" :plain="true" size="small">编辑</el-button>
          <el-button type="primary" :plain="true" @click="deleteData(scope.row)" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-col :span="24">
      <TableList
        border
        :table-data="tableData"
        v-loading="isSubmitLoading"
        :table-label="tableHeader"
        :table-option="tableOpction"
      ></TableList>
    </el-col>-->
    <el-col :span="24">
      <pagination ref="page" :total="total" @pageChange="pageChange"></pagination>
      <classificationAdd :title="title" ref="add" @getList="getList"></classificationAdd>
    </el-col>
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
import TableList from "@/components/table/TableList.vue";
import Pagination from "@/components/table/Pagination.vue";
import classificationAdd from "./classificationAdd";
import { findAll, Delete } from "@/api/classification";

export default {
  components: { classificationAdd, TableList, Pagination },
  data() {
    return {
      tableData: [],
      title: "新增",
      options: [
          {
            label: "编辑",
            key: 0,
            State: false,
            method: (row) => {
              this.edit(row);
            },
          },
          {
            label: "删除",
            key: 0,
            State: false,
            method: (row) => {
              this.deleteData(row);
            },
          },
        ],
      tableData: [],
      tableHeader: [ 

        { id: false, type: "", label: "人员分类名称", list: "name" },
        { id: false, type: "", label: "备注", list: "remark" },
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
        remark: this.SearchItem.remark,
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
      } catch (even) {
        this.$message.error(even.msg);
      }
    },
    add () {
      this.title = "新增";
      this.$refs.add.initial("");
    },
    edit (row) {
      this.title = "编辑";
      this.$refs.add.initial(row.id);
    },

    SearchNoteList() {
      let that = this;
      this.currentPage = 1;
      this.$refs.page.Page(1)
      Object.entries(that.SearchItem).map((item) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.getList();
    },
    deleteData(row) {
      const that = this;
      that.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          type: "warning",
        })
        .then(async () => {
          that.Loading = true;
          const response = await Delete( row.id );
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