<template>
  <el-main>
    <el-form :inline="true" class="el-InputForm">
        <el-form-item label="组织机构名称"> 
          <el-input size="medium" clearable prefix-icon="el-icon-search"
          placeholder="请输入组织机构名称" 
          v-model="SearchItem.name">
          </el-input>
        </el-form-item>
        <el-form-item label="行政区划">
          <el-select size="medium" disabled prefix-icon="el-icon-search"
          v-model="SearchItem.province">
            <el-option
              label="河北省"
              value="河北省"
            ></el-option>
          </el-select>

          <el-select size="medium" disabled prefix-icon="el-icon-search"
            v-model="SearchItem.city"
            style="margin-left: 10px;"
          >
            <el-option
              label="邢台市"
              value="邢台市"
            ></el-option>
          </el-select>

          <el-select size="medium" disabled prefix-icon="el-icon-search"
            v-model="SearchItem.area"
            style="margin-left: 10px;"
          >
            <el-option
              label="南宫市"
              value="南宫市"
            ></el-option>
          </el-select>

          <el-select
            clearable
            prefix-icon="el-icon-search"
            size="medium"
            v-model="SearchItem.town"
            style="margin-left: 10px;"
            placeholder="请选择乡镇"
          >
            <el-option
              v-for="item in address"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" size="medium" @click="add">新增</el-button>
        </el-form-item>
    </el-form>
    <el-table class="el_tab_alage" :data="tableData" style="width: 100%">
      <el-table-column fixed align="center" prop="name" label="组织机构名称"></el-table-column>
      <el-table-column align="center"  prop="pisition" label="行政区划"></el-table-column>
      <el-table-column align="center"  prop="remark" label="备注"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.status==0">
            <el-button type="primary" :plain="true" @click="updateStatus(scope.row.id, scope.row.status)" size="small">恢复</el-button>
          </template>
          <template v-else>
            <el-button @click="edit(scope.row)" type="primary" :plain="true" size="small">编辑</el-button>
            <el-button v-if="scope.row.id!=='e59e824e949a4c9ba5029396449684f4'" type="primary" :plain="true" @click="updateStatus(scope.row.id, scope.row.status)" size="small">禁用</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <pagination ref="page" :total="total" @pageChange="pageChange"></pagination>
      <frameworkAdd :title="title" ref="add" @getList="getList"></frameworkAdd>
    </el-col>
  </el-main>
</template>

<script>
import { getList } from "@/api/table";
import TableList from "@/components/table/TableList.vue";
import Pagination from "@/components/table/Pagination.vue";
import frameworkAdd from "./frameworkAdd";
import { findAll, updateStatus, findById } from "@/api/framework";

export default {
  components: { frameworkAdd, TableList, Pagination },
  data() {
    return {
      title: '',
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
      options: [
          {
            label: '编辑',
            key: 0,
            type: 'success',
            State: false,
            method: (row) => {
              this.edit(row)
            }
          },
          {
            label: '禁用',
            key: 0,
            type: 'danger',
            State: false,
            method: (row) => {
              this.disable(row)
            }
          },
          {
            label: '恢复',
            key: 0,
            type: 'danger',
            State: false,
            method: (row) => {
              this.recovery(row)
            }
          }
        ],
      tableData: [],
      tableHeader: [],
      DeletelistiD: [],
      SearchItem: {
        name: "",
        province: "河北省",
        city: "邢台市",
        area: "南宫市",
        town: ""
      },
      lastItem: {
        name: "",
        province: "河北省",
        city: "邢台市",
        area: "南宫市",
        town: ""
      },      
      //数据总条数
      total: 0,
      pageSize: '20',
      currentPage: '1'
    }
  },
  created() {
    this.getList();
  },
  methods: {
    updateStatus(id,status) {
      const that = this
      this.$confirm('确定要'+(status==='0'?'恢复':'禁用')+'吗？', '提示', {
        type: 'warning'
      }).then(async() => {
        that.Loading = true
        let data = {
          id: id,
          status: status==='0'?'1':'0'
        }
        const response = await updateStatus(data)
        that.Loading = false
        if (response.data.code === 1) {
          that.$message.success(response.data.msg)
          this.getList()
        } else {
          that.$message.error(response.data.msg)
        }
      }).catch(() => {
        return false
      })
    },

    edit (row) {
      this.title = '编辑'
      this.$refs.add.initial(row.id)
    },
    add() {
      this.title = "新增";
      this.$refs.add.initial();
    },
    SearchNoteList(){
      this.currentPage = 1
      this.$refs.page.Page(1)
      Object.entries(this.SearchItem).map(item => {
        this.lastItem[item[0]] = this.SearchItem[item[0]]
      })
      this.getList()
    },
    async getList() {
      const data = {
        page: this.currentPage,
        size: this.pageSize,
        name: this.SearchItem.name,
        province: this.SearchItem.province,
        city: this.SearchItem.city,
        area: this.SearchItem.areaOrCounty,
        town: this.SearchItem.town,
      }
      try {
        const res = await findAll(data)
        res.data.data.content.forEach(item => {
          let town = item.town ? item.town : ''
          item.pisition = item.province + item.city + item.area + town
        })
        this.tableData = res.data.data.content
        this.total = res.data.data.totalElements
      } catch (even) {
        this.$message.error(even.msg)
      }
    },
    pageChange(item) {
      this.pageSize = item.limit
      this.currentPage = item.page
      Object.entries(this.SearchItem).map((item) => {
        this.SearchItem[item[0]] = this.lastItem[item[0]];
      });
      this.getList()
    }
    
    // SearchNoteList () {
    //   let that = this
    //   this.currentPage = 1
    //   Object.entries(that.SearchItem).map(item => {
    //     that.lastItem[item[0]] = that.SearchItem[item[0]]
    //   })
    //   this.getList()
    // },
    // deleteData(row) {
    //   const that = this
    //   that.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
    //     type: 'warning'
    //   }).then(async() => {
    //     that.Loading = true
    //     const response = await deleteData({ id: row.id })
    //     that.Loading = false
    //     if (response.data.code === 1) {
    //       that.$message.success('删除成功')
    //       this.getList()
    //     } else {
    //       that.$message.error(response.data.msg)
    //     }
    //   }).catch(() => {
    //     return false
    //   })
    // },

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