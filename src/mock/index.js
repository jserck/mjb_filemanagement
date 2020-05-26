import Mock from 'mockjs'
import tableAPI from './table'
import loginAPI from './login'
import accAPI from './accountManage'
import fileHome from './fileHome'
import fileType from './fileType'
import Common from './common'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 登录相关
Mock.mock(/\/fileUser\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/fileRole\/roleAuthorityList/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/fileUser\/verifyCode/, 'get', loginAPI.getCode)

// 用户相关
Mock.mock(/\/user\/listpage/, 'get', tableAPI.getUserList)
// Common相关
Mock.mock(/\/fileRole\/roleQueryList/, 'post', Common.roleQueryList)
Mock.mock(/\/fileUser\/getFileUserQueryList/, 'post', Common.getFileUserQueryList)
Mock.mock(/\/fileManage\/getFileTypeQueryList/, 'post', Common.getFileTypeQueryList)
// 账户相关
Mock.mock(/\/fileRole\/addFileRole/, 'post', accAPI.addRole)
Mock.mock(/\/fileUser\/editUserPwd/, 'post', accAPI.putPsd)
Mock.mock(/\/fileRole\/getRoleList/, 'post', accAPI.getRoleList)
Mock.mock(/\/fileRole\/del/, 'post', accAPI.removeRole)
Mock.mock(/\/fileUser\/getFileUserList/, 'post', accAPI.getFileUserList)
Mock.mock(/\/fileUser\/getFileUserInfo/, 'post', accAPI.getFileUserInfo)
Mock.mock(/\/fileUser\/editFileUser/, 'post', accAPI.editFileUser)
Mock.mock(/\/fileUser\/setUserStatus/, 'post', accAPI.setUserStatus)
// 文件类型相关
Mock.mock(/\/fileManage\/getFileTypeList/, 'get', fileType.getFileTypeList)
Mock.mock(/\/fileManage\/addFile/, 'post', fileType.addFileTypeList)
Mock.mock(/\/fileManage\/editFile/, 'post', fileType.editFileTypeList)
Mock.mock(/\/fileManage\/getFileTypeForm/, 'get', fileType.getFileTypeForm)

// 文件首页相关
Mock.mock(/\/fileManage\/getFileHeadList/, 'get', fileHome.getFileHeadList)
Mock.mock(/\/fileManage\/getFileList/, 'post', fileHome.getCurentTypeFileList)
Mock.mock(/\/fileManage\/getFileQueryList/, 'post', fileHome.getFileQueryList)
Mock.mock(/\/fileManage\/addFileSee/, 'post', fileHome.assignRulesForm)
Mock.mock(/\/fileManage\/getFileSeeList/, 'post', fileHome.getFileSeeList)
Mock.mock(/\/fileManage\/getFileReadList/, 'post', fileHome.getFileReadList)
Mock.mock(/\/fileManage\/stopUserFileSee/, 'post', fileHome.stopUserFileSee)
Mock.mock(/\/fileManage\/getFileBorrowList/, 'post', fileHome.getFileBorrowList)
Mock.mock(/\/fileManage\/editFileBorrow/, 'post', fileHome.editFileBorrow)
Mock.mock(/\/fileManage\/getFileInfo/, 'post', fileHome.getFileInfo)
Mock.mock(/\/fileManage\/addFileItem/, 'post', fileHome.addFileItem)
export default Mock
