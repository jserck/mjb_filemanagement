// 获取当前种类文件列表
function conditionList(num) {
  const obj = {
    conditionList: [
      {
        columnName: '承租方',
        columnValue: '',
        columnType: 1,
        mappingColumnName: 'text'
      },
      {
        columnName: '租赁方',
        columnValue: '',
        columnType: 1,
        mappingColumnName: 'fileName2'
      },
      {
        columnName: '费用总金额',
        columnValue: '',
        columnType: 1,
        mappingColumnName: 'fileName1'
      },
      {
        columnName: '费用小金额',
        columnValue: '',
        columnType: 1,
        mappingColumnName: 'fileName1'
      },
      {
        columnName: '日期',
        columnValue: '',
        columnType: 2,
        mappingColumnName: 'createTime'
      }
    ],
    formList: [
      {
        id: '1',
        fileTypeId: '11',
        examine: 2,
        fileName2: '租赁合同',
        createTime: '2020/4/3',
        text: 'sdfsdf',
        fileName1: '555'
      },
      {
        id: '2',
        fileTypeId: '11',
        examine: 1,
        fileName2: '租赁合同',
        createTime: '2020/4/3',
        text: 'sdfsdf',
        fileName1: '555'
      },
      {
        id: '3',
        fileTypeId: '11',
        examine: 1,
        fileName2: '租赁合同',
        createTime: '2020/4/3',
        text: 'sdfsdf',
        fileName1: '555'
      },
      {
        id: '4',
        fileTypeId: '11',
        examine: 1,
        fileName2: '租赁合同',
        createTime: '2020/4/3',
        text: '2020/1/4',
        fileName1: '555'
      },
      {
        id: '4',
        fileTypeId: '11',
        examine: 1,
        fileName2: '租赁合同',
        createTime: '2020/4/3',
        text: '2020/1/4',
        fileName1: '555'
      }
    ]
  }
  return obj
}
function getFileInfoList(params) {
  const conditionList = [
    {
      columnName: '承租方',
      columnValue: '水电费',
      columnType: 1,
      mappingColumnName: 'text'
    },
    {
      columnName: '租赁方',
      columnValue: '刚发的',
      columnType: 1,
      mappingColumnName: 'fileName2'
    },
    {
      columnName: '费用总金额',
      columnValue: '888',
      columnType: 1,
      mappingColumnName: 'fileName1'
    },
    {
      columnName: '费用小金额',
      columnValue: '777',
      columnType: 1,
      mappingColumnName: 'fileName1'
    },
    {
      columnName: '日期',
      columnValue: ['2020-05-06 00:00:00', '2020-06-08 00:00:00'],
      columnType: 2,
      mappingColumnName: 'createTime'
    }
  ]
  return conditionList
}
function fileSeeList(num) {
  const obj = {
    Id: 1,
    fileTypeName: 'df',
    roleName: 'pck',
    createTime: '2020/4/4',
    lastTime: '2020/4/4',
    where: ' 研发部',
    roleUser: 1
  }
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(obj)
  }
  return arr
}
// 获取原件列表
function fileBorrowList(num) {
  const obj = {
    fileTypeId: 1,
    fileId: 2,
    staffName: 'pck',
    borrowTime: '2020/4/4',
    borrowOperator: 'ppp',
    stillTime: '2020/4/4',
    stillOperator: 'ccc',
    borrowTimeEnd: 'dfdfd',
    stillTimeEnd: 'dfdsfs'
  }
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(obj)
  }
  return arr
}
// 获取原件列表
function fileReadList(num) {
  const obj = {
    staffName: 'pck',
    createTime: '2020/4/4',
    userName: 'dfdfd'
  }
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(obj)
  }
  return arr
}
export default {
  getFileHeadList: config => {
    // 获取种类列表
    return {
      code: 0,
      message: '获取文件类型列表',
      data: {
        fileList: [
          {
            fileTypeTile: '租凭合同',
            color: '#31B48D',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '辞职报告',
            color: '#3B67A4',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '业主名单',
            color: '#38A1F2',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '等等等等',
            color: '#E6A23C',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '租凭合同',
            color: '#F56C6C',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '辞职报告',
            color: '#67C23A',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '业主名单',
            color: '#3C4049',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '等等等等',
            color: '#E6A23C',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '租凭合同',
            color: '#31B48D',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '等等等等',
            color: '#E6A23C',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '租凭合同',
            color: '#F56C6C',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '辞职报告',
            color: '#3B67A4',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          },
          {
            fileTypeTile: '业主名单',
            color: '#38A1F2',
            fileTypeId: 1,
            sort: 1,
            fileCount: 45
          }
        ]
      }
    }
  },
  getCurentTypeFileList: config => {
    // 获取当前种类文件列表
    return {
      code: 0,
      message: '获取当前种类文件列表',
      data: {
        total: 100,
        conditionList: conditionList(10).conditionList,
        formList: conditionList(10).formList
      }
    }
  },
  getFileQueryList: config => {
    // 获取当前种类文件查询列表
    return {
      code: 0,
      message: '获取当前种类文件查询列表',
      data: {
        total: 100,
        conditionList: conditionList(10).conditionList,
        formList: conditionList(10).formList
      }
    }
  },
  addFileItem: config => {
    // 添加文件
    return {
      code: 0,
      message: '添加文件',
      data: {
        total: 100,
        conditionList: conditionList(10)
      }
    }
  },
  getFileInfo: config => {
    // 获取当前种类文件详情
    return {
      code: 0,
      message: '获取当前种类文件详情',
      data: {
        fileName: '神鼎飞丹砂',
        isExamine: 2,
        conditionList: getFileInfoList()
      }
    }
  },
  assignRulesForm: config => {
    // 分配权限
    return {
      code: 0,
      message: '分配权限成功',
      data: config
    }
  },
  getFileSeeList: config => {
    // 获取权限记录
    return {
      code: 0,
      message: '获取权限记录',
      data: {
        total: 100,
        seeList: []
      }
    }
  },
  getFileReadList: config => {
    // 获取查看记录
    return {
      code: 0,
      message: '获取查看记录',
      data: {
        total: 100,
        fileReadList: fileReadList(10)
      }
    }
  },
  stopUserFileSee: config => {
    // 开通权限
    return {
      code: 0,
      message: '终止权限成功',
      data: config
    }
  },
  getFileBorrowList: config => {
    // 获取原件记录
    return {
      code: 0,
      message: '获取原件记录',
      data: {
        total: 100,
        fileOpList: fileBorrowList(10)
      }
    }
  },
  editFileBorrow: config => {
    // 添加原件记录
    return {
      code: 0,
      message: '添加原件记录成功',
      data: config
    }
  }
}

