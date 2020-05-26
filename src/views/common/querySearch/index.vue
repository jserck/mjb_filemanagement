/*
 * 账户名列表模糊查询
 * @Last Modified time: 2020-05-15 14:18:07
 */
<template>
  <div class="m-userInputList">
    <el-autocomplete
      v-model="state1"
      class="inline-input"
      :fetch-suggestions="querySearch"
      :placeholder="placeText"
      @select="handleSelect"
      @input="changeHandleSelect"
    />
  </div>
</template>
<script>
export default {
  props: {
    roleName: {
      type: String,
      default: ''
    },
    placeText: {
      type: String,
      default: ''
    },
    httpName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      restaurants: [],
      state1: '',
      filters: {
        userName: ''
      }
    }
  },
  watch: {
    roleName: function(a, b) {
      this.state1 = a
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$store.dispatch(this.httpName, this.filters).then(res => {
        this.restaurants = []
        res.data.queryList.forEach(element => {
          const obj = {};
          ({ name: obj.value, id: obj.address } = element)
          this.restaurants.push(obj)
        })
      })
    },
    changeHandleSelect() {
      this.$emit('roleNameChange', this.state1)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.$emit('roleNameChange', item)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
