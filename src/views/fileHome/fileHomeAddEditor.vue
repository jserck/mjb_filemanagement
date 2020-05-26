<template>
  <section class="m_putPossWord">
    <el-form
      ref="putForms"
      v-loading="loading"
      :inline="true"
      :model="filters"
      label-width="100px"
      :rules="putRules"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @submit.native.prevent
    >
      <el-row>
        <el-col>
          <el-form-item prop="fileName" label="名称">
            <el-input v-model="filters.fileName" :disabled="isSee" placeholder="输入名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="name" label="合同内容">
            <el-upload
              :disabled="isSee"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="imgPreview"
              multiple
              accept=".jpg,.png,.jpeg"
              :on-remove="handleRemove"
              :before-upload="beforeUploadHandler"
              enctype="multipart/form-data"
              :auto-upload="false"
              :on-error="uploadError"
              :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in filters.columnList" :key="index">
        <el-col>
          <el-form-item
            :prop="'columnList.' + index + '.columnValue'"
            :label="item.columnName"
            :rules="{
              required: true, message: `当前选项不能为空`, trigger: 'blur'
            }"
          >
            <el-input v-if="item.columnType === 1" v-model="item.columnValue" :disabled="isSee" :placeholder="`输入${item.columnName}`" />
            <TimePicker
              v-else
              :value="item.columnValue"
              :disableds="isSee"
              @timeChangeHandler="timeChangeHandler($event,index)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="是否审批">
            <el-radio-group v-model="filters.isExamine" :disabled="isSee">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="onSubmit('putForms')">确认</el-button>
        </el-col>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="handleAdd">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>
<script>
import { getFileInfo, addFileItem } from '@/api/fileHome'
import { uploadUrl } from '@/utils/index'
import TimePicker from '@/views/common/timePicker'
import Axios from 'axios'
export default {
  components: {
    TimePicker
  },
  data() {
    return {
      loading: false,
      isSee: this.$route.query.type === 'see',
      dialogImageUrl: '',
      dialogVisible: false,
      filters: { fileName: '', isExamine: 1, columnList: [], silderimgList: [] },
      putRules: {
        fileName: [
          { required: true, message: '当前选项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initConditionList()
  },
  methods: {
    initConditionList() {
      if (this.$route.query.type !== 'add') {
        const body = {
          fileTypeId: this.$route.query.fileTypeId,
          fileId: this.$route.query.fileId
        }
        getFileInfo(body).then(res => {
          this.filters = res.data
          console.log(res.data)
        })
      } else {
        const columnList = JSON.parse(this.$route.query.conditionObj).conditionList
        this.filters.columnList = columnList
      }
    },
    handleAdd() {
      this.$router.go(-1)
    },
    beforeAvatarUpload(event, file, fileList) {
    //   const loadProgress = Math.floor(event.percent) // 这就是当前上传的进度
      console.log('进度', event)
      // 可以进行其他逻辑
    },
    // 图片上传事件
    imgPreview(file, fileList) {
      const fileName = file.name
      const regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.dialogImageUrl = file.url
      } else {
        this.$message.error('请选择图片文件')
      }
      this.filters.silderimgList = []
      for (let i = 0; i < fileList.length; i++) {
        let obj = {}
        obj = fileList[i].raw
        this.filters.silderimgList.push(obj)
      }
      this.filters.name = fileList[0].raw
    },
    beforeUploadHandler() {
    },
    handleRemove(file, fileList) {
      this.filters.silderimgList = []
      for (let i = 0; i < fileList.length; i++) {
        let str = ''
        str = fileList[i].raw
        this.filters.silderimgList.push(str)
      }
      this.$message.success(`已成功删除${file.name}`)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadError() {
      // 上传失败回调
      this.$message.error('上传失败，请重新上传')
    },
    handleAvatarSuccess() {
      // 上传成功回调
      this.$message.success('上传完成')
    },
    timeChangeHandler(time, index) {
      this.filters.columnList[index].columnValue = time
    },
    getimg() {
      const that = this
      const formData = new FormData()
      for (let i = 0; i < this.filters.silderimgList.length; i++) {
        formData.append('files', that.filters.silderimgList[i])
      }
      formData.append('fileTypeId', this.$route.query.fileTypeId)
      formData.append('fileName', this.filters.fileName)
      formData.append('isExamine', this.filters.isExamine)
      formData.append('columnList', JSON.stringify(this.filters.columnList))
      // 上传服务器的api
      Axios({
        method: 'post', // 指定请求方式
        // url: uploadUrl('/fileManage/addFileItem'), // 请求接口
        url: 'http://47.95.233.255:8788/sxzy-api-1.0-SNAPSHOT/fileManage/addFileItem',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        },
        data: formData
      }).then(function(res) {
        if (res.data.code === 0) {
          that.$message({
            message: '成功',
            type: 'success',
            duration: 1500
          })
        } else {
          that.$message.error(res.data.message)
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.getimg()
          addFileItem(this.filters).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .m_putPossWord{
        padding: 20px;
    }
</style>
