<template>
  <el-main>
     <el-col :span="24">
      <el-form :inline="true" class='el-InputForm'>
        <el-form-item label="姓名">
          <el-input clearable
            size="medium"
            placeholder="请输入姓名"
            prefix-icon="el-icon-search"
            v-model="SearchItem.name"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input clearable
            size="medium"
            placeholder="请输入账号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.account"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input clearable
            size="medium"
            placeholder="请输入手机号"
            prefix-icon="el-icon-search"
            v-model="SearchItem.phone"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="人员分类">
          <el-input clearable
            size="medium"
            placeholder="请输入人员分类"
            prefix-icon="el-icon-search"
            v-model="SearchItem.userTypeName"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="组织机构">
          <el-input clearable
            size="medium"
            placeholder="请输入组织机构"
            prefix-icon="el-icon-search"
            v-model="SearchItem.deptName"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input clearable
            size="medium"
            placeholder="请输入职务"
            prefix-icon="el-icon-search"
            v-model="SearchItem.duty"
            :label-width="this.formLabelWidth"
            class='InpitWidth'>
          </el-input>
        </el-form-item>
        <el-form-item label="行政区划">
          <el-select clearable v-model="SearchItem.province" disabled placeholder="请输入省">
            <el-option
              key="1"
              label="河北省"
              value="heibei">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="SearchItem.city" disabled placeholder="请输入市">
            <el-option
              key="2"
              label="邢台市"
              value="heibei">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select  clearable v-model="SearchItem.area" disabled placeholder="请输入区">
            <el-option
              key="3"
              label="南宫"
              value="南宫">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-select clearable v-model="SearchItem.town" placeholder="请选择乡镇">
            <el-option
              key="1"
              label="苏村镇"
              value="苏村镇">
            </el-option>
            <el-option
              key="2"
              label="高村镇"
              value="高村镇">
            </el-option>
            <el-option
              key="3"
              label="垂杨镇"
              value="垂杨镇">
            </el-option>
            <el-option
              key="4"
              label="明化镇"
              value="明化镇">
            </el-option>
            <el-option
              key="5"
              label="段芦头镇"
              value="段芦头镇">
            </el-option>
            <el-option
              key="6"
              label="紫冢镇"
              value="紫冢镇">
            </el-option>
            <el-option
              key="7"
              label="大村乡"
              value="大村乡">
            </el-option>
            <el-option
              key="8"
              label="南便乡"
              value="南便乡">
            </el-option>
            <el-option
              key="8"
              label="大屯乡"
              value="大屯乡">
            </el-option>
            <el-option
              key="8"
              label="薛吴村乡"
              value="薛吴村乡">
            </el-option>
            <el-option
              key="8"
              label="王道寨乡"
              value="王道寨乡">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="性别">
          <el-select clearable v-model="SearchItem.sex" placeholder="请选择性别">
            <el-option
              key="0"
              label="女"
              value="0">
            </el-option>
            <el-option
              key="1"
              label="男"
              value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  size='medium' @click="SearchNoteList" icon="el-icon-search">搜索</el-button>
          <el-button type="primary"  size='medium' @click="add" icon="">新增</el-button>
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
    <drawer
      :modal-objj='modalObjj'
      ref="callDetaill"
      @Reload='submitLoadingg'>
    </drawer>
  </el-main>
</template>

