<template>
  <ul id="appHeaderStateTools">
    <li title="通知" class="mt-1">
      <ElBadge value="5">
        <Icon icon="akar-icons:bell" @click="notificationClick" />
      </ElBadge>
    </li>
    <li v-if="!isMobile" title="设置">
      <Icon icon="icon-park-outline:setting-config" @click="settingRef?.show()" />
    </li>
    <li v-if="!isMobile" title="全屏">
      <FullScreen />
    </li>
    <li title="暗黑模式">
      <DarkMode />
    </li>
    <li v-if="errorCount > 0" title="出错信息" class="mt-1">
      <ElBadge :value="errorCount">
        <Icon icon="ant-design:bug-filled" class="text-red-500" @click="showErrorInfo" />
      </ElBadge>
    </li>
    <li title="个人中心">
      <UserInfo />
    </li>
    <li title="github">
      <Icon icon="akar-icons:github-fill" @click="showGitHub" />
    </li>
  </ul>
  <AppSetting ref="settingRef" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import DarkMode from './darkmode.vue'
import FullScreen from './fullScreen.vue'
import UserInfo from './userInfo.vue'
import { Icon } from '@iconify/vue'
import AppSetting, { AppSettingModue } from '@/layout/setting/index.vue'
import { ElBadge, ElMessageBox } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppHeaderTools',
  components: { DarkMode, UserInfo, FullScreen, Icon, AppSetting, ElBadge },
  setup() {
    const appStore = useAppStore()
    const errorLogStore = useErrorLogStore()
    const settingRef = ref<AppSettingModue>()
    const errorCount = computed(() => errorLogStore.getErrorCount)
    const isMobile = computed(() => appStore.getSetting.isMobile)
    const router = useRouter()

    function notificationClick() {
      ElMessageBox.alert('websocket 未连接', { type: 'error' })
    }

    function showGitHub() {
      window.open('https://github.com/nirvana72/vue3-admin-template.git')
    }

    function showErrorInfo() {
      router.push('/error-log')
    }

    return {
      isMobile,
      errorCount,
      settingRef,
      showGitHub,
      notificationClick,
      showErrorInfo,
    }
  },
})
</script>
