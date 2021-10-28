<template>
  <div class="flex items-center cursor-pointer" @click="avatarClick">
    <img :src="avatar" class="rounded w-10" />
    <span class="ml-2">{{ realName }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useSessionStore } from '@/store/modules/session'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const sessionStore = useSessionStore()
    const realName = sessionStore.getSession.realName
    const avatar = computed(() => sessionStore.getSession.avatar + '?' + sessionStore.getTime)

    const router = useRouter()

    function avatarClick() {
      router.push({ name: 'ProfileUserInfo' })
    }

    return {
      realName,
      avatar,
      avatarClick,
    }
  },
})
</script>
