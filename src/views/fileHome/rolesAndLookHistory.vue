<template>
  <section class="m_rolesAndLook">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="权限记录" name="rules">
        <Rules :row="from" />
      </el-tab-pane>
      <el-tab-pane label="查看记录" name="looks">
        <Looks :row="from" />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import Rules from './rules'
import Looks from './looks'
export default {
  components: {
    Rules,
    Looks
  },
  data() {
    return {
      activeName: 'rules',
      from: {}
    }
  },
  created() {
    this.from = JSON.parse(this.$route.query.from)
    console.log(this.from)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.m_rolesAndLook{
    padding: 20px;
}
</style>
