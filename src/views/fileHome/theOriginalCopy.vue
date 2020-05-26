<template>
  <section class="m_file_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.staffName" placeholder="输入员工姓名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.borrowOperator" placeholder="借出经手人" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.stillOperator" placeholder="归还经手人" />
        </el-form-item>
        <el-form-item>
          <TimeInput
            :value="time1"
            :disableds="false"
            start-time-text="借出日期"
            end-time-text="借出日期"
            @timeChangeHandler="timeChangeHandler1"
          />
        </el-form-item>
        <el-form-item>
          <TimeInput
            :value="time2"
            :disableds="false"
            start-time-text="归还日期"
            end-time-text="归还日期"
            @timeChangeHandler="timeChangeHandler2"
          />
        </el-form-item>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增借出记录</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table
      v-loading="loading"
      :data="users"
      highlight-current-row
      style="width: 100%;min-height:500px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="staffName" label="员工姓名" />
      <el-table-column prop="borrowTime" label="借出时间" />
      <el-table-column prop="borrowOperator" label="借出经手人" />
      <el-table-column prop="stillTime" label="归还时间" />
      <el-table-column prop="stillOperator" label="归还经手人" />
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,1)"
          >
            添加归还记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination
        layout="prev, pager, next"
        :page-size="filters.pageSize"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form ref="addTheForm" :model="addTheForm" :rules="addTheFormRule">
        <el-form-item v-if="!isStill" prop="staffName" label="员工姓名" :label-width="formLabelWidth">
          <el-input v-model="addTheForm.staffName" auto-complete="off" />
        </el-form-item>
        <el-form-item v-else label="员工姓名" :label-width="formLabelWidth">
          <el-input v-model="addTheForm.staffName" auto-complete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="时间" prop="eventTime" :label-width="formLabelWidth">
          <TimePicker
            v-if="dialogFormVisible"
            :value="time"
            :disableds="false"
            @timeChangeHandler="timeChangeHandler"
          />
        </el-form-item>
        <el-form-item label="借出/归还" prop="eventType" :label-width="formLabelWidth">
          <el-radio-group v-model="addTheForm.eventType" :disabled="true">
            <el-radio :label="1">借出</el-radio>
            <el-radio :label="2">归还</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFileBorrowHandler('addTheForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import TimeInput from '@/views/common/timeInput/timeInput'
import TimePicker from '@/views/common/timePicker'
import {
  getFileBorrowList,
  editFileBorrow
} from '@/api/fileHome'
export default {
  components: {
    TimeInput,
    TimePicker
  },
  data() {
    const eventTimeRule = (rule, value, callBack) => {
      if (this.addTheForm.eventTime === '') {
        callBack(new Error('请填写时间'))
      } else {
        callBack()
      }
    }
    return {
      loading: false,
      isStill: false,
      filters: {
        fileTypeId: this.$route.query.fileTypeId,
        fileId: this.$route.query.fileId,
        stillOperator: '',
        staffName: '',
        borrowOperator: '',
        borrowTime: '',
        stillTime: '',
        pageNum: 0,
        pageSize: 10
      },
      time: '',
      time1: '',
      time2: '',
      addTheForm: {
        fileTypeId: this.$route.query.fileTypeId,
        fileId: this.$route.query.fileId,
        staffName: '',
        eventType: 1,
        eventTime: '',
        id: ''
      },
      formLabelWidth: '120px',
      users: [],
      total: 0,
      dialogFormVisible: false,
      addTheFormRule: {
        staffName: [
          { required: true, message: '请填写员工姓名', trigger: 'blur' }
        ],
        eventType: [
          { required: true, message: '请选择提交类型', trigger: 'blur' }
        ],
        eventTime: [
          { validator: eventTimeRule, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    handleAdd() {
      // 文件种类新增
      this.isStill = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.addTheForm.staffName = ''
        this.addTheForm.eventType = 1
        this.addTheForm.eventTime = ''
        this.addTheForm.id = ''
      })
    },
    handleEdit(index, row) {
      // 添加归还记录
      this.isStill = true;
      ({ staffName: this.addTheForm.staffName, id: this.addTheForm.id } = row)
      this.addTheForm.eventType = 2
      this.dialogFormVisible = true
    },
    initFrom() {
      // 重置表单
      this.$refs.addTheForm.resetFields()
    },
    editFileBorrowHandler(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editFileBorrow(this.addTheForm).then((res) => {
            this.dialogFormVisible = false
            this.initFrom()
            this.getUsers()
            this.$message({
              type: 'success',
              message: res.message || 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCurrentChange(val) {
      this.filters.pageNum = val - 1
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      // 获取列表
      getFileBorrowList(this.filters).then(res => {
        this.loading = false
        this.total = res.data.total
        this.users = res.data.fileOpList
        this.$message({
          type: 'success',
          message: res.message || 'success'
        })
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    timeChangeHandler(time) {
      this.addTheForm.eventTime = time
    },
    timeChangeHandler1(time) {
      this.filters.borrowTime = time
    },
    timeChangeHandler2(time) {
      this.filters.stillTime = time
    }
  }
}
</script>
<style lang="scss" scoped>
    .m_file_container{
        padding: 20px;
    }
</style>
