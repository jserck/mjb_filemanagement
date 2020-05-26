export default {
  roleQueryList: config => {
    return {
      code: 0,
      message: '获取角色模糊查询',
      data: {
        queryList: [
          { id: 1, name: 'name' }
        ]
      }
    }
  },
  getFileUserQueryList: config => {
    return {
      code: 0,
      message: '获取账户模糊查询',
      data: {
        queryList: [
          { id: 1, name: 'name' }
        ]
      }
    }
  },
  getFileTypeQueryList: config => {
    return {
      code: 0,
      message: '获取文件种类模糊查询',
      data: {
        queryList: [
          { id: 1, name: 'name' }
        ]
      }
    }
  }
}

