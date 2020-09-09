<template>
  <el-main class="lunbo-main" v-loading="Loading">
    <el-row>
      <el-col class="lunbo-btn" :span='24' style="text-align: left">
        <el-form :inline="true" class='el-InputForm'>
          <el-row v-if="tab.type == 0">
            <el-form-item  label="角色名称">
              <el-input clearable size="medium" placeholder="请输入角色名称" prefix-icon="el-icon-search" v-model="SearchItem.name">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                size='medium'
                icon="el-icon-search"
                @click="search">搜索
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                size='medium'
                icon=""
                @click="add">新增
              </el-button>
            </el-form-item>
          </el-row>  
          <el-row v-if="tab.type == 1">
            <el-form-item
              :label-width="this.formLabelWidth"
              class='InpitWidth'>
              <el-select clearable v-model="SearchItem.roleId" :disabled='ProhibitFromm' @change="selectGet" placeholder="请选择节点">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input clearable size="medium" placeholder="请输入系统名称" prefix-icon="el-icon-search" v-model="SearchItem.name">
              </el-input>
            </el-form-item>
             <el-form-item>
              <el-input clearable size="medium" placeholder="请输入所属平台和系统" prefix-icon="el-icon-search" v-model="SearchItem.systemAndPlatform">
              </el-input>
            </el-form-item>
           <el-form-item>
            <el-button type="primary"
              size='medium'
              icon="el-icon-search"
              @click="search">搜索
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size='medium'
              icon="el-icon-search"
              @click="add">新增
            </el-button>
          </el-form-item>
        </el-row>  
        <el-row v-if="tab.type == 2">
            <el-form-item
              :label-width="this.formLabelWidth"
              class='InpitWidth'>
              <el-select clearable v-model="SearchItem.roleId" :disabled='ProhibitFromm' @change="selectGet" placeholder="请选择节点">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input clearable size="medium" placeholder="请输入数据库名称" prefix-icon="el-icon-search" v-model="SearchItem.name">
              </el-input>
            </el-form-item>
             <el-form-item>
              <el-input clearable size="medium" placeholder="请输入所属平台和系统" prefix-icon="el-icon-search" v-model="SearchItem.systemAndPlatform">
              </el-input>
            </el-form-item>
           <el-form-item>
            <el-button type="primary"
              size='medium'
              icon="el-icon-search"
              @click="search">搜索
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size='medium'
              icon="el-icon-search"
              @click="add">新增
            </el-button>
          </el-form-item>
          </el-row>
          <el-row v-if="tab.type == 3">
            <el-form-item
              :label-width="this.formLabelWidth"
              class='InpitWidth'>
              <el-select v-model="SearchItem.roleId" :disabled='ProhibitFromm' @change="selectGet" placeholder="请选择节点">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input clearable size="medium" placeholder="请输入公网ip" prefix-icon="el-icon-search" v-model="SearchItem.publicIp">
              </el-input>
            </el-form-item>
             <el-form-item>
              <el-input clearable size="medium" placeholder="请输入内网ip" prefix-icon="el-icon-search" v-model="SearchItem.intranetIp">
              </el-input>
            </el-form-item>
           <el-form-item>
            <el-button type="primary"
              size='medium'
              icon="el-icon-search"
              @click="search">搜索
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              size='medium'
              icon="el-icon-search"
              @click="add">新增
            </el-button>
          </el-form-item>
          </el-row>
      </el-form>
    </el-col>
    <el-col :span="24" class="w">
      <tableForm :table-data='tableData'
        v-loading="isSubmitLoading"
        @onHandleSelectionChange="handleSelectionChange"
        :table-selection="tableSelection"
        :table-label="tableHeader"
        :table-option="tableOption">
      </tableForm>
    </el-col>
      <el-col :span='24'>
      <paging ref="pager" :total="total" @pageChange="pageChange"></paging>
    </el-col>
    </el-row>
 
    <drawer
      :modal-objjr='modalObjjr'
      ref="callDetailR"
      @Reload='submitLoadings'>
    </drawer>
  </el-main>
</template>

