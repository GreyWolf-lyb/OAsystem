<template>
  <el-main>
     <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item label="审批人">
          <el-input clearable
            size="medium"
            placeholder="请输入审批人"
            prefix-icon="el-icon-search"
            v-model="SearchItem.approver"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input clearable
            size="medium"
            placeholder="请输入申请人"
            prefix-icon="el-icon-search"
            v-model="SearchItem.applicant"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-date-picker
            v-model="time"
            value-format='yyyy-MM-dd HH:mm:ss'
            type="datetimerange"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
            :default-time="['00:00:00']"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  size='medium' @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>  
    <el-col :span="24">
      <TableList :table-data='tableData' v-loading="isSubmitLoading"
        :table-label="tableHeader"
        :table-option="tableOpction"
        @loadd='submitLoadingg'>
      </TableList>
    </el-col>
    <el-col :span='24'>
      <pagination ref="page" :total="total" @pageChange="pageChange"></pagination>
    </el-col>
    <el-dialog
      title="返回办事申请"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input type="textarea" :rows="3" size="medium" v-model="content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="putBack">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { leadershipApproval,allow } from '@/api/feeds'
import TableList from '@/components/table/TableList.vue'
import Pagination from '@/components/table/Pagination.vue'
import { getToken } from '@/utils/auth'
import { isEmpty } from '@/utils/tool'
import { sessionStorageGet } from '@/utils/storage'

export default {
  components: { TableList, Pagination},

  data() {
      return {
      drawer: false,
      formLabelWidth: '80px',
      tableData: [],
      tableHeader: [{id: false, type: '', label: '审批人', list: 'approver'},
        {id: false, type: '', label: '申请人', list: 'applicant'},
        {id: false, type: '', label: '审批事项', list: 'itemName'},
        {id: false, type: '', label: '签章名称', list: 'electronicSignature'},
        {id: false, type: '', label: '创建时间', list: 'createTime'}, 
      ],
      tableOpction: {
        label: '操作',
        width: '200px',
        value: 2,
        options: [{
          label: '允许',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
            this.feed(row)
          }
        },
        {
          label: '详情',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
            this.back(row)
          }
        }
      ]
      },
      dialogVisible: false,
      content: '',
      isSubmitLoading: false,
      DeletelistiD: [],
      SearchItem: {
        approver: '',
        applicant: '',
      },
      lastItem: {
        approver: '',
        applicant: '',
      },
      putId: '',
      total: 0,
      pageSize: '20',
      currentPage: '1',
      RootUrl: '',
      modalObjj: '',
      time: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const that = this
      let data = {}
      data  = this.SearchItem,
      data.page = this.currentPage,
      data.size = this.pageSize
      if(!isEmpty(this.time)){ 
        data.startTime = this.time[0]
        data.endTime = this.time[1]
      } else {
        data.startTime = ''
        data.endTime = ''
      }
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      try {
        const res = await leadershipApproval(data)
        if(res.data.code === 1){
          this.tableData = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message.error(even.msg)
        }
      } catch (even) {
        this.$message.error(even.msg)
      }
    },
    edit: function (row) {
      let that = this
    },
    submitLoadingg(){
      this.fetchData()
    },
    pageChange(item) {
      let that = this
      this.pageSize = item.limit
      this.currentPage = item.page
      Object.entries(that.SearchItem).map((item, index) => {
        that.SearchItem[item[0]] = that.lastItem[item[0]]
      })
      this.fetchData()
    },
    SearchNoteList(){
      this.currentPage = 1
      this.$refs.page.Page(1)
      this.fetchData()
    },
    back(row) {
      this.$router.push({
        path: '/feedback/feedbackLuDetails',
        query:{
          id: row.id,
          type: '1'
        }
      });
    },
    feed (row) {
      const that = this
      let da = {id: row.id, left: sessionStorageGet('left')}
      that.$confirm('请确定是否允许审批?', '提示', {
        type: 'warning'
      }).then(async () => {
        that.Loading = true
        const response = await allow(da)
        that.Loading = false
        if (response.data.code === 1) {
          that.$message.success(response.data.msg)
          this.fetchData()
        } else {
          that.$message.error(response.data.msg)
        }
      }).catch(() => {
        return false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .el-InputForm{
    padding-left: 1vw;
  }
</style>