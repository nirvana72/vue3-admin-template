<template>
  <div class="text-center mt-100">
    <el-button @click="makeError">制造一个错误</el-button>
  </div>
</template>

<script lang="ts" setup>
function makeError() {
  throw Error('make test error')
}
</script>
