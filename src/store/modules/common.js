import website from '@/const/website'
import { getFileUserQueryList, roleQueryList, getFileTypeQueryList } from '@/api/common'
const common = {
  state: {
    website: website
  },
  mutations: {
    SET_SEARCHHTTPNAME(state, data) {
      state.searchHttpName = data
    }
  },
  actions: {
    getFileUserQueryList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getFileUserQueryList().then(res => {
          resolve(res)
        })
      })
    },
    roleQueryList({ commit }, data) {
      return new Promise((resolve, reject) => {
        roleQueryList().then(res => {
          resolve(res)
        })
      })
    },
    getFileTypeQueryList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getFileTypeQueryList().then(res => {
          resolve(res)
        })
      })
    }
  }

}
export default common
