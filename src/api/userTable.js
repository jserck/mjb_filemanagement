import request from '@/utils/request'

export function getUserListPage(params) {
  return request({
    url: '/user/listpage',
    method: 'get',
    params: params
  })
}
