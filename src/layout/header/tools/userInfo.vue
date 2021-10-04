<template>
  <ElAvatar :size="30" :src="avatar" style="cursor: pointer" @click="avatarClick" />

  <div style="margin-left: 10px">{{ realName }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElAvatar } from 'element-plus'
import { useSessionStore } from '@/store/modules/session'

export default defineComponent({
  name: 'UserInfo',
  components: { ElAvatar },
  setup() {
    const {
      getSession: { realName, avatar },
    } = useSessionStore()

    function avatarClick() {
      alert('avatarClick')
    }

    return {
      realName,
      avatar,
      avatarClick,
    }
  },
})
</script>
