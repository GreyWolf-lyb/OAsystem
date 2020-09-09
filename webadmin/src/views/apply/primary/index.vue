<template>
  <div class="work-primary">
    <div class="primary-header-query">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="办理事项">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.matter"
            placeholder="请输入办理事项名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.applyUser"
            placeholder="请输入申请人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.applyUserTelephone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号号码">
          <el-input
            size="medium"
            prefix-icon="el-icon-search"
            v-model="formInline.applyUserId"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            size="medium"
            v-model="formInline.applyTime"
            type="datetimerange"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择状态">
            <el-option
              size="medium"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批时间">
          <el-date-picker
            size="medium"
            v-model="formInline.approval"
            type="datetimerange"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list">
      <el-table :data="tableData" empty-text="暂无数据" class="el_tab_alage">
        <el-table-column prop="date" label="办理事项" align="center"></el-table-column>
        <el-table-column prop="name" label="申请人" align="center"></el-table-column>
        <el-table-column prop="province" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="city" label="身份证号码" align="center"></el-table-column>
        <el-table-column prop="address" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="zip" label="状态" align="center"></el-table-column>
        <el-table-column prop="zip" label="审批时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" plain size="mini">详情</el-button>
            <el-button type="primary" size="mini" plain>审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        matter: "",
        applyUser: "",
        applyUserTelephone: "",
        applyUserId: "",
        applyTime: "",
        state: "",
        approval: "",
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "00:00:00",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "00:00:00",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "00:00:00",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "00:00:00",
          zip: 200333,
        },
      ],
      currentPage: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.primary-header-query {
  padding: 20px;
  box-sizing: border-box;
}
.table-list {
  padding: 0 20px;
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