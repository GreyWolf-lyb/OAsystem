<template>
  <div class="list-details-page">
    <div class="apply-information">
      <span class="tips-title">申请信息</span>
      <el-form :inline="true" :model="formInline" label-width="130px" class="demo-form-inline">
        <el-form-item  :label-width="this.formLabelWidth" label="反馈证明名称:">
          <el-input  size="medium" v-model="formInline.feedbackName" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="所属办理事项:">
          <el-input size="medium" v-model="formInline.itemName" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="发起组织机构:">
          <el-input size="medium" v-model="formInline.organizationName" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="发起组织机构行政区划：">
          <el-input size="medium" v-model="formInline.administrativeDivision" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="申请人姓名:">
          <el-input size="medium" v-model="formInline.applicant" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="联系电话:">
          <el-input size="medium" v-model="formInline.tel" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="身份证号码:">
          <el-input size="medium" v-model="formInline.idNumber" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="电子邮箱:">
          <el-input size="medium" v-model="formInline.email" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="发起时间:">
          <el-input size="medium" v-model="formInline.createTime" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="apply-information" style="margin-top:30px">
      <span class="tips-title">反馈信息</span>
      <el-form :inline="true" :model="formInline" label-width="130px" class="demo-form-inline">
        <el-form-item  v-if="statue !== '3'"   :label-width="this.formLabelWidth" :label="backPeople">
          <el-input size="medium" v-model="formInline.feedbackPeople" disabled></el-input>
        </el-form-item>
        <el-form-item  v-if="statue !== '3'"   :label-width="this.formLabelWidth" :label="backTime">
          <el-input size="medium" v-model="formInline.feedbackDate" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="statue === '1'" :label-width="this.formLabelWidth" label="审批人:">
          <el-input size="medium" v-model="formInline.approver" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="statue === '1'"  :label-width="this.formLabelWidth" label="审批时间:">
          <el-input  size="medium" v-model="formInline.approveDate" disabled></el-input>
        </el-form-item>
        <el-form-item  :label-width="this.formLabelWidth" label="状态:">
          <el-input  size="medium" v-model="formInline.status" disabled></el-input>
        </el-form-item>
        <el-row>
          <el-form-item   v-if="statue !== '3'"   :label-width="this.formLabelWidth" label="反馈意见:">
            <el-input type="textarea" size="medium" v-model="formInline.feedback" disabled></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  v-if="statue == '3'" :label-width="this.formLabelWidth" label="终止时间:">
            <el-input type="textarea" size="medium" v-model="formInline.feedbackDate" disabled></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div v-show="statue === '1' || statue === '4'"  id="sysmeter" class="apply-information" style="margin-top:30px; padding: 20px 30px;">
      <span class="tips-title">反馈证明</span>
      <div id="content" style="padding: 20px; height: 100%; min-height: 200px;">
          <div v-for="(item, index) in listImg">
            <p class="blue" @click="open(item)">{{item.fileName}}</p>
          </div>
      </div>
      <div  v-show="statue === '1' &&  Template ==='1'" id="qrcode">
      
      </div> 
    </div>
    <div class="return-button">
      <el-button type="primary" @click="returnClick">返回</el-button>
      <el-button v-if="this.$route.query.type === '1'" type="primary" @click="feed">允许</el-button>
    </div>
    <el-dialog title="用户列表" :before-close='cancel' append-to-body :visible.sync="isShow">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data='tableList'
        empty-text='暂无数据'
        class='el_tab_alage'
        :row-key='getRowKeys'
        @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column> -->
         <el-table-column label="序号" min-width="30" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" :key="scope.$index" class="no-show-label" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <template v-for="(item, index) in table.list.header">
          <el-table-column v-if="index === 1"  align="center" label="签章图片">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.url"
                :preview-src-list="[scope.row.url]">
              </el-image>
            </template>
         </el-table-column>
          <el-table-column fit v-else
            align='center'
            :key='index'
            :label="item.label"
            :width="item.width"
            :prop="item.field">
            <template slot-scope="scope">
              {{scope.row[item.field]}}
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-col :span='24'>
      <pagination ref="page" :total="total" @pageChange="pageChange"></pagination>
      </el-col>
      <div style="text-align: center;">
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
import { feedbackRecordListId, allow, findAttachments } from '@/api/feeds'
import editor from '@/components/editor/wangEditor'
import pagination from '@/components/table/Pagination.vue'
import { getToken } from '@/utils/auth'
import { putText } from '@/utils/water'
import { getScrollPosition } from '@/utils/browser'
export default {
   components: {
    editor,
    pagination
  },
  data() {
    return {
      formLabelWidth: '170px',
      tableList: [],
      formInline: {
        feedbackName: '',
        itemName: '',
        status: '',
        organizationName: '',
        administrativeDivision: '',
        tel: '',
        idNumber: '',
        createTime: '',
        applicant: '',
        email: '',
        feedbackPeople: '',
        feedbackDate: '',
        feedback: '',
        approver: '',
        approveDate: '',
        endTime: '',
      },
      Template: '',
      backPeople: '',
      backTime: '',
      listImg: [],
      radio: '',
      total: 0,
      pageSize: '20',
      currentPage: '1',
      isShow: false,
      url:'',
      statue: '',
      // 勾选数据
      tableArr: [],
      table: {
        list: {
          header: [
            {
              label: '签章名称',
              field: 'name',
              width: '100'
            },
            {
              label: '签章图片',
              field: 'url',
              width: '110'
            },
            {
              label: '是否需要审批',
              field: 'isApproval',
              width: '110'
            }
          ],
          data: []
        }
      },
    };
  },

  mounted() {
    this.feedback()
    this.qrcode();
  },
  // destroyed() {
  //   removeText()
  // },
  methods: {
    stateData() {},
    returnClick() {
      this.Template = ''
      if(this.$route.query.type === '1'){
        this.$router.push("/feedback/leader");
      } else {
        this.$router.push("/feedback/feedbackLu");
      }
    },
    qrcode() {
      let qrcode = new QRCode('qrcode', {
          width: 132,  
          height: 132,
          text: 'http://47.105.96.207/nangong/webview/index.html?id=' + this.$route.query.id, // 二维码地址
          // text: 'http://47.105.140.86/nangong/webview/index.html?id=' + this.$route.query.id, // 二维码地址
          colorDark : "#000",
          colorLight : "#fff",
      })
    },
    feed () {
      const that = this
      let da = {id: this.$route.query.id}
      that.$confirm('请确定是否允许审批?', '提示', {
        type: 'warning'
      }).then(async () => {
        that.Loading = true
        const response = await allow(da)
        that.Loading = false
        if (response.data.code === 1) {
          that.$message.success(response.data.msg)
          this.returnClick()
        } else {
          that.$message.error(response.data.msg)
        }
      }).catch(() => {
        return false
      })
    },
    
    async findAttachments () {
      let data = {
       id: this.$route.query.id
      }
      const res = await findAttachments(data)
      this.listImg = res.data.data
    },
    //  handleSuccess (response, file, fileList) {
    //  if(fileList[0].response.code == 1 ){
    //   this.ruleForm.fileName  = fileList[0].response.data.fileName
    //   this.ruleForm.file =  fileList[0].response.data.fileDownloadUri
    //   this.$message.success(fileList[0].response.msg)
    //   this.$refs['uploadImg'].clearValidate()
    //  }else{
    //    this.$message.error(fileList[0].response.msg)
    //  }
     
    // },
    cancel () {
      this.currentPage = 1
      // this.$refs.multipleTable.clearSelection()
      this.isShow = false
    },
    submit () {
      this.$refs.editor.putBack(this.url)
      // 每次选择清空上一次  
      this.isShow = false
      // 确定权限后清空勾选状态
      this.$refs.multipleTable.clearSelection()
    },
     getRowKeys (row) {
      return row.id
    },
    getCurrentRow(row){
     this.url = row.url
    },
    pageChange(item) {
      this.pageSize = item.limit
      this.currentPage = item.page
      this.commandTypeFindRoles()
    },
    // handleSelectionChange (row) {
    //   // 只要id
    //   console.log(row)
    //   let arr = []
    //   row.forEach(item => {
    //     arr.push(item.id)
    //   })
    //   this.tableArr = arr
    // },
    roleClick () {
      this.isShow = true
      this.commandTypeFindRoles()
    },
    async feedback () {
        let id = this.$route.query.id;
        const res =  await feedbackRecordListId({ id })
        this.formInline = res.data.data.feedbackRecord;
        this.statue = res.data.data.feedbackRecord.status;
        if(res.data.data.feedbackRecord.isTemplate === '1'){
          let str = res.data.data.feedbackRecord.prove.replace('</img>','');
          document.getElementById('content').innerHTML = res.data.data.feedbackRecord.prove.replace('</img>','')
          if(res.data.data.feedbackRecord.status === '1'){
            let imgs = this.getElementsClass('imgDic')
            imgs[0].style.display = 'inline-block'
          } 
          else if(res.data.data.feedbackRecord.status === '4'){
            let imgs = this.getElementsClass('imgDic')
            imgs[0].style.display = 'none'
          }
        }
        if(res.data.data.feedbackRecord.status === '2'){
          this.backPeople = '退回人:'
          this.backTime = '退回时间:'
        } else {
          this.backPeople = '反馈人:'
          this.backTime = '反馈时间:'
        }
        switch(res.data.data.feedbackRecord.status){
          case '0': this.formInline.status = '待反馈'; break;
          case '1': this.formInline.status = '已反馈'; break;
          case '2': this.formInline.status = '已退回'; break;
          case '3': this.formInline.status = '已终止'; break;
          case '4': this.formInline.status = '待用章审批'; break;
        }
        getScrollPosition()
        putText('', '南宫市证明政务OA系统');
        if(res.data.data.feedbackRecord.isTemplate === '0'){
          this.findAttachments()
        }
        this.Template = res.data.data.feedbackRecord.isTemplate
    },
    async commandTypeFindRoles () {
      let data = {
        page: this.currentPage,
        size: this.pageSize
      }
      const res = await findAllSignature(data)
      res.data.data.content.forEach(item => {
        item.url = process.env.VUE_APP_FILE_API + item.url
      });
      this.tableList= res.data.data.content
      this.total = res.data.data.totalElements

    },
    herror(error, file, fileList){
      const result = JSON.parse(error.message);
      this.$message.error('上传失败:' + result.msg)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制只能选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {  
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    async handleRemove(file, fileList){
      const that = this
      that.Loading = true
      // let datas = {
      //   type: that.ruleForm.type
      // }
      const response = await deleteFile(file.name, that.ruleForm.type)
      that.Loading = false
      if (response.data.code === 1) {
        that.$message.success('删除成功')
        that.ruleForm.fileName  = ''
        that.ruleForm.file = ''
        that.fileList = []
        return true 
      } else {
        that.$message.error(response.data.msg)
          return false
      }
    },
    open(file) {
      // let url = 'http://47.105.140.86/fileView/onlinePreview?url=' + file.url;
      let url = 'http://47.105.96.207/fileView/onlinePreview?url=' + encodeURI(file.url);
      window.open(url, "_blank");
    },
    getElementsClass(classnames){
      let classobj = new Array();  //定义数组
      let classint = 0; //定义数组的下标
      let tags = document.getElementsByTagName('*');
      for(var i in tags){ //对标签进行遍历
          if(tags[i].nodeType == 1){ //判断节点类型
              if(tags[i].getAttribute('class') == classnames){ //判断和需要class名字相同的，并组成一个数组
                classobj[classint] = tags[i]; 
                classint++;    
              }
          }
      }
      return classobj;  //返回组成的数组
    }

  },
};
</script>
<style lang="scss" scoped>
.list-details-page {
  padding: 40px 30px;
  box-sizing: border-box;
  .apply-information {
    border: 1px solid #333333;
    padding: 30px 20px;
    box-sizing: border-box;
    position: relative;
    .tips-title {
      position: absolute;
      border: 1px solid #4b93fa;
      left: 25px;
      top: -18px;
      color: #4b93fa;
      padding: 8px 18px;
      background: #fff;
      box-sizing: border-box;
    }
    .information-item {
      display: flex;
      .active-item-style {
        width: 20px;
        height: 20px;
        background: #009dd9;
        border-radius: 50%;
        margin-top: 15px;
        border: 1px solid #fff;
        box-shadow: 0 0 8px 2px #000;
      }
      .item-data-text {
        flex: 1;
        margin-left: 20px;
        border-bottom: 1px solid #797979;
        .prove-list {
          display: flex;
          ul,
          li {
            padding: 0;
            margin: 0;
            list-style: none;
            color: #4b93fa;
          }
        }
      }
    }
  }
  .return-button {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .top{
    margin-top: 50px;
  }
  #sysmeter{
    min-height: 500px;
  }
  .blue{
    color: blue;
    cursor:pointer
  }
  #qrcode{
    margin-bottom: 5px;
    margin-left: 35px;
  }
}
</style>