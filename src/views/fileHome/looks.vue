<template>
  <section class="m_file_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <QuerySearch
            :role-name="filters.userName"
            http-name="getFileUserQueryList"
            place-text="输入用户关键字"
            @roleNameChange="roleNameChange"
          />
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.staffName" placeholder="输入员工姓名" />
        </el-form-item>
        <el-form-item>
          <TimeInput
            :value="time"
            :disableds="false"
            start-time-text="开始日期"
            end-time-text="结束日期"
            @timeChangeHandler="timeChangeHandler"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
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
      <el-table-column type="index" width="60" />
      <el-table-column prop="userName" label="账户" />
      <el-table-column prop="staffName" label="员工姓名" />
      <el-table-column prop="createTime" label="查看时间" />
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination layout="prev, pager, next" :page-size="filters.pageSize" :total="total" style="float:right;" @current-change="handleCurrentChange" />
    </el-col>
  </section>
</template>
<script>
import QuerySearch from '@/views/common/querySearch'
import { getFileReadList } from '@/api/fileHome'
import TimeInput from '@/views/common/timeInput/timeInput'
export default {
  components: {
    TimeInput,
    QuerySearch
  },
  props: {
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      filters: {
        pageNum: 0,
        pageSize: 10,
        opTime: '',
        userName: '',
        staffName: ''
      },
      time: '',
      users: [],
      total: 0
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    handleCurrentChange(val) {
      this.filters.pageNum = val - 1
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      // 获取列表
      getFileReadList(this.filters).then(res => {
        this.loading = false
        this.total = res.data.total
        this.users = res.data.fileReadList
        console.log(this.users)
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    timeChangeHandler(time) {
      this.filters.opTime = time
    },
    roleNameChange(data) {
      this.filters.userName = data.value || data || ''
    }
  }
}
</script>
<style lang="scss" scoped>
    .m_file_container{
        padding: 20px;
    }
</style>
