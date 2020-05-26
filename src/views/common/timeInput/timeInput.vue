/*
 * 账户名列表模糊查询
 * @Last Modified time: 2020-05-15 14:18:07
 */
<template>
  <div class="m-timeInput">
    <el-date-picker
      v-model="times"
      type="datetimerange"
      range-separator="至"
      :start-placeholder="startTimeText"
      :end-placeholder="endTimeText"
      @change="timeChange"
    />
  </div>
</template>
<script>
import { parseTime } from '@/utils/index.js'
export default {
  props: {
    startTimeText: {
      type: String,
      default: '开始日期'
    },
    disableds: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    endTimeText: {
      type: String,
      default: '结束日期'
    }
  },
  data() {
    return {
      times: ''
    }
  },
  watch: {
    value(a, b) {
      console.log('变了', a)
      this.times = a.split(',')
    }
  },
  methods: {
    timeChange(e) {
      console.log(e)
      if (e) {
        this.$emit('timeChangeHandler', [parseTime(e[0]), parseTime(e[1])].join(',') || '')
      } else {
        this.$emit('timeChangeHandler', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
