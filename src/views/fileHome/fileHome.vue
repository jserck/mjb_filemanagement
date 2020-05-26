<template>
  <section class="m_fileHome">
    <div
      v-loading="loading"
      class="row_container"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-row v-if="fileList.length > 0" class="row-bg" :gutter="20">
        <el-col v-for="(item,index) in fileList" :key="index" style="margin-top:20px" :span="6">
          <el-card shadow="hover" :style="`background:${item.color_};max-width:280px`" @click.native="fnPushHandler(item)">
            <span>文件类型：</span>
            <h3>{{ item.fileTypeTile }}</h3>
            <p>文件数量：{{ item.fileCount }}</p>
          </el-card>
        </el-col>
      </el-row>
      <p v-else>暂无任何文件类型</p>
    </div>
  </section>
</template>
<script>
import { getFileHeadList } from '@/api/fileHome'
export default {
  name: 'Report',
  components: {},
  data() {
    return {
      fileList: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.fnGetFileList()
  },
  mounted() {},
  methods: {
    fnPushHandler(item) {
      this.$router.push({
        path: '/fileHome/fileHomeListSee',
        query: {
          fileTypeId: item.fileTypeId,
          fileTypeName: item.fileTypeTile
        }
      })
    },
    fnGetFileList() {
      /**
     * 处理列表背景
     * @param arr //目标数组
     * @returns {[]} //
     */
      function setBgColor(arrs = []) {
        const arr = arrs
        const fileHomeColorArr = this.$store.getters.website.fileHomeColor
        const arrLen = arr.length || 0
        const colorLen = fileHomeColorArr.length || 0
        if (arrLen <= colorLen) {
          arr.map((item, index) => {
            item.color_ = fileHomeColorArr[index]
          })
        } else {
          let num = 0
          arr.map((item, index) => {
            if (!fileHomeColorArr[num]) {
              num = 0
              item.color_ = fileHomeColorArr[num]
            }
            item.color_ = fileHomeColorArr[num]
            num++
          })
        }
        return arr
      }
      this.loading = true
      getFileHeadList().then((res) => {
        this.loading = false
        this.fileList = setBgColor.apply(this, [res.data.fileList])
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>
<style lang ="scss" scoped>
  .m_fileHome{
    padding: 20px;
  }
  .m_fileHome .row_container{
      margin: auto;
      max-width: 1020px;
      min-height: 500px;
  }
</style>
<style lang="scss">
.m_fileHome{
  .el-card__body{
    position: relative;
    position: relative;
    margin: 0;
    padding:0 10px;
    padding-bottom: 15px;
      color: #fff;
      span{
        font-size: 14px;
      }
      h3{
        font-size: 24px;
        line-height: 40px;
      }
      p{
        margin-top: 5px;
        font-size: 12px;
      }
  }
}
</style>