<script>
import { userFindAll, deleteUser, resetUser } from '@/api/user'
import TableList from '@/components/table/TableList.vue'
import Pagination from '@/components/table/Pagination.vue'
import drawer from './add'
import { getToken } from '@/utils/auth'
import { isEmpty } from '@/utils/tool'
import { sessionStorageGet } from '@/utils/storage'
export default {
  components: { TableList, Pagination, drawer},

  data() {
      return {
      drawer: false,
      formLabelWidth: '80px',
      tableData: [],
      tableHeader: [{id: false, type: '', label: '姓名', list: 'name'},
        {id: false, type: '', label: '账号', list: 'account'},
        {id: false, type: '', label: '手机号', list: 'phone'},
        {id: false, type: '', label: '性别', list: 'sex'},
        {id: false, type: '', label: '组织机构', list: 'deptName'},
        {id: false, type: '', label: '行政区划', list: 'areaH'},
        {id: false, type: '', label: '职务', list: 'duty'},
        {id: false, type: '', label: '角色', list: 'roleName'},
        {id: false, type: '', label: '人员分类', list: 'userTypeName'},
        {id: false, type: '', label: '备注', list: 'remark'}
      ],
      tableOpction: {
        label: '操作',
        width: '300px',
        value: 2,
        options: [{
          label: '编辑',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
            this.edit(row)
          }
        },
        {
          label: '删除',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
            this.delete(row)
          }
        },
        {
          label: '重置密码',
          key: 0,
          type: 'primary',
          State: true,
          method: (row) => {
            this.resetPasswd(row)
          }
        }
      ]
      },
      isSubmitLoading: false,
      DeletelistiD: [],
      SearchItem: {
        name: '',
        account: '',
        phone: '',
        sex: '',
        deptName: '',
        duty: '',
        sex: '',
        userTypeName: '',
        province: '河北省',
        city: '邢台市',
        area: '南宫市',
        town: ''
      },
      lastItem: {
        name: '',
        account: '',
        phone: '',
        sex: '',
        deptName: '',
        duty: '',
        sex: '',
        province: '',
        city: '',
        area: '',
        town: ''
      },
      total: 0,
      pageSize: '20',
      currentPage: '1',
      RootUrl: '',
      modalObjj: '',
    }
  },
  created () {
    this.fetchData()
    let res ={"code":1,"msg":"成功","data":{"id":"b3c43788dce7487586b281934745c499","ruleId":"0d55740ff4e642caa1a6993d51b2dd8a","ruleName":"age>90","taskId":"62aeb32b072045bba1cd8903e19b64c5","taskName":"mysqltomysql","templateId":"1cba66fbc4234ded95683288b30bb71e","templateName":"mysql长度约束","startTime":"2020-08-21 10:48:34","endTime":"2020-08-21 10:48:34","status":"执行成功","checkCount":7,"errorCount":7,"ruleSql":null,"logDesc":"[{\"content\":\"DCRunKettleDemo的user表到DCRunKettleTarget的user表\\n结果：插入7条数据。\\n校验条件为:select * from user where length (age) <90\\n校验个数：7\\n错误个数：7\"},{\"name\":\"234567\",\"Id\":12,\"age\":23},{\"name\":\"234567\",\"Id\":13,\"age\":23},{\"name\":\"12345678\",\"Id\":17,\"age\":19},{\"name\":\"123456\",\"Id\":21,\"age\":34},{\"name\":\"123456\",\"Id\":23,\"age\":12},{\"name\":\"123456\",\"Id\":77,\"age\":13},{\"name\":\"1234567689\",\"Id\":235,\"age\":3}]"}}
    res.data.logDesc = JSON.parse(res.data.logDesc).slice(1)
    console.log(res.data.logDesc)
  },
  methods: {
    async fetchData() {
      const that = this
      let data = {}
      data = this.SearchItem
      data.page = this.currentPage,
      data.size = this.pageSize
      data.deptId = sessionStorageGet('deptId')
      Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
      try {
        const res = await userFindAll(data)
        if(res.data.code === 1){
          res.data.data.content.map(function(v, k){
             if(v.sex === '0'){ v.sex = '女'}
             else if(v.sex === '1'){ v.sex = '男' }
             v.areaH = that.empty(v.province) + that.empty(v.city) + that.empty(v.area) + that.empty(v.town)
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
   add: function () {
      let that = this
      this.modalObjj = '新增'
      this.$refs.callDetaill.initial(false)
    },
    edit: function (row) {
      let that = this
      this.modalObjj = '编辑'
      this.$refs.callDetaill.initial(row.id)
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
//   /deep/ .el-form--inline .el-form-item{
//    width: 240px!important;
//  }
//  /deep/ .el-form--inline .el-form-item__content{
//    width: 200px!important;
//  }
//  .InpitWidth {
//     width: 80%;
//     min-width: 150px;
//   }
  .el-InputForm{
    padding-left: 1vw;
  }
//   /deep/ .el-button--medium{
//    padding: 12px 20px;
//  }
</style>