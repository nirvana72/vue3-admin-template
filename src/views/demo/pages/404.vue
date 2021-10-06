<template>
  <div class="text-center mt-100">
    <el-button @click="goUnknowPath">跳转到一个不存在的路由</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goUnknowPath() {
  router.replace({ path: '/unknow' }) // 跳转到一个不存在的路由
}
</script>
