import Vue from 'vue'
import Router from 'vue-router'
import { rolesName } from '@/utils/rolesName'
// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: ''
  },
  { path: '/login', component: () => import('@/views/login'), name: '登录NxAdmin', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  // 锁屏
  {
    path: '/lock',
    hidden: true,
    name: '锁屏页',
    component: () => import('@/views/common/lock')
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  // 文件首页
  {
    path: '/fileHome',
    component: Layout,
    // hidden: true,
    alwaysShow: true, // 一直显示根路由
    meta: { title: 'fileHome', icon: 'excel', roles: [rolesName.fileAdd, rolesName.fileEdit, rolesName.fileRead, rolesName.fileDistribution, rolesName.fileLog] },
    children: [
      {
        path: 'fileHome',
        name: 'fileHome',
        component: () => import('@/views/fileHome/fileHome'),
        meta: { title: 'fileHome', roles: [rolesName.fileAdd, rolesName.fileEdit, rolesName.fileRead, rolesName.fileDistribution, rolesName.fileLog] }
      },
      {
        path: 'fileHomeListSee',
        name: 'fileHomeListSee',
        hidden: true,
        component: () => import('@/views/fileHome/fileHomeListSee'),
        meta: { title: 'fileHomeListSee' }
      },
      {
        path: 'fileHomeAddEditor',
        name: 'fileHomeAddEditor',
        hidden: true,
        component: () => import('@/views/fileHome/fileHomeAddEditor'),
        meta: { title: 'fileHomeAddEditor' }
      },
      {
        path: 'rolesAndLookHistory',
        name: 'rolesAndLookHistory',
        hidden: true,
        component: () => import('@/views/fileHome/rolesAndLookHistory'),
        meta: { title: 'rolesAndLookHistory' }
      },
      {
        path: 'theOriginalCopy',
        name: 'theOriginalCopy',
        hidden: true,
        component: () => import('@/views/fileHome/theOriginalCopy'),
        meta: { title: 'theOriginalCopy' }
      }
    ]
  },
  // 文件种类设置
  {
    path: '/fileTypeSet',
    component: Layout,
    // hidden: true,
    alwaysShow: true, // 一直显示根路由
    meta: { title: 'fileTypeSet', icon: 'table', roles: [rolesName.fileType] },
    children: [
      {
        path: 'fileTypeSet',
        name: 'fileTypeSet',
        component: () => import('@/views/fileTypeSet/fileTypeSet'),
        meta: { title: 'fileTypeSet' }
      },
      {
        path: 'fileTypeAdd',
        name: 'fileTypeAdd',
        hidden: true,
        component: () => import('@/views/fileTypeSet/fileTypeAdd'),
        meta: { title: 'fileTypeAdd' }
      }
    ]
  },
  // 账户管理
  {
    path: '/accountManagement',
    component: Layout,
    // hidden: true,
    alwaysShow: true, // 一直显示根路由
    meta: { title: 'accountManagement', icon: 'user', roles: [rolesName.accountManage, rolesName.roleManage, rolesName.editPwd] },
    children: [
      {
        path: 'accountManagement',
        name: 'accountManagement',
        component: () => import('@/views/accountManagement/accountManagement'),
        meta: { title: 'accountManagement', roles: [rolesName.accountManage] }
      },
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: () => import('@/views/accountManagement/roleManagement'),
        meta: { title: 'roleManagement', roles: [rolesName.roleManage] }
      },
      {
        path: 'addRole',
        name: 'addRole',
        hidden: true,
        component: () => import('@/views/accountManagement/addRole'),
        meta: { title: 'addRole' }
      },
      {
        path: 'addAccount',
        name: 'addAccount',
        hidden: true,
        component: () => import('@/views/accountManagement/addAccount'),
        meta: { title: 'addAccount' }
      },
      {
        path: 'putPossWord',
        name: 'putPossWord',
        component: () => import('@/views/accountManagement/putPossWord'),
        meta: { title: 'putPossWord', roles: [rolesName.editPwd] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
