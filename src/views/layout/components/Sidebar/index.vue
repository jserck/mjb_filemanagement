<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <logo :is-collapse="isCollapse" />
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#C7C7C7"
      active-text-color="#fff"
    >
      <sidebar-item :routes="permission_routers" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import logo from './logo'
export default {
  components: { SidebarItem, logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
