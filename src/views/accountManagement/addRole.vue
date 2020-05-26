<template>
  <section class="m_addRoles">
    <el-form ref="roleForms" class="addRoles-form" status-icon :rules="addRolesRules" :model="addRolesForm" label-width="100">
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色名称" prop="fileRoleName" label-width="100px">
            <el-input v-model="addRolesForm.fileRoleName" auto-complete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="权限" prop="authorityList" label-width="100px">
            <el-checkbox v-model="fileCheckAll" :indeterminate="fileIsIndeterminate" @change="handleCheckAllChange1">文件</el-checkbox>
            <el-checkbox-group v-model="fileCheckedCities" @change="handleCheckedCitiesChange1">
              <el-checkbox v-for="(city,index) in fileOptions" :key="index" :label="city">{{ city.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="100px" prop="authorityList">
            <el-checkbox v-model="fileTypeSetCheckAll" :indeterminate="fileTypeSetIsIndeterminate" @change="handleCheckAllChange2">文件种类设置</el-checkbox>
            <el-checkbox-group v-model="fileTypeSetCheckedCities" @change="handleCheckedCitiesChange2">
              <el-checkbox v-for="(city,index) in fileTypeSetOptions" :key="index" :label="city">{{ city.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="100px" prop="authorityList">
            <el-checkbox v-model="userCheckAll" :indeterminate="userIsIndeterminate" @change="handleCheckAllChange3">账户管理</el-checkbox>
            <el-checkbox-group v-model="userCheckedCities" @change="handleCheckedCitiesChange3">
              <el-checkbox v-for="(city,index) in userOptions" :key="index" :label="city">{{ city.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="角色描述" label-width="100px">
            <el-input v-model="addRolesForm.remarks" auto-complete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="onSubmit('roleForms')">提交</el-button>
        </el-col>
        <el-col :span="2" :push="2">
          <el-button type="primary" @click="handleAdd">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
</template>
<script>
import { rolesName, rolesCheckBox, rolesNameDara, rolesBackfill, rolesGet } from '@/utils/rolesName'
import { addRole } from '@/api/accountManage'
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/login'

const fileOptions = [
  { name: '文件查看', roles: rolesName.fileRead, fileRead: 2 },
  { name: '文件编辑', roles: rolesName.fileEdit, fileEdit: 2 },
  { name: '分配权限', roles: rolesName.fileDistribution, fileDistribution: 2 },
  { name: '分配记录', roles: rolesName.fileLog, fileLog: 2 },
  { name: '添加文件', roles: rolesName.fileAdd, fileAdd: 2 }
]
const fileTypeSetOptions = [
  { name: '文件种类设置', roles: rolesName.fileType, fileType: 2 }
]
const userOptions = [
  { name: '账户管理', roles: rolesName.accountManage, accountManage: 2 },
  { name: '角色管理', roles: rolesName.roleManage, roleManage: 2 },
  { name: '修改密码', roles: rolesName.editPwd, editPwd: 2 }
]
export default {
  data() {
    const authorityListRules = (rule, value, callback) => {
      if (this.fileCheckedCities.length === 0 && this.fileTypeSetCheckedCities.length === 0 && this.userCheckedCities.length === 0) {
        return callback(new Error('权限不能为空'))
      } else {
        callback()
      }
    }
    return {
      roleId: this.$route.query.roleId,
      addRolesForm: { fileRoleName: '', remarks: '', opType: this.$route.query.roleId ? '2' : '1' },
      fileCheckAll: false,
      fileTypeSetCheckAll: false,
      userCheckAll: false,
      fileCheckedCities: [],
      fileTypeSetCheckedCities: [],
      userCheckedCities: [],
      fileOptions: fileOptions,
      fileTypeSetOptions: fileTypeSetOptions,
      userOptions: userOptions,
      fileIsIndeterminate: true,
      fileTypeSetIsIndeterminate: true,
      userIsIndeterminate: true,
      addRolesRules: {
        fileRoleName: [
          {
            required: true, message: '请输入角色名称', trigger: 'blur'
          }
        ],
        authorityList: [
          {
            validator: authorityListRules, trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roleId && this.roleId !== 'undefined') {
      this.editorGetInfo()
    }
  },
  methods: {
    handleCheckAllChange1(val) {
      this.fileCheckedCities = val ? fileOptions : []
      this.fileIsIndeterminate = false
    },
    handleCheckedCitiesChange1(value) {
      const checkedCount = value.length
      this.fileCheckAll = checkedCount === this.fileCheckedCities.length
      this.fileIsIndeterminate = checkedCount > 0 && checkedCount < this.fileCheckedCities.length
    },
    handleCheckAllChange2(val) {
      this.fileTypeSetCheckedCities = val ? fileTypeSetOptions : []
      this.fileTypeSetIsIndeterminate = false
    },
    handleCheckedCitiesChange2(value) {
      const checkedCount = value.length
      this.fileTypeSetCheckAll = checkedCount === this.fileTypeSetCheckedCities.length
      this.fileTypeSetIsIndeterminate = checkedCount > 0 && checkedCount < this.fileTypeSetCheckedCities.length
    },
    handleCheckAllChange3(val) {
      this.userCheckedCities = val ? userOptions : []
      this.userIsIndeterminate = false
    },
    handleCheckedCitiesChange3(value) {
      const checkedCount = value.length
      this.userCheckAll = checkedCount === this.userCheckedCities.length
      this.userIsIndeterminate = checkedCount > 0 && checkedCount < this.userCheckedCities.length
    },
    editorGetInfo() {
      // 重新获取用户权限信息
      function checkBoxBackfill(roles = []) {
        this.fileCheckedCities = rolesBackfill(this.fileOptions, roles) || []
        if (this.fileCheckedCities.length > 0) {
          this.handleCheckedCitiesChange1(this.fileCheckedCities)
        }
        this.fileTypeSetCheckedCities = rolesBackfill(this.fileTypeSetOptions, roles) || []
        if (this.fileTypeSetCheckedCities.length > 0) {
          this.handleCheckedCitiesChange2(this.fileTypeSetCheckedCities)
        }
        this.userCheckedCities = rolesBackfill(this.userOptions, roles) || []
        if (this.userCheckedCities.length > 0) {
          this.handleCheckedCitiesChange3(this.userCheckedCities)
        }
      }
      let authorityList = []
      getInfo(this.roleId).then(response => {
        ({ fileRoleName: this.addRolesForm.fileRoleName, remarks: this.addRolesForm.remarks } = response.data)
        authorityList = rolesGet(response.data)
        checkBoxBackfill.apply(this, [authorityList])
      }).catch(error => {
        console.log(error)
      })
      return authorityList
    },
    onSubmit(formName) {
      // 提交添加
      function changeFileCheckedCities() {
        // 处理选中的数据
        const roles = {
          ...this.addRolesForm,
          ...rolesNameDara.fileCheckedCities,
          ...rolesNameDara.fileTypeSetCheckedCities,
          ...rolesNameDara.userCheckedCities,
          ...rolesCheckBox(this.fileCheckedCities),
          ...rolesCheckBox(this.fileTypeSetCheckedCities),
          ...rolesCheckBox(this.userCheckedCities)
        }
        return roles
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addRolesForm = changeFileCheckedCities.call(this)
          addRole(this.addRolesForm).then((res) => {
            console.log(res)
            this.handleAdd()
          })
        } else {
          return false
        }
      })
    },
    handleAdd() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.m_addRoles{
    padding: 20px;
}
</style>
