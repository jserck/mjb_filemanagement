
export const rolesName = {
  // 全局现有权限模板
  fileAdd: 'fileAdd', // 添加文件权限
  fileEdit: 'fileEdit', // 编辑文件权限
  fileRead: 'fileRead', // 查看文件权限
  fileDistribution: 'fileDistribution', // 分配权限
  fileLog: 'fileLog', // 查看分配记录权限
  accountManage: 'accountManage', // 账户管理权限
  roleManage: 'roleManage', // 角色管理权限
  editPwd: 'editPwd', // 修改密码权限
  fileType: 'fileType'// 文件种类设置权限
}
export const rolesNameDara = {
  // 用做权限多选框回填匹配
  fileCheckedCities: {
    fileAdd: 2, // 添加文件权限
    fileEdit: 2, // 编辑文件权限
    fileRead: 2, // 查看文件权限
    fileDistribution: 2, // 分配权限
    fileLog: 2 // 查看分配记录权限
  },
  fileTypeSetCheckedCities: {
    fileType: 2// 文件种类设置权限
  },
  userCheckedCities: {
    accountManage: 2, // 账户管理权限
    roleManage: 2, // 角色管理权限
    editPwd: 2 // 修改密码权限
  }
}
/**
 * 根据返回的另类数据格式解析成当前权限数据格式
 * @param {[]} data //传入请求的数据格式
 */
export function rolesGet(data = {}) {
  const authorityList = []
  for (const iterator in data) {
    switch (iterator) {
      case 'fileAdd':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'fileEdit':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'fileRead':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'fileDistribution':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'fileLog':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'accountManage':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'roleManage':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'editPwd':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      case 'fileType':
        if (data[iterator] === 1) {
          authorityList.push(iterator)
        }
        break
      default:
        break
    }
  }
  return authorityList
}

/**
 * 根据选中的多选框数据反编译成后台需要的另类格式
 * @param {[]} data //当前选中之后拿到的数据格式
 */
export function rolesCheckBox(data = []) {
  const obj = {}
  for (const [index, elem] of data.entries()) {
    console.log(index)
    if (elem.roles in elem) {
      obj[elem.roles] = 1
    }
  }
  return obj
}

/**
 * 根据后台返回的另类数据格式解析成多选框需要的数据格式，用作回填
 * @param {{}} checkBoxOptions //当前类别所有选项列表
 * @param {[]} data //当前用户的权限列表
 */
export function rolesBackfill(checkBoxOptions = {}, data = []) {
  return checkBoxOptions.filter((item) => {
    const objKeys = Object.keys(item)
    if (data.some((item1) => objKeys.indexOf(item1) >= 0)) {
      return true
    } else {
      return false
    }
  })
}
