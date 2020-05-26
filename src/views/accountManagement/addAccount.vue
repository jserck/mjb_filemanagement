<template>
  <section class="m_putPossWord">
    <el-form ref="accountForms" :model="filters" :rules="addAccountRules" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col :span="15">
          <el-form-item prop="userName" label="账户名">
            <el-input v-model="filters.userName" placeholder="输入账户名" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item prop="staffName" label="员工姓名">
            <el-input v-model="filters.staffName" placeholder="输入员工姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item prop="department" label="所在部门">
            <el-input v-model="filters.department" placeholder="输入所在部门" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item prop="roleName" label="角色">
            <QuerySearch
              :role-name="filters.roleName"
              http-name="roleQueryList"
              place-text="输入角色名称关键字"
              @roleNameChange="roleNameChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item :prop="$route.query.type === 'edit'?'': 'userPwd'" label="密码">
            <el-input v-model="filters.userPwd" :disabled="$route.query.type === 'edit'" type="password" placeholder="输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item :prop="$route.query.type === 'edit'?'': 'newPassword'" label="确认新密码">
            <el-input v-model="filters.newPassword" :disabled="$route.query.type === 'edit'" type="password" placeholder="确认新密码" />
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item prop="remarks" label="备注">
            <el-input
              v-model="filters.remarks"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="onSubmit('accountForms')">确认</el-button>
        </el-col>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="handleAdd">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import { editFileUser, getFileUserInfo } from '@/api/accountManage'
import QuerySearch from '@/views/common/querySearch'
export default {
  components: {
    QuerySearch
  },
  data() {
    const newPasswordRule = (rule, value, callBack) => {
      if (value !== this.filters.userPwd) {
        callBack(new Error('两次密码输入不一致,请确认'))
      } else {
        callBack()
      }
    }
    return {
      filters: {
        userName: '',
        userId: '',
        roleName: '',
        staffName: '',
        department: '',
        userPwd: '',
        newPassword: '',
        remarks: '',
        opType: this.$route.query.type === 'edit' ? 2 : 1,
        roleId: null
      },
      addAccountRules: {
        userName: [
          { required: true, message: '请填写账户名', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请填写正确的角色名', trigger: 'blur' }
        ],
        staffName: [
          { required: true, message: '请填写员工姓名', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请填写部门', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          { validator: newPasswordRule, trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEditFrom()
  },
  methods: {
    getEditFrom() {
      if (this.$route.query.type === 'add') return
      const userId = this.$route.query.userId || ''
      getFileUserInfo({ userId }).then(res => {
        this.filters = res.data
      })
    },
    handleAdd() {
      this.$router.go(-1)
    },
    roleNameChange(data) {
      // 角色选择变化监听
      console.log(data)
      if (typeof data === 'object') {
        ({ value: this.filters.roleName, address: this.filters.roleId } = data)
      } else {
        this.filters.roleName = ''
        this.filters.roleId = ''
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.filters.opType) {
            this.filters.opType = this.$route.query.type === 'edit' ? 2 : 1
          }
          editFileUser(this.filters).then((res) => {
            this.$message({
              type: 'success',
              message: res.message || 'success'
            })
            this.handleAdd()
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
