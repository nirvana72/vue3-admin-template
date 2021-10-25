<template>
  <ul id="appHeaderStateTools">
    <li title="通知" class="mt-1">
      <ElBadge value="5">
        <app-icon icon="akar-icons:bell" @click="notificationClick" />
      </ElBadge>
    </li>
    <li v-if="!isMobile" title="设置">
      <app-icon icon="icon-park-outline:setting-config" @click="showAppSetting" />
    </li>
    <li v-if="!isMobile" title="全屏">
      <TheFullScreen />
    </li>
    <li title="暗黑模式">
      <TheDarkMode />
    </li>
    <li v-if="errorCount > 0" title="出错信息" class="mt-1">
      <ElBadge :value="errorCount">
        <app-icon icon="gridicons:bug" class="text-red-500" @click="showErrorInfo" />
      </ElBadge>
    </li>
    <li title="个人中心">
      <TheUserInfo />
    </li>
    <li title="github">
      <TheGitHub />
    </li>
  </ul>
  <TheAppSetting v-if="compHandler.async('appSettingRef')" ref="appSettingRef" />
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import TheDarkMode from './Darkmode.vue'
import TheFullScreen from './FullScreen.vue'
import TheUserInfo from './UserInfo.vue'
import TheGitHub from './GitHub.vue'
import { IAppSetting } from '@/layout/setting/index.vue'
import { ElBadge, ElMessageBox } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { useRouter } from 'vue-router'
import { useComponentHandler } from '@/utils/componentHandler'

export default defineComponent({
  name: 'AppHeaderTools',
  components: {
    TheDarkMode,
    TheUserInfo,
    TheFullScreen,
    TheGitHub,
    TheAppSetting: defineAsyncComponent(() => import('@/layout/setting/index.vue')),
    ElBadge,
  },
  setup() {
    const appStore = useAppStore()
    const errorLogStore = useErrorLogStore()

    const errorCount = computed<number>(() => errorLogStore.getErrorCount)
    const isMobile = computed<boolean>(() => appStore.getSetting.isMobile)
    const router = useRouter()

    function notificationClick() {
      ElMessageBox.alert('websocket 未连接', { type: 'error' })
    }

    function showErrorInfo() {
      router.push('/error-log')
    }

    const compHandler = useComponentHandler()
    function showAppSetting() {
      compHandler.getAsync<IAppSetting>('appSettingRef').then((comp) => comp.show())
    }

    return {
      isMobile,
      errorCount,
      notificationClick,
      showErrorInfo,
      showAppSetting,
      compHandler,
    }
  },
})
</script>
