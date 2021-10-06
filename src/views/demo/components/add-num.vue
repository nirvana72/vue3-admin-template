<template>
  <div class="p-4 w-40">
    <div>num = {{ num }}</div>
    <el-button @click="addNum">add</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(0)
function addNum() {
  num.value++
}
</script>
