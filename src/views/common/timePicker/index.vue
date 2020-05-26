/*
 * 账户名列表模糊查询
 * @Last Modified time: 2020-05-15 14:18:07
 */
<template>
  <div class="m-timeInput">
    <el-date-picker
      v-model="times"
      type="datetime"
      :disabled="disableds"
      placeholder="选择日期时间"
      @change="timeChange"
    />
  </div>
</template>
<script>
import { parseTime } from '@/utils/index.js'
export default {
  props: {
    disableds: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      times: ''
    }
  },
  watch: {
    value(a, b) {
      this.times = a
    }
  },
  methods: {
    timeChange(e) {
      console.log(parseTime(e))
      if (e) {
        this.$emit('timeChangeHandler', parseTime(e) || '')
      } else {
        this.$emit('timeChangeHandler', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
