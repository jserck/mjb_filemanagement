import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    firstredirect: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      function fnfirstredirect(routers) {
        const [...copyRoute] = routers
        const constantRouterMapFirst = copyRoute
          .find(n => !n.hidden && n.path !== '/' && n.path !== '' && n.path !== '/login' && n.path !== '/404' && n.path !== '/401' && n.path !== '/lock') || ''
        function recursionFirst(path, children = []) {
          if (!children || children.length === 0) {
            return path
          }
          return (path += `/${recursionFirst(children.find(m => !m.hidden).path, children.find(m => !m.hidden).children)}`)
        }
        return recursionFirst(constantRouterMapFirst.path, constantRouterMapFirst.children)
      }
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      state.firstredirect = fnfirstredirect(state.routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          console.log('admin>=0')
          accessedRouters = asyncRouterMap
        } else {
          console.log('admin<0')
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // console.log('accessedRouters', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
// console.log(permission)

export default permission
