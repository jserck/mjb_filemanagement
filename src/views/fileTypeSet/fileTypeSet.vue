<template>
  <section class="m_file_container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <QuerySearch
            :role-name="filters.fileTypeName"
            place-text="输入文件种类关键字"
            http-name="getFileTypeQueryList"
            @roleNameChange="roleNameChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">添加类型</el-button>
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
      <el-table-column prop="fileTypeId" label="ID" width="60" />
      <el-table-column prop="fileTypeName" label="种类" />
      <el-table-column prop="userName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="editTime" label="最后编辑时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleDel(scope.$index, scope.row)">查看</el-button>
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
  getFileTypeList
} from '@/api/fileType'
export default {
  components: {
    QuerySearch
  },
  data() {
    return {
      loading: false,
      filters: {
        fileTypeName: '',
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
    handleAdd() {
      // 文件种类新增
      this.$router.push({
        path: '/fileTypeSet/fileTypeAdd',
        query: {
          type: 'add'
        }
      })
    },
    roleNameChange(data) {
      this.filters.fileTypeName = data.value || data || ''
    },
    handleCurrentChange(val) {
      this.filters.pageNum = val - 1
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      // 获取列表
      getFileTypeList(this.filters).then((res) => {
        this.loading = false
        this.$message({
          type: 'success',
          message: res.message || 'success'
        })
        this.total = res.data.total
        this.users = res.data.fileTypeList
        console.log(res.data)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 查看
    handleDel(index, row) {
      this.$router.push({
        path: '/fileTypeSet/fileTypeAdd',
        query: {
          fileTypeId: row.fileTypeId,
          fileTypeName: row.fileTypeName,
          type: 'see'
        }
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/fileTypeSet/fileTypeAdd',
        query: {
          fileTypeId: row.fileTypeId,
          fileTypeName: row.fileTypeName,
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
