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
        <!-- <el-row>
          <el-form-item  :label-width="this.formLabelWidth" label="反馈人:">
            <el-input size="medium" v-model="formInline.feedbackPeople" disabled></el-input>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item  :label-width="this.formLabelWidth" label="反馈意见:">
            <el-input type="textarea" size="medium" placeholder="请输入反馈意见"  v-model="formInline.feedback"></el-input>
          </el-form-item>
         </el-row>
      </el-form>
    </div>
    <div class="apply-information" style="margin-top:30px;  padding: 20px 100px 20px 30px;">
      <span class="tips-title">反馈证明</span>
      <editor ref="editor"></editor>
       <el-form :inline="true" :model="ruleForm"  :rules="ruless"  ref="ruleForm" label-width="130px" class="demo-form-inline top">
        <el-row>
          <el-form-item prop="isTemplate" :label-width="this.formLabelWidth" label="是否使用反馈证明模板:">
             <el-select  @change="choose" v-model="ruleForm.isTemplate"  placeholder="请选择"> 
                <el-option
                  key="1"
                  label="是"
                  value="1">
                </el-option>
                <el-option
                  key="0"
                  label="否"
                  value = '0'>
                </el-option>
              </el-select>
          </el-form-item>
        </el-row>
        <el-row v-if="isTemplate">
          <el-form-item 
              ref="uploadImg"
              prop="fileName"
              label="反馈证明上传:"
              :label-width="this.formLabelWidth"
              class='InpitWidth'> 
              <!-- <el-input  clearable :disabled='true' autocomplete="off" v-model="ruleForm.fileName" placeholder="请输入文件名"></el-input> -->
              <el-upload 
              class="upload-demo"
              :data="datas"
              :headers='headers'
              :multiple="true"
              :action="action"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.JPG,.JPEG,.PBG"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              :on-error="herror"  
              :limit='limit' 
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">注:最多可上传5个附件，(附件格式支持doc, docx, pdf, png, jpg, jpeg)</div>
            </el-upload>
          </el-form-item>
         </el-row>
      </el-form>
    </div>
    <div class="return-button">
      <el-button type="primary" @click="deAllRemove">取消</el-button>
      <el-button type="primary" @click="SuretoAddClick('ruleForm')">反馈</el-button>
      <el-button type="primary" v-if="this.ruleForm.isTemplate === '1'" @click="roleClick">请选择电子签章</el-button>
    </div>
    <el-dialog title="选择电子签章" :before-close='cancel' append-to-body :visible.sync="isShow">
      <div class="cal" style="height: 400px; min-height: 400px;  overflow: auto;}">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data='tableList'
        empty-text='暂无数据'
        class='el_tab_alage'
        :row-key='getRowKeys'
        @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" :reserve-selection="true" width="50" align="center"></el-table-column> -->
         <el-table-column label="" min-width="30" align="center">
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
       </div>
    </el-dialog>
  </div>
