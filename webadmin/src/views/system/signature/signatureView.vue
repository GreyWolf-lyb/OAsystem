<template>
  <el-main>
    <el-form :inline="true" class="el-InputForm">
      <el-col :span="24">
        <el-form-item>
          <span>所属组织机构： {{position.province}}-{{position.city}}-{{position.area}} {{position.approval}}</span>
        </el-form-item>
      </el-col>
      <el-form-item label="签章名称">
        <el-input
          size="medium"
          clearable
          prefix-icon="el-icon-search"
          placeholder="请输入签章名称"
          v-model="SearchItem.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="el_tab_alage" :data="tableData" style="width: 100%">
      <el-table-column fixed align="center" prop="name" label="签章名称"></el-table-column>
      <el-table-column align="center" prop="url" label="签章图片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.url"
            :preview-src-list="[scope.row.url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isApproval" label="是否需要审批"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" :plain="true" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" :plain="true" size="small" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <pagination ref="page" :total="total" @pageChange="pageChange"></pagination>
      <signatureAdd :title="title" ref="add" @getList="getList"></signatureAdd>
    </el-col>
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
import TableList from "@/components/table/TableList.vue";
import Pagination from "@/components/table/Pagination.vue";
import signatureAdd from "./signatureAdd";
import { findAll, Delete } from "@/api/signature";
import { sessionStorageGet } from "@/utils/storage";
export default {
  components: { signatureAdd, TableList, Pagination },
  data() {
    return {
      status: sessionStorageGet("status"),
      userData: "",
      position: {
        province: "",
        city: "",
        area: "",
        approval: "",
      },
      tableData: [],
      tableHeader: [],
      isSubmitLoading: false,
      DeletelistiD: [],
      SearchItem: {
        name: "",
        phone: "",
        userName: "",
        Timeframe: "",
      },
      lastItem: {
        name: "",
        phone: "",
        userName: "",
        Timeframe: "",
      },
      total: 0,
      pageSize: "20",
      currentPage: "1",
      title: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表信息
    async getList() {
      let that = this;
      that.userData = JSON.parse(sessionStorageGet("userData"));
      that.position.province = that.userData.province || "河北省";
      that.position.city = that.userData.city || "邢台市";
      that.position.area = that.userData.area || "南宫市";
      that.position.approval = that.userData.deptName || "";
      //取值
      const data = {
        page: this.currentPage,
        size: this.pageSize,
        name: this.SearchItem.name,
        isApproval: this.isApproval,
      };
      //
      try {
        const res = await findAll(data);
        // 数据处理
        res.data.data.content.forEach((item) => {
          item.url = process.env.VUE_APP_FILE_API + item.url;
          item.isApproval = item.isApproval === "1" ? "是" : "否";
        });
        //获取返回值并生成表格
        this.tableData = res.data.data.content;
        //获取数据总条数
        this.total = res.data.data.totalElements;
      } catch (even) {
        console.log(even);
        this.$message.error(even.msg);
      }
    },
    add() {
      this.title = "新增";
      this.$refs.add.initial("");
    },
    edit(row) {
      this.title = "编辑";
      this.$refs.add.initial(row.id);
    },

    SearchNoteList() {
      let that = this;
      this.currentPage = 1;
      Object.entries(that.SearchItem).map((item) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
      });
      this.getList();
    },
    pageChange(item) {
      this.pageSize = item.limit
      this.currentPage = item.page
      Object.entries(this.SearchItem).map((item) => {
        this.SearchItem[item[0]] = this.lastItem[item[0]];
      });
      this.getList()
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
    SearchNoteList() {
      let that = this;
      this.currentPage = 1;
      this.$refs.page.Page(1)
      Object.entries(that.SearchItem).map((item) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]];
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