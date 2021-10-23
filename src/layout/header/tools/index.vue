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
      <FullScreen />
    </li>
    <li title="暗黑模式">
      <DarkMode />
    </li>
    <li v-if="errorCount > 0" title="出错信息" class="mt-1">
      <ElBadge :value="errorCount">
        <app-icon icon="ant-design:bug-filled" class="text-red-500" @click="showErrorInfo" />
      </ElBadge>
    </li>
    <li title="个人中心">
      <UserInfo />
    </li>
    <li title="github">
      <GitHub />
    </li>
  </ul>
  <AppSetting v-if="asyncComponentHandler.isLoad('appSettingRef')" ref="appSettingRef" />
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import DarkMode from './Darkmode.vue'
import FullScreen from './FullScreen.vue'
import UserInfo from './UserInfo.vue'
import GitHub from './GitHub.vue'
import { IAppSetting } from '@/layout/setting/index.vue'
import { ElBadge, ElMessageBox } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { useRouter } from 'vue-router'
import AsyncComponentHandler from '@/components/AsyncComponentHandler'

export default defineComponent({
  name: 'AppHeaderTools',
  components: {
    DarkMode,
    UserInfo,
    FullScreen,
    GitHub,
    AppSetting: defineAsyncComponent(() => import('@/layout/setting/index.vue')),
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

    const asyncComponentHandler = new AsyncComponentHandler()
    function showAppSetting() {
      asyncComponentHandler.load<IAppSetting>('appSettingRef').then((comp) => comp.show())
    }

    return {
      isMobile,
      errorCount,
      notificationClick,
      showErrorInfo,
      showAppSetting,
      asyncComponentHandler,
    }
  },
})
</script>
