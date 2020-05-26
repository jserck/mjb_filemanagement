import request from '@/utils/request'

/**
 * 获取文件种类创建列表
 */
export function getFileTypeList(from) {
  return request({
    url: '/fileManage/getFileTypeList',
    method: 'post',
    data: from
  })
}
/**
 * 获取文件种类详情
 */
export function getFileTypeForm(from) {
  return request({
    url: '/fileManage/getFileTypeForm',
    method: 'post',
    data: from
  })
}
/**
 * 添加文件种类
 */
export function addFileTypeList(from) {
  return request({
    url: '/fileManage/addFile',
    method: 'post',
    data: from
  })
}
/**
 * 编辑文件种类
 */
export function editFileTypeList(from) {
  return request({
    url: '/fileManage/editFile',
    method: 'post',
    data: from
  })
}
