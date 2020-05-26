<template>
  <el-form
    ref="loginForm"
    class="login-form"
    status-icon
    :rules="loginRules"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="userName">
      <el-input
        v-model="loginForm.userName"
        size="small"
        auto-complete="off"
        placeholder="请输入用户名"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="prefix"
          class="icon-yonghu"
        />
      </el-input>
    </el-form-item>
    <el-form-item prop="userPwd">
      <el-input
        v-model="loginForm.userPwd"
        size="small"
        :type="passwordType"
        auto-complete="off"
        placeholder="请输入密码"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        />
        <i
          slot="prefix"
          class="icon-mima"
        />
      </el-input>
    </el-form-item>
    <el-form-item prop="verifyCode">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input
            v-model="loginForm.verifyCode"
            size="small"
            auto-complete="off"
            placeholder="请输入验证码"
            @keyup.enter.native="handleLogin"
          >
            <i
              slot="suffix"
              class="el-icon-view el-input__icon"
              @click="showPassword"
            />
            <i
              slot="prefix"
              class="icon-mima"
            />
          </el-input>
        </el-col>
        <el-col :span="8">
          <span class="u-code" @click="getCodeHandler">{{ verifyCode }}</span>
        </el-col>
      </el-row>
    </el-form-item>
    <div class="u-line-1px" />
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCode } from '@/api/login'
export default {
  name: 'Userlogin',
  props: [],
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: 'bbbbbb',
        userPwd: '123456',
        verifyCode: ''
      },
      verifyCode: '',
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
      passwordType: 'password'
    }
  },
  computed: {
  },
  created() {
    this.getCodeHandler()
  },
  mounted() { },
  methods: {
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    getCodeHandler() {
      getCode().then((res) => {
        const { verifyCode } = res.data
        this.verifyCode = verifyCode
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.$router.push({ path: '/' })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.u-code {
  display: inline-block;
  width: 100%;
  background: rgb(11, 175, 175);
  text-align: center;
  font-weight: bold;
  letter-spacing: 5px;
  border-radius: 5px;
}
.u-line-1px {
  margin: 10px 0;
  width: 100%;
  height: 0;
  border-top: 1px solid #e7e7e7;
  margin-top: 20px;
}
</style>
