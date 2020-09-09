<template>
  <div class="apply-list-page">
    <div class="apply-header-query">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="办理事项名称">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.matter"
            placeholder="请输入办理事项名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.applyUser"
            placeholder="请输入申请人"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.applyUserTelephone"
            placeholder="请输入联系电话"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择状态" clearable>
            <el-option
              size="medium"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起人">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.applyUserId"
            placeholder="请输入发起人"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-date-picker
            size="medium"
            v-model="formInline.applyTime"
            type="datetimerange"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
            :default-time="['00:00:00']"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit" icon="el-icon-search">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list">
      <el-table :data="tableData" class="el_tab_alage">
        <el-table-column prop="itemName" label="办理事项名称" align="center"></el-table-column>
        <el-table-column prop="applicant" label="申请人" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="createByName" label="发起人" align="center"></el-table-column>
        <el-table-column prop="createTime" label="发起时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">待反馈</span>
            <span style="color:#70B603;" v-if="scope.row.status==1">已反馈</span>
            <span style="color:red" v-if="scope.row.status==2">已终止</span>
          </template>
        </el-table-column>
        <el-table-column prop="feedbackDate" label="反馈时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini" plain>详情</el-button>
            <el-button
              v-if="scope.row.status==0"
              @click="stopClick(scope.row)"
              type="primary"
              size="mini"
              plain
            >终止流程</el-button>
            <el-button
              v-if="scope.row.status==2"
              @click="renewClick(scope.row)"
              type="primary"
              size="mini"
              plain
            >重新申请</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-pagination">
      <Pagination ref="page" :total="totalNum" @pageChange="pageChange"></Pagination>
    </div>
    <el-dialog title="终止办事申请流程" :visible.sync="dialogVisible" width="30%" center>
      <span>一旦终止流程则所有待反馈证明状态自动更新为“已终止”，请确认是否终止申请人“{{name}}”的{{workName}}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="submitClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Dialog from "@/components/dialog/dialog.vue";
import Pagination from "@/components/table/Pagination";
import { applyListApi, terminateApplicationApi } from "@/api/applyList";
export default {
  components: {
    Pagination,
    Dialog,
  },
  data() {
    return {
      inputFlag: false,
      id: "",
      name: "",
      workName: "",
      formInline: {
        matter: "",
        applyUser: "",
        applyUserTelephone: "",
        applyUserId: "",
        applyTime: "",
        state: "",
      },
      options: [
        {
          value: "0",
          label: "待反馈",
        },
        {
          value: "1",
          label: "已反馈",
        },
        {
          value: "2",
          label: "已终止",
        },
      ],
      tableData: [],
      totalNum: null,
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
        itemName: this.formInline.matter,
        applicant: this.formInline.applyUser,
        tel: this.formInline.applyUserTelephone,
        createByName: this.formInline.applyUserId,
        status: this.formInline.state,
        startTime: this.formInline.applyTime
          ? this.formInline.applyTime[0]
          : "",
        endTime: this.formInline.applyTime ? this.formInline.applyTime[1] : "",
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
    onSubmit() {
      this.inputFlag = true;
      this.pageNum = "1";
      this.$refs.page.Page(1);
      this.defaultData();
    },
    handleClick(row) {
      this.$router.push({
        path: "/apply/details",
        query: {
          id: row.id,
        },
      });
    },
    submitClick() {
      terminateApplicationApi({ id: this.id }).then((res) => {
        if (res.data.code === 1) {
          this.$message.success(res.data.msg);
          this.defaultData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
          this.dialogVisible = false;
        }
      });
    },
    stopClick(row) {
      this.id = row.id;
      this.name = row.applicant;
      this.workName = row.itemName;
      this.dialogVisible = true;
    },
    renewClick(row) {
      this.$router.push({
        path: "/apply/workPage",
        query: {
          itemId: row.id,
          id: row.itemId,
          router: "重新申请",
        },
      });
    },
    pageChange(item) {
      this.sizeNum = item.limit;
      this.pageNum = item.page;
      if (!this.inputFlag) {
        this.formInline = {
          matter: "",
          applyUser: "",
          applyUserTelephone: "",
          applyUserId: "",
          applyTime: "",
          state: "",
        };
      }
      this.defaultData();
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-input__inner {
  height: 36px !important;
  line-height: 36px !important;
}
/deep/ .el-form-item__content {
  line-height: 36px !important;
}
.apply-header-query {
  padding: 20px;
  box-sizing: border-box;
}
.table-list {
  padding: 0 10px;
  box-sizing: border-box;
}
.table-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}
.el_tab_alage {
  width: 98%;
  border: 1px solid #f0f0f0;
  margin: {
    left: 1%;
    bottom: 20px;
    top: 10px;
  }
  .el-table__row {
    @media screen and (max-width: 1020px) {
      .el-button {
        margin: {
          top: 0px !important;
          left: 10px !important;
          bottom: 0px !important;
          right: 0px !important;
        }
      }
    }
    @media screen and (max-width: 1360px) {
      .el-button + .el-button {
        margin: {
          top: 0px !important;
          bottom: 0px !important;
          right: 0px !important;
        }
      }
    }
  }
}
</style>