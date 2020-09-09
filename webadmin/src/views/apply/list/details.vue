<template>
  <div class="list-details-page">
    <div class="apply-information">
      <span class="tips-title">申请信息</span>
      <el-form :inline="true" :model="formInline" label-width="130px" class="demo-form-inline">
        <el-form-item label="办理事项名称：">
          <el-input size="medium" v-model="formInline.itemName" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请人：">
          <el-input size="medium" v-model="formInline.applicant" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input size="medium" v-model="formInline.tel" disabled></el-input>
        </el-form-item>
        <el-form-item label="发起人：">
          <el-input size="medium" v-model="formInline.createByName" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="formInline.status==1||formInline.status==2" :label="formInline.status==1?'反馈时间：':'终止时间：'">
          <el-input size="medium" v-model="formInline.feedbackDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="发起时间：">
          <el-input size="medium" v-model="formInline.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input size="medium" :value="formInline.status==0?'待反馈':formInline.status==1?'已反馈':'已终止'" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <el-input size="medium" v-model="formInline.idNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：">
          <el-input size="medium" v-model="formInline.email" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="apply-information" style="margin-top:30px">
      <span class="tips-title">反馈信息</span>
      <div class="information-item" v-for="item in formInline.feedbackRecords" :key="item.applyId">
        <div class="active-item-style"></div>
        <div class="item-data-text">
          <p>反馈组织机构：<span>{{item.organizationName}}</span></p>
          <p>反馈结果：
            <span v-if="item.status==0">待反馈</span>
            <span v-if="item.status==1">已反馈</span>
            <span v-if="item.status==2">已退回</span>
            <span v-if="item.status==3">已终止</span>
            <span v-if="item.status==4">待用章审批</span>
          </p>
          <p>反馈时间：<span>{{item.feedbackDate?format(item.feedbackDate):'---'}}</span></p>
          <p>反馈意见：<span>{{item.feedback?item.feedback:'---'}}</span></p>
          <p class="prove-list">
            反馈证明：
            <ul>
              <li v-if="!item.attachments">---</li>
              <li v-for="items in item.attachments" :key="items.id">
                <span  @click="previewClick(items.url)">{{items.fileName}}</span>
                <el-button style="margin-left:15px" @click="downloadClick(items.url)" type="primary" plain size="mini">下载</el-button>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
    <div class="return-button">
      <el-button type="primary" @click="returnClick">返 回</el-button>
    </div>
  </div>
</template>
<script>
import { applyDeletelApi } from "@/api/applyList";
export default {
  data() {
    return {
      formInline: {},
    };
  },
  mounted() {
    let id = this.$route.query.id;
    applyDeletelApi({ id }).then((res) => {
      this.formInline = res.data.data;
    });
    // window.addEventListener('hashchange', () => {
    //   let currentPath = window.location.hash.slice(1);
    //   if (this.$route.fullPath !== currentPath) {
    //       this.$router.push(currentPath);
    //   }
    // }, false);

  },
  methods: {
    add0(m){return m<10?'0'+m:m },
    format(shijianchuo){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    },
    previewClick(url) {
      // window.open("http://47.105.140.86/fileView/onlinePreview?url="+url)
      window.open('http://47.105.96.207/fileView/onlinePreview?url='+encodeURI(url))
      // document.location.href = "http://47.105.140.86/fileView/onlinePreview?url="+url
      //  var a = document.createElement("a"); //创建a标签
      //   a.setAttribute("href", url);
      //   a.setAttribute("target", "_blank");
      //   document.body.appendChild(a);
      //   a.click(); //执行当前对象
      // window.open("http://47.105.140.86/fileView/onlinePreview?url="+url, '_blank').location;
    },

    downloadClick(url){
      window.location.href=url;
    },
    returnClick() {
      this.$router.push("/apply/list");
    },
  },
};
</script>
<style lang="scss" scope>
.list-details-page {
  padding: 30px;
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
        font-size: 14px;
        font-weight: bold;
        color: #606266;
        p span{
          font-weight: normal;
        }
        .prove-list {
          display: flex;
          ul,
          li {
            padding: 0;
            margin: 0;
            margin-top: -6px;
            line-height: 40px;
            list-style: none;
            color: #4b93fa;
            cursor:pointer;
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
}
</style>