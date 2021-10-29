<template>
  <div class="h-full flex items-center justify-center">
    <div class="mr-20 flex flex-col items-center">
      <img :src="avatarUrl" class="w-40 rounded-xl" />
      <el-button type="primary" class="mt-5" @click="changeAvatar">修改头像</el-button>
    </div>
    <ul class="app-info-list w-80">
      <li>
        <label>id</label>
        <span>1033</span>
      </li>
      <li>
        <label>账号 account</label>
        <span>13913181372</span>
      </li>
      <li>
        <label>密码 password</label>
        <span class="text-blue-400 cursor-pointer" @click="changePassword">修改密码</span>
      </li>
      <li>
        <label>昵称 realName</label>
        <span>张三</span>
      </li>
      <li>
        <label>角色 role</label>
        <span>企业用户</span>
      </li>
      <li>
        <label>注册日期 writeTime</label>
        <span>2021-08-09 16:26:42</span>
      </li>
      <li>
        <label>上次登录 lastTime</label>
        <span>/<br />@</span>
      </li>
    </ul>
    <ChangeAvatar v-if="componentHandler.async('changeAvatarRef')" ref="changeAvatarRef" />
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/store/modules/session'
import { IChangeAvatar } from './ChangeAvatar.vue'
import { useComponentHandler } from '@/utils/componentHandler'

export default defineComponent({
  name: 'ProfileUserInfo',
  components: {
    ChangeAvatar: defineAsyncComponent(() => import('./ChangeAvatar.vue')),
  },
  setup() {
    const router = useRouter()
    const sessionStore = useSessionStore()
    const avatarUrl = computed(() => sessionStore.getSession.avatarUrl + '?' + sessionStore.getTime)

    function changePassword() {
      router.push({ name: 'ProfileChangePassword' })
    }

    const componentHandler = useComponentHandler()

    function changeAvatar() {
      componentHandler.getAsync<IChangeAvatar>('changeAvatarRef').then((comp) => comp.show())
    }

    return {
      avatarUrl,
      componentHandler,
      changePassword,
      changeAvatar,
    }
  },
})
</script>
