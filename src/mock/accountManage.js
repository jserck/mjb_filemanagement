// 获取角色查询列表
function roleList(num) {
  const obj = {
    roleId: 1,
    roleName: 'pck',
    createTime: '2020/4/4',
    remarks: 'sdfsdfsdf',
    roleUser: 1
  }
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(obj)
  }
  return arr
}
// 获取账户查询列表
function accList(num) {
  const obj = {
    userId: 1,
    accName: 'df',
    userName: 'pck',
    createTime: '2020/4/4',
    lastTime: '2020/4/4',
    department: ' 研发部',
    roleUser: 1
  }
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(obj)
  }
  return arr
}
export default {
  // 添加角色
  addRole: config => {
    return {
      code: 0,
      message: '创建角色成功',
      data: config
    }
  },
  putPsd: config => {
    // 修改密码
    return {
      code: 0,
      message: '密码修改成功',
      data: config
    }
  },
  getRoleList: config => {
    // 获取角色查询列表
    return {
      code: 0,
      message: '获取角色列表成功',
      data: {
        total: 100,
        roleList: roleList(10)
      }
    }
  },
  removeRole: config => {
    // 删除角色
    return {
      code: 0,
      message: '角色删除成功',
      data: config
    }
  },
  getFileUserList: config => {
    // 获取账户查询列表
    return {
      code: 0,
      message: '获取账户列表成功',
      data: {
        total: 100,
        fileUserList: accList(10)
      }
    }
  },
  getFileUserInfo: config => {
    // 获取账户信息
    return {
      code: 0,
      message: '获取账户信息成功',
      data: {}
    }
  },
  editFileUser: config => {
    // 禁用账户
    return {
      code: 0,
      message: '账户添加或者编辑成功',
      data: config
    }
  },
  setUserStatus: config => {
    // 禁用账户
    return {
      code: 0,
      message: '禁用账号成功',
      data: config
    }
  }
}

