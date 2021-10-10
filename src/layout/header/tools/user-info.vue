<template>
  <ElAvatar :size="30" :src="avatar" style="cursor: pointer" @click="avatarClick" />

  <div style="margin-left: 10px">{{ realName }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElAvatar } from 'element-plus'
import { useSessionStore } from '@/store/modules/session'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UserInfo',
  components: { ElAvatar },
  setup() {
    const sessionStore = useSessionStore()
    const realName = sessionStore.getSession.realName
    const avatar = computed(() => sessionStore.getSession.avatar + '?' + sessionStore.getTime)

    const router = useRouter()

    function avatarClick() {
      router.push({ name: 'ProfileInfo' })
    }

    return {
      realName,
      avatar,
      avatarClick,
    }
  },
})
</script>
