<template>
  <ElDrawer v-model="visible" title="修改头像" size="430px">
    <div class="text-center mb-10">
      <img :src="avatar" class="inline-block w-40 rounded-xl" />
    </div>
    <div class="flex flex-wrap">
      <img
        v-for="i in 34"
        :key="i"
        :src="`/avatar/${i}.png`"
        class="w-20 mt-2 ml-2 rounded-xl cursor-pointer"
        @click="avatarClick(i)"
      />
    </div>
    <div class="text-center mt-10">
      <el-button type="primary" @click="avatarSave" class="w-50">保存</el-button>
    </div>
  </ElDrawer>
</template>

<script lang="ts">
import { ElDrawer, ElMessageBox } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { useSessionStore } from '@/store/modules/session'
import { changeAvatarApi } from '@/api/sys/admin'

export interface IChangeAvatar {
  show: () => void
}

export default defineComponent({
  components: { ElDrawer },
  setup() {
    const visible = ref(true)
    const sessionStore = useSessionStore()
    let avatar = ref(sessionStore.getSession.avatar)

    function show() {
      visible.value = true
    }

    function avatarClick(i: number) {
      avatar.value = `/avatar/${i}.png`
    }

    function avatarSave() {
      if (avatar.value === sessionStore.getSession.avatar) {
        visible.value = false
        return
      }

      changeAvatarApi(avatar.value).then(() => {
        sessionStore.setAvatar(avatar.value)
        visible.value = false
        ElMessageBox.alert('头像修改成功', { type: 'success' })
      })
    }

    return {
      visible,
      avatar,
      show,
      avatarClick,
      avatarSave,
    }
  },
})
</script>