</template>
<script>
import { feedList, findAllSignature, feedbackInsert,attachmentDelete, findAttachments, attachmentDeleteByFeedbackId } from '@/api/feeds'
import editor from '@/components/editor/wangEditor'
import pagination from '@/components/table/Pagination.vue'
import { getToken } from '@/utils/auth'
import { sessionStorageGet } from '@/utils/storage'
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
        administrativeDivision: '',
        applicant: '',
        deptName: '',
        tel: '',
        idNumber: '',
        createTime: '',
        isTemplate: '',
        fileName: '',
      },
      ruleForm: {
        isTemplate: '',
        fileName: '',
      },
      prove: '',
      isTemplate: false,
      limit: 5,
      action: process.env.VUE_APP_BASE_API  + '/service/file/proveUpload',
      headers:{
        Authorization : 'token ' + getToken(),
      },
      rules: {
        isTemplate: [{ required: true, message: "请选择反馈模板", trigger: ['change', 'blur']}],
        fileName: [{ required: true, message: "请上传附件", trigger:['change', 'blur'] }],
      },
      ruless: {
        fileName: [{ required: true, message: "请上传附件", trigger:['change', 'blur'] }],
      },
      datas:{
        id: this.$route.query.id
      },
      fileList: [],
      radio: '',
      total: 0,
      pageSize: '20',
      currentPage: '1',
      isShow: false,
      url:'',
      imgId: '',
      isApproval: '',
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
              width: '180'
            }
          ],
          data: []
        }
      },
    };
  },

  mounted() {
    let id = this.$route.query.id;
    feedList({ id }).then((res) => {
      this.formInline = res.data.data.feedbackRecord
      this.$refs.editor.setContent(res.data.data.feedbackRecord.prove)
      this.ruleForm.isTemplate = res.data.data.feedbackRecord.isTemplate
      if(this.formInline.isTemplate === '1'){
         this.isTemplate = false
      }else{
         this.isTemplate =  true 
      }
    });
    findAttachments({ id }).then((res) => {
      console.log( res.data.data)
       res.data.data.forEach((item,index) =>{
          this.fileList.push({name: item.fileName, url:item.url, id:item.id}) 
      });
      
    });
  },
  methods: {
    stateData() {},
    // returnClick() {
    //   this.$router.push("/feedback/feedback");
    // },
    handleSuccess (response, file, fileList) {
      this.fileList = fileList
      if(fileList[0].response.fileName !== '' ){
      this.ruleForm.fileName  = fileList[0].response.fileName
      this.$refs['uploadImg'].clearValidate()
      } else {
      //  this.$message.error(fileList[0].response.msg)
      }
     },
    cancel () {
      this.currentPage = 1
      this.radio = ''
      // this.$refs.multipleTable.clearSelection()
      this.isShow = false
    },
    submit () {
      this.$refs.editor.putBack(this.url, this.isApproval)
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
     this.isApproval = row.isApproval
     this.imgId = row.id
    },
    pageChange(item) {
      this.pageSize = item.limit
      this.currentPage = item.page
      this.commandTypeFindRoles()
    },
    roleClick () {
      this.isShow = true
      this.commandTypeFindRoles()
    },

    async commandTypeFindRoles () {
      let data = {
        page: this.currentPage,
        size: this.pageSize
      }
      const res = await findAllSignature(data)
      res.data.data.content.forEach(item => {
        item.url = process.env.VUE_APP_FILE_API + item.url
        if(item.isApproval === '0'){
          item.isApproval = '否'
        }else if(item.isApproval === '1'){
          item.isApproval = '是'
        }
      });
      this.tableList= res.data.data.content
      this.total = res.data.data.totalElements
      if(this.tableList.length === 0){
        this.$message.warning('请联系相关组织机构管理员先上传电子签章')
      }
    },
    herror(error, file, fileList){
      const result = JSON.parse(error.message);
      this.$message.error('上传失败:' + result.msg)
    },
    choose () {
      if(this.ruleForm.isTemplate === '1' && this.fileList.length > 0 ){
         this.ruleForm.isTemplate = '0'
         return this.$message.error('请先删除上传文件') 
      }
      this.isTemplate = this.ruleForm.isTemplate === '1' ? false : true
    },
    handlePreview (file) {
      console.log(file)
    },
    before (file) {
      let arr = 'doc docx pdf png jpg jpeg'
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      if(arr.indexOf(testmsg) === -1){
        this.$message.warning('上传文件只能是 doc、docx、pdf、png、jpg、jpeg格式')
        return false
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制只能选择`+ this.limit +`个文件`)
    },
    beforeRemove (file, fileList) {  
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    async handleRemove(file, fileList){
      console.log(file)
      const that = this
      that.Loading = true
      let datas = {
        attachmentId: ''
      }
      if(file.hasOwnProperty('response') || file.response!==undefined){
        datas.attachmentId = file.response.id
      }else{
        datas.attachmentId = file.id
      }
      const response = await attachmentDelete(datas)
      that.Loading = false
      if (response.data.code === 1) {
        that.$message.success('删除成功')
        this.fileList = fileList
      } else {
        that.$message.error(response.data.msg)
          return false
      }
    },
     async deAllRemove(){
      const that = this
      that.Loading = true
      let datas = {
        feedbackId: this.$route.query.id
      }
      const response = await attachmentDeleteByFeedbackId(datas)
      that.Loading = false
      if (response.data.code === 1) {
          this.$router.push("/feedback/feedback");
      } else {
        that.$message.error(response.data.msg)
          return false
      }
    },
    SuretoAddClick (formInline) {
      const that = this
      that.$refs[formInline].validate((index) => {
        if (index === false) {
          return false
        }
        // Object.entries(that.formInline).map((a, b) => {
        //   if (a[0] === 'id') {
        //     delete that.formInline[a[0]]
        //   }
        // })
       this.add(this.formInline)
      })
    },
     async add(data) {
      const that = this
      // POST请求添加轮播图数据
      if(that.isTemplate === true){
        that.$refs.editor.clear()
      }
      let editors = document.getElementById('editor');
      if(that.isTemplate === false && this.hasClass(editors,'imgDic').length !== 1){
        if(this.hasClass(editors,'imgDic').length === 0){
           return that.$message.warning('请先选择电子签章')
        } else {
          return that.$message.warning('只能选取一枚电子签章')
        }
      }
      let da = {}
      da.id = data.id
      da.feedback = data.feedback
      let prove = that.$refs.editor.htmlContent().html.replace('<t></t>','</img>')
      da.prove = prove
      da.isTemplate = that.ruleForm.isTemplate
      da.left = sessionStorageGet('left')
      da.electronicSignatureId = that.imgId 
      that.loading = true
      const response = await feedbackInsert(da)
      that.loading = false
      if (response.data.code === 1) {
        // 添加成功后 回调效果
        that.$message.success(response.data.msg)
        this.$router.push("/feedback/feedback");
        /**
         * 清空表单元素 重置验证信息.
         * @param imageUrl
         * @param detail
         */
        // that.ClearTextConeten()
        // 重新触发父组件加载loading
        // that.$emit('Reload')
      } else {
        // 添加上传失败后 回调失败信息
        that.$message.error(response.data.msg)
        return false
      }
    },
    hasClass(oParent,aClass){
      let result = []
      let aEle = document.getElementsByTagName('*')  　　　　　　　　　　　　　　　　
　　   for(let i=0;i<aEle.length;i++){　　　　　　　　　　　  
　　　　if(aEle[i].className == aClass){　　　　　　　　  
　　　　　　result.push(aEle[i])　　　　　　　　　　　　　  
　　　　}
      }
　　  return result;
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
  .el-upload__tip{
    color: red;
  }
 
}
</style>