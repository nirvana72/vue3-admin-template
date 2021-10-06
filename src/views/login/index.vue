<template>
  <div id="appLoginPage" class="h-screen flex justify-center items-center">
    <div class="w-1/2">
      <div class="w-300px mx-auto text-white flex flex-wrap items-center">
        <p class="text-3xl">vue3-admin-template</p>
        <img src="@/assets/logo.png" class="w-20 h-20" />
        <ul class="text-left text-gray-300 mt-10 ml-10 list-disc">
          <li>vite</li>
          <li>vue3</li>
          <li>typescript</li>
          <li>element plus</li>
          <li>windicss</li>
        </ul>
      </div>
    </div>
    <div class="w-1/2">
      <el-form class="w-300px mx-auto">
        <el-form-item>
          <label class="text-2xl">登录</label>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="account" v-model="formModule.account">
            <template #prepend>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="password" type="password" v-model="formModule.password">
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

<style lang="scss">
#appLoginPage {
  --el-color-white: #fff;
  --el-color-black: #000;
}
#appLoginPage::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -40%;
  background-image: url('@/assets/login-page-bg.svg');
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  content: '';
  z-index: -1;
}
</style>
