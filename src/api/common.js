import request from '@/utils/request'

/**
 * 获取角色列表 模糊搜索
 */
export function roleQueryList() {
  return request({
    url: '/fileRole/roleQueryList',
    method: 'post',
    data: {}
  })
}
/**
 * 获取账户列表 模糊搜索
 */
export function getFileUserQueryList() {
  return request({
    url: '/fileUser/getFileUserQueryList',
    method: 'post',
    data: {}
  })
}
/**
 * 获取文件种类列表 模糊搜索
 */
export function getFileTypeQueryList() {
  return request({
    url: '/fileManage/getFileTypeQueryList',
    method: 'post',
    data: {}
  })
}

