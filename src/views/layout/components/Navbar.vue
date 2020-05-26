<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger class="hamburger-container" :toggle-click="toggleSideBar" :is-active="sidebar.opened" />
    <nx-breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!-- <nx-github style="margin-top:2px" class="nx-help right-menu-item"></nx-github> -->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <!-- <nx-help class="nx-help right-menu-item" /> -->
      <!-- <lang-select class="international right-menu-item"></lang-select> -->
      <!-- <nx-lang-select class="international right-menu-item"></nx-lang-select> -->
      <!-- <nx-top-lock style="cursor:pointer" class="nx-help"></nx-top-lock> -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item" />
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avator">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ name }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import nxBreadcrumb from '@/components/nx-breadcrumb'
import nxHamburger from '@/components/nx-hamburger'
import nxFullScreen from '@/components/nx-full-screen/index'
// import nxLangSelect from '@/components/nx-lang-select/index'
export default {
  name: 'NavBar',
  components: {
    nxBreadcrumb,
    nxHamburger,
    // nxLangSelect,
    nxFullScreen
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar']),
    avator() {
      return this.$store.getters.website.avator
    }
  },
  created() {
    console.log(this.name)
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
