import request from '@/utils/request'

/**
 * 添加角色
 * @param {{}} addRoleFrom // 表单数据
 */
export function addRole(addRoleFrom) {
  return request({
    url: '/fileRole/addFileRole',
    method: 'post',
    data: addRoleFrom
  })
}
/**
 * 获取角色列表
 * @param {{}} roleList // 表单数据
 */
export function getRoleList(roleList) {
  return request({
    url: '/fileRole/getRoleList',
    method: 'post',
    data: roleList
  })
}
/**
 * 删除角色
 * @param {{}} roleId // 表单数据
 */
export function removeRole(roleId) {
  return request({
    url: '/fileRole/del',
    method: 'post',
    data: roleId
  })
}
/**
 * 账户查询列表
 * @param {{}} accListFrom // 表单数据
 */
export function getFileUserList(accListFrom) {
  return request({
    url: '/fileUser/getFileUserList',
    method: 'post',
    data: accListFrom
  })
}
/**
 * 获取账户信息
 * @param {{}} accListFrom // 表单数据
 */
export function getFileUserInfo(accListFrom) {
  return request({
    url: '/fileUser/getFileUserInfo',
    method: 'post',
    data: accListFrom
  })
}
/**
 * 添加编辑账户
 * @param {{}}  id // 表单数据
 */
export function editFileUser(accFrom) {
  return request({
    url: '/fileUser/editFileUser',
    method: 'post',
    data: accFrom
  })
}
/**
 * 禁用/恢复账号
 * @param {{}}  id // 表单数据
 */
export function setUserStatus(accFrom) {
  return request({
    url: '/fileUser/setUserStatus',
    method: 'post',
    data: accFrom
  })
}
