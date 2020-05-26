import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { getDAesString, desc } from '@/utils/des'
import qs from 'qs'

const keys = 'yhgt!d%sd*aw%dSDSFSsa#mng~dsq'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  baseURL: 'http://47.95.233.255:8788/sxzy-api-1.0-SNAPSHOT',
  withCredentials: true,
  timeout: 5000 // 请求超时时间
})
function fnDataDes(config) {
  if (config.method === 'get') {
    return config
  } else {
    // config.data = qs.stringify({
    //   d: desc(JSON.stringify({ body: config.data }), keys) || {}
    // })
    config.data = qs.stringify({
      d: JSON.stringify({
        body: config.data,
        requestTime: (new Date()).getTime(),
        platform: '3',
        token: store.getters.token
      }) || {}
    })
  }
  return config
}
// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return fnDataDes(config)
  // return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== '0') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === '300') {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      // if (response.config.method === 'post') {
      //   const d = qs.parse(response.data.data.body).d
      //   response.data = JSON.parse(getDAesString(d, keys)).body || response.data
      //   return response.data
      // }
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
