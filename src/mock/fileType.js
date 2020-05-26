// 获取账户查询列表
function fileTypeList(num) {
  const obj = {
    fileTypeId: 1,
    fileTypeName: 'df',
    userName: 'pck',
    createTime: '2020/4/4',
    editTime: '2020/4/4'
  }
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(obj)
  }
  return arr
}
export default {
  getFileTypeList: config => {
    return {
      code: 0,
      message: '获取文件种类列表成功',
      data: {
        total: 100,
        fileTypeList: fileTypeList(10)
      }
    }
  },
  getFileTypeForm: config => {
    return {
      code: 0,
      message: '获取文件种类详情',
      data: {
        columnList: [
          {
            columnName: '文本',
            isMust: '1',
            columnType: '1',
            columnId: '111',
            close: 1
          },
          {
            columnName: '2020/1/4',
            isMust: '2',
            columnType: '2',
            columnId: '222',
            close: 2
          }
        ],
        fileTypeName: '加薪申请',
        fileTypeId: ''
      }
    }
  },
  addFileTypeList: config => {
    return {
      code: 0,
      message: '添加文件种类成功',
      data: {
      }
    }
  },
  editFileTypeList: config => {
    return {
      code: 0,
      message: '编辑文件种类成功',
      data: {
      }
    }
  }
}

