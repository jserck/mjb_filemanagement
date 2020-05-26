import request from '@/utils/request'

export function login(username, password, verifyCode) {
  // 登录
  return request({
    url: '/fileUser/login',
    method: 'post',
    data: {
      userName: username,
      userPwd: password,
      verifyCode
    }
  })
}

export function getInfo(roleId) {
  // 获取用户权限
  return request({
    url: '/fileRole/roleAuthorityList',
    method: 'post',
    data: { roleId }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getCode() {
  // 获取登录验证码
  return request({
    url: '/fileUser/verifyCode',
    method: 'get'
  })
}
export function putPassWord(data) {
  // 修改密码
  return request({
    url: '/fileUser/editUserPwd',
    method: 'post',
    data
  })
}
