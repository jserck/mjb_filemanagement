<template>
  <section class="m_file_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <QuerySearch
            :role-name="filters.roleName"
            http-name="roleQueryList"
            place-text="输入角色名称关键字"
            @roleNameChange="roleNameChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加角色</el-button>
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
      <el-table-column prop="roleId" label="id" width="60" />
      <el-table-column prop="roleName" label="角色名" />
      <el-table-column prop="remarks" label="备注" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
import { getRoleList, removeRole } from '@/api/accountManage'
import QuerySearch from '@/views/common/querySearch'
export default {
  components: {
    QuerySearch
  },
  data() {
    return {
      loading: false,
      filters: {
        roleName: '',
        pageNum: 0,
        pageSize: 10
      },
      users: [],
      total: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      this.loading = true
      // 获取角色列表
      getRoleList(this.filters).then((res) => {
        this.loading = false
        this.total = res.data.total
        this.users = res.data.roleList || []
      }).catch(err => {
        console.log(err)
        this.loading = true
      })
    },
    roleNameChange(data) {
      // 角色选择变化监听
      this.filters.roleName = data.value || data || ''
    },
    handleAdd() {
      // 添加角色
      this.$router.push({
        path: '/accountManagement/addRole'
      })
    },
    handleCurrentChange(val) {
      this.filters.pageNum = val - 1
      this.getRoleList()
    },
    handleDel(index, row) {
      this.$confirm('确认删除该角色吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { roleId: row.roleId }
          removeRole(para).then((res) => {
            this.getRoleList()
            this.$message({
              type: 'success',
              message: res.message || 'success'
            })
            console.log(res)
          })
        })
        .catch(() => {})
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/accountManagement/addRole',
        query: {
          roleId: row.roleId
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
