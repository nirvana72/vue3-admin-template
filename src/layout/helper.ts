import variables from '@/style/variables.module.scss'
import { useAppStore } from '@/store/modules/app'
import { computed, ComputedRef } from 'vue'

// 计算Header高度
export function getAppHeaderHeight(): ComputedRef<number> {
  const appStore = useAppStore()
  const withHeaderStateBar = computed(() => appStore.getSetting.showHeaderStateBar)
  const withHeaderTabBar = computed(() => appStore.getSetting.withPageTab)
  const { appHeaderStateHeight, appHeaderTabsHeight } = variables
  const appHeaderHeight = computed(() => {
    let headerHeight = 0
    if (withHeaderStateBar.value) {
      headerHeight += Number.parseInt(appHeaderStateHeight.replace('px', ''))
    }
    if (withHeaderTabBar.value) {
      headerHeight += Number.parseInt(appHeaderTabsHeight.replace('px', ''))
    }
    return headerHeight
  })
  return appHeaderHeight
}
