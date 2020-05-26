import request from '@/utils/request'

/**
 * 获取文件类型列表
 */
export function getFileHeadList() {
  return request({
    url: '/fileManage/getFileHeadList',
    method: 'post',
    data: {}
  })
}
/**
 * 获取当前种类文件列表
 */
export function getCurentTypeFileList(data) {
  return request({
    url: '/fileManage/getFileList',
    method: 'post',
    data: data
  })
}
/**
 * 获取当前种类文件查询列表
 */
export function getFileQueryList(data) {
  return request({
    url: '/fileManage/getFileQueryList',
    method: 'post',
    data: data
  })
}
/**
 * 添加文件
 */
export function addFileItem(data) {
  return request({
    url: '/fileManage/addFileItem',
    method: 'post',
    data: data
  })
}
/**
 * 获取当前种类文件详情
 */
export function getFileInfo(data) {
  return request({
    url: '/fileManage/getFileInfo',
    method: 'post',
    data: data
  })
}
/**
 * 分配权限
 */
export function assignRulesForm(data) {
  return request({
    url: '/fileManage/addFileSee',
    method: 'post',
    data: data
  })
}
/**
 * 获取权限记录
 */
export function getFileSeeList(data) {
  return request({
    url: '/fileManage/getFileSeeList',
    method: 'post',
    data: data
  })
}
/**
 * 获取查看记录
 */
export function getFileReadList(data) {
  return request({
    url: '/fileManage/getFileReadList',
    method: 'post',
    data: data
  })
}
/**
 * 终止或者开通权限
 */
export function stopUserFileSee(data) {
  return request({
    url: '/fileManage/stopUserFileSee',
    method: 'post',
    data: data
  })
}
/**
 * 获取原件记录
 */
export function getFileBorrowList(data) {
  return request({
    url: '/fileManage/getFileBorrowList',
    method: 'post',
    data: data
  })
}
/**
 * 获取原件记录
 */
export function editFileBorrow(data) {
  return request({
    url: '/fileManage/editFileBorrow',
    method: 'post',
    data: data
  })
}
