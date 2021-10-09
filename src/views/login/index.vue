<template>
  <div class="h-screen flex flex-col justify-center items-center bg-light-500 dark:bg-dark-700">
    <div class="px-20 py-10 rounded-xl bg-gray-300 dark:bg-gray-800">
      <p class="text-3xl mb-10 text-center">vue3-admin-template</p>
      <el-form class="w-80 mx-auto">
        <el-form-item>
          <el-input placeholder="account" v-model="formModule.account" size="medium">
            <template #prepend>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="password" type="password" v-model="formModule.password" size="medium">
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
    <div class="w-80">
      <div class="w-300px mx-auto flex flex-wrap items-center">
        <img src="@/assets/logo.png" class="w-20 h-20" />
        <ul class="text-left mt-10 ml-10 list-disc">
          <li>vite</li>
          <li>vue3</li>
          <li>typescript</li>
          <li>element plus</li>
          <li>windicss</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSessionStore, UserSession } from '@/store/modules/session'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { http } from '@/utils/http'

export default defineComponent({
  name: 'AppLogin',
  setup() {
    const sessionStore = useSessionStore()
    const router = useRouter()
    const loading = ref(false)

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
      doLogin,
    }
  },
})
</script>
