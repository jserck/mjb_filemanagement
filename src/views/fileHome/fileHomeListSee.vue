<template>
  <section class="m_file_container">
    <!--工具条-->
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="dynamicValidateForm" @submit.native.prevent>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.conditionList"
          :key="index"
          :label="`${domain.columnName}：`"
        >
          <el-input v-if="domain.columnType === 1" v-model="domain.columnValue" />
          <TimeInput
            v-else
            :value="domain.columnValue"
            :disableds="false"
            start-time-text="开始日期"
            end-time-text="结束日期"
            @timeChangeHandler="timeChangeHandler($event,index)"
          />
        </el-form-item>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="fnSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-permission="['fileAdd']" type="primary" @click="handleAdd">添加文件</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <!--列表-->
      <el-table
        v-loading="loading"
        :data="users"
        highlight-current-row
        style="width: 100%"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column
          v-for="(item,index) in dynamicValidateForm.conditionList"
          :key="index"
          :prop="item.mappingColumnName"
          :label="item.columnName"
        />
        <el-table-column label="操作" width="450" fixed="right">
          <template slot-scope="scope">
            <el-button v-permission="['fileRead']" :disabled="scope.row.examine===1" type="primary" size="small" @click="handleEdit(scope.$index, scope.row,0)">查看</el-button>
            <el-button v-permission="['fileEdit']" size="small" @click="handleEdit(scope.$index, scope.row,1)">编辑</el-button>
            <el-button v-permission="['fileDistribution']" size="small" @click="handleEdit(scope.$index, scope.row,2)">分配权限</el-button>
            <el-button v-permission="['fileLog']" size="small" @click="handleEdit(scope.$index, scope.row,3)">权限记录</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row,4)">原件记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" :page-size="dynamicValidateForm.pageSize" :total="total" style="float:right;" @current-change="handleCurrentChange" />
      </el-col>
      <el-dialog title="权限添加" :visible.sync="assignRulesFormVisible">
        <el-form ref="assignRuleFrom" :model="assignRulesForm" :rules="assignRule" @submit.native.prevent>
          <el-form-item label="账号" prop="userId" :label-width="formLabelWidth">
            <QuerySearch
              :role-name="assignRulesForm.userName"
              http-name="getFileUserQueryList"
              place-text="输入账户名称关键字"
              @roleNameChange="roleNameChange"
            />
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth">
            <el-select v-model="assignRulesForm.dayLongValue" placeholder="请选择有效期">
              <el-option label="1天" value="1" />
              <el-option label="3天" value="2" />
              <el-option label="7天" value="3" />
              <el-option label="一个月" value="4" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="assignRulesFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="assignRulesFormHandler('assignRuleFrom')">确 定</el-button>
        </div>
      </el-dialog>
    </el-row></section>
</template>
<script>
import QuerySearch from '@/views/common/querySearch'
import TimeInput from '@/views/common/timeInput/timeInput'
import {
  getCurentTypeFileList,
  assignRulesForm,
  getFileQueryList
} from '@/api/fileHome'
export default {
  components: {
    QuerySearch,
    TimeInput
  },
  data() {
    const userNameRules = (rule, value, callBack) => {
      if (this.assignRulesForm.userId === '') {
        callBack(new Error('请选择账户'))
      } else {
        callBack()
      }
    }
    return {
      time: '',
      loading: false,
      assignRulesFormVisible: false,
      formLabelWidth: '120px',
      dynamicValidateForm: {
        conditionList: [],
        fileTypeId: this.$route.query.fileTypeId,
        pageNum: 0,
        pageSize: 10
      },
      filters: {
        fileTypeId: this.$route.query.fileTypeId,
        pageNum: 0,
        pageSize: 10
      },
      assignRulesForm: {
        fileTypeId: this.$route.query.fileTypeId,
        fileId: '',
        userId: '',
        dayLongValue: '1',
        dayLongName: ''
      },
      users: [],
      conditionList: [],
      total: 0,
      assignRule: {
        userId: [
          { validator: userNameRules, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    roleNameChange(data) {
      this.assignRulesForm.userId = data.address || data || ''
    },
    handleCurrentChange(val) {
      this.dynamicValidateForm.pageNum = val - 1
      this.getUsers()
    },
    getDayLongValue(dayLongValue) {
      if (dayLongValue === '1') {
        return '1天'
      } else if (dayLongValue === '3') {
        return '3天'
      } else if (dayLongValue === '7') {
        return '7天'
      } else {
        return '一个月'
      }
    },
    assignRulesFormHandler(formName) {
      this.$refs[formName].validate((valid) => {
        function resetAssignRules() {
          /**
           * 重置分配权限表单
           */
          const resetAssignRulesForm = {
            fileTypeId: this.$route.query.fileTypeId,
            fileId: '',
            userId: '',
            dayLongValue: '1',
            dayLongName: ''
          }
          this.assignRulesForm = Object.assign({}, resetAssignRulesForm)
        }
        if (valid) {
          const body = Object.assign({}, this.assignRulesForm)
          body.dayLongName = this.getDayLongValue(body.dayLongValue)
          assignRulesForm(body).then(res => {
            this.assignRulesFormVisible = false
            this.getUsers()
            resetAssignRules()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fnSearch() {
      /**
       * 查询接口
       */
      this.loading = true
      getFileQueryList(this.dynamicValidateForm).then((res) => {
        this.loading = false
        this.total = res.data.total
        this.users = res.data.formList
        // this.dynamicValidateForm.conditionList = res.data.conditionList
        console.log(res)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getUsers() {
      // 获取列表
      this.loading = true
      getCurentTypeFileList(this.filters).then((res) => {
        this.loading = false
        this.$message({
          type: 'success',
          message: res.message || 'success'
        })
        this.total = res.data.total
        this.users = res.data.formList
        this.dynamicValidateForm.conditionList = res.data.conditionList
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    fn_getUserList() {
      // 获取分配权限账号列表
    },
    handleAdd() {
      // 文件种类新增
      this.$router.push({
        path: '/fileHome/fileHomeAddEditor',
        query: {
          fileTypeId: this.$route.query.fileTypeId,
          conditionObj: JSON.stringify({ conditionList: this.dynamicValidateForm.conditionList }),
          type: 'add'
        }
      })
    },
    handleEdit(index, row, c) {
      // 操作详情
      if (c === 0) {
        this.$router.push({
          path: '/fileHome/fileHomeAddEditor',
          query: {
            fileTypeId: this.$route.query.fileTypeId,
            fileId: row.id,
            type: 'see'
          }
        })
      } else if (c === 1) {
        this.$router.push({
          path: '/fileHome/fileHomeAddEditor',
          query: {
            fileTypeId: this.$route.query.fileTypeId,
            fileId: row.id,
            type: 'edit'
          }
        })
      } else if (c === 2) {
        this.assignRulesForm.fileId = row.id
        this.assignRulesFormVisible = true
      } else if (c === 3) {
        this.$router.push({
          path: '/fileHome/rolesAndLookHistory',
          query: {
            from: JSON.stringify(row)
          }
        })
      } else if (c === 4) {
        this.$router.push({
          path: '/fileHome/theOriginalCopy',
          query: {
            fileTypeId: row.fileTypeId,
            fileId: row.id
          }
        })
      }
    },
    timeChangeHandler(time, index) {
      this.dynamicValidateForm.conditionList[index].columnValue = time
    }
  }
}
</script>
<style lang="scss" scoped>
    .m_file_container{
        padding: 20px;
    }
</style>
