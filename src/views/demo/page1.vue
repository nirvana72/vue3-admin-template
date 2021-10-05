<template>
  <div>
    <h1>page1</h1>
    <el-button @click="addNum">add</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DemoPage1',
  setup() {
    const num = ref(1)

    function addNum() {
      num.value++
    }
    return {
      addNum,
    }
  },
})
</script>
