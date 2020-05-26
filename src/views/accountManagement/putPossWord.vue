<template>
  <section class="m_putPossWord">
    <el-form ref="putForms" :inline="true" :model="filters" label-width="100px" :rules="putRules" @submit.native.prevent>
      <el-row>
        <el-col>
          <el-form-item prop="userPwd" label="原始密码">
            <el-input v-model="filters.userPwd" type="password" show-password placeholder="输入原始密码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newPwd" label="新密码">
            <el-input v-model="filters.newPwd" type="password" show-password placeholder="输入新密码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="newPwdsTure" label="确认新密码">
            <el-input v-model="filters.newPwdsTure" type="password" show-password placeholder="确认新密码" />
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
  </section>
</template>
<script>
import { putPassWord } from '@/api/login'
export default {
  data() {
    const newPwdsTureRule = (rule, value, callBack) => {
      if (value !== this.filters.newPwd) {
        callBack(new Error('两次密码输入不一致,请确认'))
      } else {
        callBack()
      }
    }
    const newPwdRule = (rule, value, callBack) => {
      if (value === this.filters.userPwd) {
        callBack(new Error('新密码请不要与原来的密码相同'))
      } else {
        callBack()
      }
    }
    return {
      filters: { newPwd: '', userPwd: '', newPwdsTure: '' },
      putRules: {
        userPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: newPwdRule, trigger: 'blur' }
        ],
        newPwdsTure: [
          { required: true, message: '请再次确认新密码', triger: 'blur' },
          { validator: newPwdsTureRule, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAdd() {
      this.$router.go(-1)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          putPassWord(this.filters).then((res) => {
            this.$message({
              message: res.message || 'success',
              type: 'success'
            })
            this.handleAdd()
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
