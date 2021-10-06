<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <p class="text-6xl">404</p>
    <p class="text-gray-500">抱歉，您访问的页面不存在。</p>
    <el-button type="primary" class="mt-20" @click="backHome">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function backHome() {
  router.replace('/')
}
</script>
