<template>
  <section class="m_filel_addContainer">
    <el-form ref="fileTypeAddForms" :inline="true" :rules="addRules" :model="typeFrom">
      <el-row>
        <el-col>
          <el-form-item label="文件类型" prop="columnName" label-width="100px">
            <el-input v-model="typeFrom.columnName" :disabled="isDisable" auto-complete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="内容设置" prop="columnList" label-width="100px">
            <el-tag
              v-for="(item,index) in typeFrom.columnList"
              :key="index"
              :hit="true"
              :closable="!isDisable && (!item.delStatus || item.delStatus === 1)"
              style="margin-right:10px"
              effect="dark"
              @close="fnCloseTags(index,item)"
            >
              {{ item.columnName||'--' }}
            </el-tag>
            <el-input v-if="typeFrom.columnList.length === 0" disabled placeholder="当前内容是空" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isDisable">
        <el-col>
          <el-form-item label="内容名称" label-width="100px">
            <el-input v-model="tagName" auto-complete="off" />
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="checkList" @change="checkListChange">
              <el-checkbox label="必填项" />
              <el-checkbox label="时间格式" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left:10px" @click="onPushTags">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isDisable">
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="onSubmit('fileTypeAddForms')">提交</el-button>
        </el-col>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="handleAdd">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import {
  addFileTypeList,
  editFileTypeList,
  getFileTypeForm
} from '@/api/fileType'
export default {
  data() {
    const columnList = (rule, value, callBack) => {
      if (this.typeFrom.columnList.length === 0) {
        callBack(new Error('请添加内容'))
      } else {
        callBack()
      }
    }
    return {
      seeType: this.$route.query.type,
      isDisable: this.$route.query.type === 'see',
      typeFrom: {
        columnName: '',
        columnList: []
      },
      filters: {
        columnName: '',
        isMust: 2,
        columnType: 1
      },
      tagName: '',
      checkList: [],
      items: [],
      addRules: {
        fileTypeName: [
          { required: true, message: '请输入文件类型', trigger: 'blur' }
        ],
        columnList: [
          { validator: columnList, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.type !== 'add') {
      this.getFileTypeForms()
    }
  },
  methods: {
    getFileTypeForms() {
      const body = {
        fileTypeId: this.$route.query.fileTypeId,
        fileTypeName: this.$route.query.fileTypeName
      }
      getFileTypeForm(body).then(res => {
        console.log(res)
        this.typeFrom = res.data
      })
    },
    fnCloseTags(index, item) {
      this.typeFrom.columnList.splice(index, 1)
    },
    checkListChange(val) {
      this.filters.columnName = ''
      this.filters.isMust = this.checkList.includes('必填项') ? 1 : 2
      this.filters.columnType = this.checkList.includes('时间格式') ? 2 : 1
    },
    onPushTags() {
      if (this.tagName.trim() === '') {
        this.$message({
          type: 'warning',
          message: '内容名称不能为空'
        })
        return
      }
      this.filters.columnName = this.tagName
      const obj = Object.assign({}, this.filters)
      this.typeFrom.columnList.push(obj)
      this.tagName = ''
    },
    handleAdd() {
      this.$router.go(-1)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.seeType === 'edit') {
            editFileTypeList(this.typeFrom).then((res) => {
              this.$message({
                type: 'success',
                message: res.message || 'success'
              })
              this.handleAdd()
            })
          } else if (this.seeType === 'add') {
            addFileTypeList(this.typeFrom).then((res) => {
              this.$message({
                type: 'success',
                message: res.message || 'success'
              })
              this.handleAdd()
            })
          }
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
.m_filel_addContainer{
    padding: 20px;
}
</style>
