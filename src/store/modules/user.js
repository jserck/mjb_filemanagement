import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'
import { rolesGet } from '@/utils/rolesName'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    roleId: '',
    userId: '',
    fileRoleName: '',
    isLock: getStore({
      name: 'isLock'
    }) || false,
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    browserHeaderTitle: getStore({
      name: 'browserHeaderTitle'
    }) || '实现置业资料管理系统'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_Id: (state, userId) => {
      state.userId = userId
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_ROLENAME: (state, fileRoleName) => {
      state.fileRoleName = fileRoleName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd'
      })
      removeStore({
        name: 'isLock'
      })
    }

  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.userName.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.userPwd, userInfo.verifyCode).then(response => {
          const data = response.data
          setToken(data.token)
          // setStore({ name: 'roleId', content: data.roleId })
          // setStore({ name: 'userName', content: data.userName })
          // setStore({ name: 'userId', content: data.userId })
          commit('SET_TOKEN', data.token)
          commit('SET_ROLEID', data.roleId)
          commit('SET_NAME', data.userName)
          commit('SET_Id', data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.roleId).then(res => {
          const response = res.data
          const authorityList = rolesGet(response)
          console.log('权限：', authorityList)
          const data = response
          if (authorityList && authorityList.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', authorityList)
            commit('SET_ROLENAME', data.fileRoleName || '')
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_AVATAR', data.avatar || '')
          resolve({ roles: authorityList })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    }
  }
}

export default user
