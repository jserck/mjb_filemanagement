import { param2Obj } from '@/utils'

const userMap = {
  accountList: {
    code: 0,
    fileRoleName: '我是编辑',
    remarks: '1111',
    fileAdd: 1,
    fileEdit: 1,
    fileRead: 1,
    fileDistribution: 1,
    fileLog: 1,
    accountManage: 1,
    roleManage: 1,
    editPwd: 1,
    fileType: 1,
    token: 'accountList',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    userName: 'Normal accountList',
    userId: '1',
    roleId: '1'
  }
}
export default {
  // 登录
  loginByUsername: config => {
    const { userName } = JSON.parse(config.body)
    return userMap[userName]
  },
  getUserInfo: config => {
    // 获取用户权限
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    // 登出
    return {
      code: 0,
      Message: 'success'
    }
  },
  getCode: () => {
    // 获取验证码
    return {
      code: 0,
      verifyCode: '1234'
    }
  }
}
