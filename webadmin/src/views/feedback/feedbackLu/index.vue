<template>
  <el-main>
     <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item label="反馈证明名称">
          <el-input clearable
            size="medium"
            placeholder="请输入反馈证明名称"
            prefix-icon="el-icon-search"
            v-model="SearchItem.feedbackName"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="所属办理事项">
          <el-input clearable
            size="medium"
            placeholder="请输入所属办理事项"
            prefix-icon="el-icon-search"
            v-model="SearchItem.itemName"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="发起组织机构">
          <el-input clearable
            size="medium"
            placeholder="请输入发起组织机构"
            prefix-icon="el-icon-search"
            v-model="SearchItem.deptName"
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
        <el-form-item label="联系电话">
          <el-input clearable
            size="medium"
            placeholder="请输入联系电话"
            prefix-icon="el-icon-search"
            v-model="SearchItem.tel"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="SearchItem.status" placeholder="请选择状态" clearable>
            <el-option
              size="medium"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
import { feedbackRecordList } from '@/api/feeds'
import TableList from '@/components/table/TableList.vue'
import Pagination from '@/components/table/Pagination.vue'
import { getToken } from '@/utils/auth'
import { isEmpty } from '@/utils/tool'


export default {
  components: { TableList, Pagination},

  data() {
      return {
      drawer: false,
      formLabelWidth: '80px',
      tableData: [],
      tableHeader: [{id: false, type: '', label: '反馈证明名称', list: 'feedbackName'},
        {id: false, type: '', label: '所属办理事项', list: 'itemName'},
        {id: false, type: '', label: '发起组织机构', list: 'deptName'},
        {id: false, type: '', label: '申请人', list: 'applicant'},
        {id: false, type: '', label: '联系电话', list: 'tel'},
        {id: false, type: '', label: '发起时间', list: 'createTime'},
        {id: false, type: '', label: '反馈时间', list: 'feedbackDate'},
        {id: false, type: '', label: '状态', list: 'status'}
      ],
      tableOpction: {
        label: '操作',
        width: '200px',
        value: 2,
        options: [{
          label: '详情',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
            this.detail(row)
          }
        }]
      },
      options:[
        // { label: '待反馈', value: '0'},
        { label: '已反馈', value: '1'},
        { label: '已退回', value: '2'},
        { label: '已终止', value: '3'},
        { label: '待用章审批', value: '4'},
      ],
      dialogVisible: false,
      content: '',
      isSubmitLoading: false,
      DeletelistiD: [],
      time: '',
      SearchItem: {
        feedbackName: '',
        itemName: '',
        administrativeDivision: '',
        applicant: '',
        deptName: '',
        tel: '',
        idNumber: '',
        createTime: '',
        status: ''
      },
      lastItem: {
        feedbackName: '',
        itemName: '',
        administrativeDivision: '',
        applicant: '',
        deptName: '',
        tel: '',
        idNumber: '',
        createTime: '',
        status: ''
      },
      putId: '',
      total: 0,
      pageSize: '20',
      currentPage: '1',
      RootUrl: '',
      modalObjj: '',
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const that = this
      let data = {}
      data = this.SearchItem,
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
        const res = await feedbackRecordList(data)
        if(res.data.code === 1){
          res.data.data.content.map(function(v, k){
            switch(v.status){
              case '0': v.status = '待反馈'; break;
              case '1': v.status = '已反馈'; break;
              case '2': v.status = '已退回'; break;
              case '3': v.status = '已终止'; break;
              case '4': v.status = '待用章审批'; break;
            }
          })
          this.tableData = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$message.error(even.msg)
        }
      } catch (even) {
        this.$message.error(even.msg)
      }
    },
   empty(value) {
     if(isEmpty(value)){ return ''}
     else{ return value }
   },
   detail(row) {
     let that = this
      this.$router.push({
        path: '/feedback/feedbackLuDetails',
        query:{
          id: row.id
        }
      });
   },
   back(row) {
    this.putId = row.id
    this.dialogVisible = true;
   },
   async putBack(){
     let that = this
     let data = {
       feedback: this.content,
       id: this.putId
     }
      try {
        const res = await sendBack(data)
        if(res.data.code === 1){
          this.$message.success(res.data.msg)
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
          this.dialogVisible = false
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
    // 删除当前单条数据 重载列表
    delete (row) {
      const that = this
      that.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        type: 'warning'
      }).then(async () => {
        that.Loading = true
        const response = await deleteUser(row.id)
        that.Loading = false
        if (response.data.code === 1) {
          that.$message.success('删除成功')
          this.fetchData()
        } else {
          that.$message.error(response.data.msg)
        }
      }).catch(() => {
        return false
      })
    },
    resetPasswd (row) {
      const that = this
      let da = {id: row.id}
      that.$confirm('此操作将重置密码, 是否继续?', '提示', {
        type: 'warning'
      }).then(async () => {
        that.Loading = true
        const response = await resetUser(da)
        that.Loading = false
        if (response.data.code === 1) {
          that.$message.success('重置成功')
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
//   /deep/ .el-button--medium{
//    padding: 10px 20px;
//  }
 /deep/ .el-input__inner {
   height: 36px!important;
   line-height: 36px!important;
 }
 /deep/ .el-form-item__content{
    line-height: 36px!important;
 }
</style>