<template>
  <section class="m_file_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <QuerySearch
            :role-name="filters.userName"
            http-name="getFileUserQueryList"
            place-text="输入账户名称关键字"
            @roleNameChange="roleNameChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加账户</el-button>
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
      <el-table-column prop="userId" label="ID" width="60" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="department" label="所在部门" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="lateTime" label="最后登录时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{ isCloseText(scope.row.isOnline).text }}</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import {
  getFileUserList, setUserStatus
} from '@/api/accountManage'
export default {
  components: {
    QuerySearch
  },
  data() {
    return {
      loading: false,
      filters: {
        userName: '',
        pageNum: 0,
        pageSize: 10
      },
      users: [],
      total: 0
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    isCloseText(isOnline) {
      // 是否禁用/恢复
      if (!isOnline) return { isOnline: 2, text: '恢复' }
      if (isOnline === 1) {
        return { isOnline: 1, text: '禁用' }
      } else {
        return { isOnline: 2, text: '恢复' }
      }
    },
    handleAdd() {
      // 文件种类新增
      this.$router.push({
        path: '/accountManagement/addAccount',
        query: {
          type: 'add'
        }
      })
    },
    roleNameChange(data) {
      this.filters.userName = data.value || data || ''
    },
    handleCurrentChange(val) {
      this.filters.pageNum = val - 1
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      // 获取用户列表
      getFileUserList(this.filters).then(res => {
        this.loading = false
        this.total = res.data.total
        this.users = res.data.fileUserList
      }).catch(err => {
        console.log(err)
        this.loading = true
      })
    },
    handleDel(index, row) {
      this.$confirm('确认' + this.isCloseText(row.isOnline).text + '该账户吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const body = {
            userId: row.userId,
            isOnline: this.isCloseText(row.isOnline).isOnline === 1 ? 2 : 1
          }
          setUserStatus(body).then((res) => {
            this.getUsers()
            this.$message({
              type: 'success',
              message: res.message || 'success'
            })
          })
        })
        .catch(() => {})
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/accountManagement/addAccount',
        query: {
          userId: row.userId,
          type: 'edit'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .m_file_container{
        padding: 20px;
    }
</style>
