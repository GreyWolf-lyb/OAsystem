<template>
  <div :class="editor_rule">
    <div ref="toolbar" class="toolbar"></div>
     <!-- <el-button type="primary" @click="putBack">确 定</el-button> -->
    <div id="editor" ref="editor" class="text"></div>
  </div>

</template>

<script>
import E from 'wangeditor'
import { getScrollPosition } from '@/utils/browser'
import { sessionStorageSet } from '@/utils/storage'
export default {
  data () {
    return {
      editor: null,
      info_: null,
      editor_rule: 'editor'
    }
  },

  mounted () {
    this.seteditor()
  },

  methods: {
    seteditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      // base 64 存储图片
      this.editor.customConfig.uploadImgShowBase64 = true
      // 配置服务器端地址
      // this.editor.customConfig.uploadImgServer = 'http://otp.cdinfotech.top/file/upload_images'
      // 自定义 header
      this.editor.customConfig.uploadImgHeaders = { }
      // 后端接受上传文件的参数名
      // this.editor.customConfig.uploadFileName = 'file'
      // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 1
      // 设置超时时间
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000
      this.editor.customConfig.zIndex = '0'

      // 配置菜单
      this.editor.customConfig.menus = ['head', 'bold', 'fontSize', 'fontName',
        'italic', 'underline', 'strikeThrough', 'foreColor',
        'backColor', 'link', 'list', 'justify', 'quote',
        'emoticon', 'table', 'video'
      ]

      this.editor.customConfig.uploadImgHooks = {
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          // let url = 'http://otp.cdinfotech.top/' + result.url
          // insertImg(url)
        }
      }

      this.editor.customConfig.onchange = (html) => {
        this.editor_rule = 'editor'
        this.$emit('monitor')
      }

      // 创建富文本编辑器
      this.editor.create()
    },
    
    htmlContent () {
      return {
        text: this.editor.txt.text(),
        html: this.editor.txt.html()
      }
    },
    clear() {
      this.editor.txt.clear()
    },
    putBack(url, isApproval){
       let i = document.createElement("div");
       i.style.width = '100px';
       i.setAttribute("class","imgDic");
       if(isApproval === '是'){
          i.style.display = 'inline-block'
       }else{
          i.style.display = 'inline-block'
       }
      //  i.style.absolute = 'absolute'
      //  i.style.display = 'inline-block'
       i.style.height = '100px';
       i.style.marginTop = - 150 + 'px';
       i.style.marginLeft = this.deleteTextNode('editor')[0].scrollWidth - 150 + 'px';
       sessionStorageSet('left',this.deleteTextNode('editor')[0].scrollWidth - 150 + 'px')
      //  let img = document.createElement("img");
      //   img.setAttribute('src', url)
      //   img.style.maxWidth = '100%'
      //   img.style.maxHeight = '100%'
      //   i.appendChild(img)
      //   console.log(img)
       let strImg =  `<img src= ${url} style="max-width:100%;max-width:100%;"><t>`
       i.innerHTML = strImg
       this.editor.txt.append(i)
      //  let range = window.getSelection().getRangeAt(0)
      //  range.insertNode(i)
      //  range.setStartAfter(i, 0)
    },
    setContent (value) {
      this.editor.txt.clear()
      this.editor.txt.html(value)
    },
    setStyle (row) {
      this.editor_rule = 'editors'
    },
    deleteTextNode(id) {
      var _elem = document.getElementById(id)
      var _child = _elem.childNodes
      for ( var i = 0; i < _child.length; i++) {
        if (_child[i].nodeName === "#text") {
            _elem.removeChild(_elem.childNodes[i]);
        }
      }
      return _child;
    }
  }
}
</script>

<style lang="scss">
  // #editor{
  //   margin-top: 20px;
  // }
  @import '../styles/wangEditor.scss';
</style>