<script>
import { roleFindAll, roleDelete} from '@/api/role'
import tableForm from '@/components/table/TableList.vue'
import paging from '@/components/table/Pagination.vue'
import drawer from './role'
export default {
  components: {tableForm, paging, drawer },
  data () {
    return {
      tableData: [],
      tableSelection: {
        key: true,
        type: '',
        detaile: false
      },
      options: [],
      SearchItem: {
        name: '',
        roleId: '',
        systemAndPlatform: '',
        publicIp: '',
        intranetIp: ''
      },
      lastItem: {
        name: '',
        roleId: '',
        systemAndPlatform: '',
        publicIp: '',
        intranetIp: ''
      },
      tab: {
        type: '0'
      },
      tableHeader: [],
      editableTabsValue: '0',
      tableOption: '',
      typeList: [
        {
          value: '0',
          label: '角色管理'
        }
      ],
      searchObj: {},
      QiniuToken: '',
      Loading: false,
      modalObjj: '', // 弹层操作标题
      modalObjjj: '', // 弹层操作标题
      modalObjjf: '',
      modalObjjr: '',
      isSubmitLoading: false, // 表格加载效果
      deleteList: [], // 批量删除数据集
      total: 0, // 总条数
      currentPage: 1, // 起始页
      pageSize: 20, // 条数
    }
  },

  mounted () {
    // this.findNodes()
    this.initial()
  },

  methods: {
    async initial () {
      this.tableOption = {
        label: '操作',
        width: '200px',
        value: 0,
        options: [{
          label: '编辑',
          key: 0,
          type: 'success',
          State: false,
          method: (row) => {
            this.editT(row)
          }
        }, {
          label: '删除',
          key: 0,
          type: 'danger',
          State: false,
          method: (row) => {
            this.delete(row)
          }
        }]
      }
      if (this.tab.type === '3') {
        this.tableHeader = [];
        this.tableHeader.push({
          // sort: false,
          id: false,
          type: '',
          label: '节点名称',
          list: 'name'
        }, {
          id: false,
          type: '',
          label: '公网IP',
          list: 'publicIp'
        }, {
          id: false,
          type: '',
          label: '内网IP',
          list: 'intranetIp'
        }, {
          id: false,
          type: '',
          label: '用途',
          list: 'purpose'
        }, {
          id: false,
          type: '',
          label: '配置',
          list: 'configuration'
        }, {
          id: false,
          type: '',
          label: '备注',
          list: 'remark'
        })
      } else if (this.tab.type === '1') {
        this.tableHeader = [];
        this.tableHeader.push({
          // sort: false,
          id: false,
          type: '',
          label: '节点名称',
          list: 'nodeName'
        },
        {
          id: false,
          type: '',
          label: '系统名称',
          list: 'name'
        },
        {
          id: false,
          type: '',
          label: '进程名',
          list: 'processName'
        },
        {
          id: false,
          type: '',
          label: '占用端口',
          list: 'port'
        },
        {
          id: false,
          type: '',
          label: '所属系统或平台',
          list: 'systemAndPlatform'
        }, 
        {
          id: false,
          type: '',
          label: '备注',
          list: 'remark'
        })
      } else if (this.tab.type === '2') {
        this.tableHeader = [];
        this.tableHeader.push({
          // sort: false,
          id: false,
          type: '',
          label: '节点名称',
          list: 'nodeName'
        },
        {
          id: false,
          type: '',
          label: '数据库名称',
          list: 'name'
        },
        {
          id: false,
          type: '',
          label: '数据库类型',
          list: 'type'
        },
        {
          id: false,
          type: '',
          label: '进程名',
          list: 'processName'
        },
        {
          id: false,
          type: '',
          label: '占用端口',
          list: 'port'
        },
        {
          id: false,
          type: '',
          label: '所属系统或平台',
          list: 'systemAndPlatform'
        },
        {
          id: false,
          type: '',
          label: '用户名',
          list: 'username'
        },
        {
          id: false,
          type: '',
          label: '密码',
          list: 'password'
        },
        {
          id: false,
          type: '',
          label: '备注',
          list: 'remark'
        })
      } else if (this.tab.type === '0') {
        this.tableOption = {}
        this.tableOption = {
          label: '操作',
          width: '300px',
          value: 3,
          options: [{
            label: '编辑',
            key: 0,
            type: 'primary',
            State: true,
            method: (row) => {
              this.editT(row)
            }
          }, {
            label: '删除',
            key: 0,
            type: 'primary',
            State: true,
            method: (row) => {
              this.delete(row)
            }
          }, {
            label: '权限分配',
            key: 0,
            type: 'primary',
            State: true,
            method: (row) => {
              this.$router.push({
                path: 'roleList',
                  query: {
                    id: row.id,
                    name: row.name
                }
              })
            }
          }]
        }
        this.tableHeader = [];
        this.tableHeader.push({
          // sort: false,
          id: false,
          type: 'role',
          label: '角色名称',
          list: 'name'
        }, {
          id: false,
          type: '',
          label: '备注',
          list: 'remark'
        })
      }
      const that = this
      try {
        let findUrl = null
        let data = this.SearchItem
        data.page = this.currentPage
        data.size = this.pageSize
        Object.entries(that.SearchItem).map((item, index) => {
        that.lastItem[item[0]] = that.SearchItem[item[0]]
      })
        switch (this.tab.type) {
          case '0':
            findUrl = roleFindAll(data)
            break;
          case '1':
            findUrl = getServiceList(data)
            break;
          case '2':
            findUrl = getDatabaseList(data)
            break;
          case '3':
            findUrl = getNodeList(data)
            break;
        }
        // that.Loading = true
        const response = await findUrl
        // that.Loading = false
        that.tableData = response.data.data.content
        that.total = response.data.data.totalElements
      } catch (even) {
        that.$message.error('数据获取失败')
      }
    },
    search () {
      this.currentPage = 1
      this.$refs.pager.Page(1)
      this.initial()
    },
    submitLoading: function () {
      this.initial()
    },
    submitLoadingg: function () {
      this.initial()
    },
    submitLoadings: function () {
      this.initial()
    },
    add: function () {
      let that = this
      if (that.tab.type === '3') {
        this.modalObjj = '添加'
        this.$refs.callDetaill.initial(false)
      } else if (that.tab.type === '1') {
        that.modalObjjj = '添加'
        that.$refs.callDetailS.initial(false)
      } else if (that.tab.type === '2') {
        that.modalObjjf = '添加'
        that.$refs.callDetailF.initial(false)
      } else if (that.tab.type === '0') {
        that.modalObjjr = '新增'
        that.$refs.callDetailR.initial(false)
      }

    },
    editT: function (row) {
      let that = this
      if (that.tab.type === '3') {
        that.modalObjj = '编辑'
        that.$refs.callDetaill.initial(row.id)
      } else if (that.tab.type === '1') {
        that.modalObjjj = '编辑'
        that.$refs.callDetailS.initial(row.id)
      } else if (that.tab.type === '2') {
        that.modalObjjf = '编辑'
        that.$refs.callDetailF.initial(row.id)
      } else if (that.tab.type === '0') {
        that.modalObjjr = '编辑'
        that.$refs.callDetailR.initial(row.id)
      }
    },
    role (data) {
      this.$router.push({ path: 'permisson/roleList' })
    },
    success (data) {
      let that = this
      if (data.code === 1) {
        that.$message.success(data.msg)
        that.initial()
      } else {
        that.$message.error(data.msg)
      }
    },

    delete (row) {
      const that = this
      let findUrll = ''
      switch (this.tab.type) {
        case '0':
          findUrll =  roleDelete
          break;
        case '1':
          findUrll = deServiceModel
          break;
        case '2':
          findUrll = deDatabase
          break;
        case '3':
          findUrll = deNodeModel
          break;  
      }
      // alert(findUrl)
      let urll = findUrll
      that.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        type: 'warning'
      }).then(async() => {
        that.Loading = true
        const response = await urll(row.id)
        that.Loading = false
        if (response.data.code === 1) {
          that.$message.success('删除成功')
          that.initial()
        } else {
          that.$message.error(response.data.msg)
        }
      }).catch(() => {
        return false
      })
    },
    async findNodes(data) {
      const that = this
      that.loading = true
      const response = await findAllNodes()
      that.loading = false
      if (response.data.code === 1) {
        that.options = []
        response.data.data.map(function(v){
          that.options.push({value: v.id, label:v.name})
        })
        console.log(that.options)
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },
    pageChange (item) {
      const that = this
      this.currentPage = item.page
      this.pageSize = item.limit
      Object.entries(that.SearchItem).map((item, index) => {
        that.SearchItem[item[0]] = that.lastItem[item[0]]
      })
      this.initial()
    }
  }
}
</script>

<style lang="scss" scoped>
  .lunbo-tab {
    margin-top: 10vh;
  }
  .lunbo-main {
    position: relative;

    .lunbo-btn {
      position: absolute;
      top: 0;
      left: 0px;
    }
  }
  .w{
    margin-top: 80px;
  }
</style>
