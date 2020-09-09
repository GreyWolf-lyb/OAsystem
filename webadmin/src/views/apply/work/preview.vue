<template>
  <div class="template-page">
    <div class="template-html" v-html="template"></div>
    <div class="template-btn">
      <el-button type="primary" @click="returnClick">返 回</el-button>
    </div>
  </div>
</template>
<script>
import { applyTemplateByTemplateApi } from "@/api/work.js";
export default {
  data() {
    return {
      template: "",
    };
  },
  mounted() {
    let id = this.$route.query.templateId;
    applyTemplateByTemplateApi({ templateId: id }).then((res) => {
      if (res.data.code === 1) {
        this.template = res.data.data.template;
      }
    });
  },
  methods: {
    returnClick() {
      this.$router.push({
        name: "WorkPage",
        path: "/apply/workPage",
        query: this.$route.query,
        params: this.$route.params,
      });
    },
  },
};
</script>
<style lang="scss" scope>
.template-page {
  padding: 20px;
  box-sizing: border-box;
  .template-html {
    min-height: 400px;
  }
  .template-btn {
    display: flex;
    justify-content: center;
  }
}
</style>