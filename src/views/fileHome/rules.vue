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
      <el-table-column prop="seeId" label="ID" width="60" />
      <el-table-column prop="userName" label="授权用户" min-width="150" />
      <el-table-column prop="dayLong" label="有效期" min-width="100" />
      <el-table-column prop="openTime" label="开启权限时间" min-width="160" />
      <el-table-column prop="closeTime" label="结束权限时间" min-width="160" />
      <el-table-column prop="createUserName" label="权限授权人" min-width="160" />
      <el-table-column prop="addr" label="状态" min-width="100" :formatter="getAuthorityStatus" />
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.authorityStatus===1" type="danger" size="small" @click="handleEdit(scope.$index, scope.row,0)">终止权限</el-button>
          <el-button v-else type="success" size="small" @click="handleEdit(scope.$index, scope.row,1)">再次开通</el-button>
        </template>
      </el-table-column>
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
import { getFileSeeList, stopUserFileSee } from '@/api/fileHome'
import TimeInput from '@/views/common/timeInput/timeInput'
import {
  assignRulesForm
} from '@/api/fileHome'
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
        userName: '',
        opTime: '',
        fileTypeId: this.row.fileTypeId,
        fileId: this.row.id
      },
      users: [],
      time: '',
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
    getAuthorityStatus(row, col) {
      // 筛选当前记录的状态值
      let text = ''
      switch (row.authorityStatus) {
        case 1:
          text = '生效'
          break
        case 2:
          text = '未生效'
          break
        case 3:
          text = '已失效'
          break
        default:
          break
      }
      return text
    },
    getUsers() {
      this.loading = true
      // 获取列表
      getFileSeeList(this.filters).then(res => {
        this.loading = false
        this.total = res.data.total || 0
        this.users = res.data.seeList || []
        this.$message({
          type: 'success',
          message: res.message || 'success'
        })
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 删除
    handleEdit(index, row, type) {
      function getMessageText(type) {
        const obj = {}
        if (type === 0) {
          obj.msg = '终止'
        } else {
          obj.msg = '开通'
        }
        return obj
      }
      this.$confirm(`确认${getMessageText(type).msg}权限吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          function returnFrom() {
            const resetAssignRulesForm = {
              fileTypeId: this.row.fileTypeId,
              fileId: this.row.id,
              seeId: row.seeId,
              userId: row.userId,
              dayLongValue: row.dayLongValue,
              dayLongName: row.dayLong
            }
            return resetAssignRulesForm
          }
          function openHandler() {
            const body = returnFrom.apply(this)
            assignRulesForm(body).then(res => {
              this.getUsers()
              this.$message({
                type: 'success',
                message: res.message || 'success'
              })
            })
          }
          function closeHandler() {
            const body = returnFrom.apply(this)
            stopUserFileSee(body).then((res) => {
              this.getUsers()
              this.$message({
                type: 'success',
                message: res.message || 'success'
              })
            })
          }
          if (type === 0) {
            closeHandler.apply(this)
          } else {
            openHandler.apply(this)
          }
        })
        .catch((err) => {
          console.log(err)
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
