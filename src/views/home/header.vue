<template>
  <div class="px-10 py-5 flex justify-between">
    <div class="flex items-center">
      <img :src="avatarUrl" class="rounded" />
      <div class="ml-5">
        <p class="text-xl">早安, {{ realName }}, 开始您一天的工作吧！</p>
        <p>今日晴，20℃ - 32℃！</p>
      </div>
    </div>
    <div class="w-60 flex justify-between items-center text-right">
      <div>
        <p>待办</p>
        <p class="text-2xl">1/10</p>
      </div>
      <div>
        <p>通知</p>
        <p class="text-2xl">5</p>
      </div>
      <div>
        <p>团队</p>
        <p class="text-2xl">3</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/store/modules/session'

const sessionStore = useSessionStore()
const { avatarUrl, realName } = sessionStore.getSession
</script>
