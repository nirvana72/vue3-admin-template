<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
    <div
      class="
        absolute
        top-5
        right-5
        w-10
        h-10
        flex
        items-center
        justify-center
        bg-gray-200
        rounded
        cursor-pointer
        dark:bg-gray-900
      "
    >
      <DarkMode class="text-2xl" />
    </div>
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="
          absolute
          inset-0
          bg-gradient-to-r
          from-cyan-400
          to-cyan-600
          shadow-lg
          transform
          -skew-y-6
          sm:rounded-3xl sm:p-20 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl
          dark:from-blue-gray-500 dark:to-blue-gray-700
        "
      ></div>
      <div class="relative px-4 py-10 bg-white dark:bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div class="flex items-center">
            <img src="@/assets/logo.png" class="w-10 mr-5" />
            <h1 class="text-2xl">{{ title }}</h1>
          </div>
          <el-form class="mt-10 w-80 mx-auto">
            <el-form-item>
              <el-input v-model="formModule.account" placeholder="account" size="medium">
                <template #prepend>
                  <i class="el-icon-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formModule.password" placeholder="password" type="password" size="medium">
                <template #prepend>
                  <i class="el-icon-lock"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" class="w-full" @click="doLogin">login</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSessionStore, UserSession } from '@/store/modules/session'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import DarkMode from '@/layout/header/tools/DarkMode.vue'
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { useAppEnv } from '@/utils/useAppEnv'
import { http } from '@/utils/http'

export default defineComponent({
  name: 'AppLogin',
  components: { DarkMode },
  setup() {
    const sessionStore = useSessionStore()
    const router = useRouter()
    const loading = ref(false)
    const { VITE_APP_TITLE: title } = useAppEnv()

    const formModule = reactive({
      account: 'admin',
      password: '123456',
    })

    function doLogin() {
      const data = toRaw(formModule)
      loading.value = true
      http
        .post<UserSession>('/login', { data })
        .then(async (session) => {
          sessionStore.setSesssion(session)
          await router.replace('/')
          ElMessage.success({ message: `欢迎回来: ${session.realName}`, center: true })
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      loading,
      formModule,
      title,
      doLogin,
    }
  },
})
</script>
