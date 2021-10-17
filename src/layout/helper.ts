import variables from '@/style/variables.module.scss'
import { useAppStore } from '@/store/modules/app'
import { computed, ComputedRef } from 'vue'

// 计算Header高度
export function getAppHeaderHeight(): ComputedRef<number> {
  const appStore = useAppStore()
  const withPageTab = computed(() => appStore.getSetting.withPageTab)
  const { appHeaderStateHeight, appHeaderTabsHeight } = variables
  const appHeaderHeight = computed(() => {
    const stateHeight = Number.parseInt(appHeaderStateHeight.replace('px', ''))
    const tabsHeight = Number.parseInt(appHeaderTabsHeight.replace('px', ''))
    let headerHeight = stateHeight
    if (withPageTab.value) headerHeight += tabsHeight
    return headerHeight
  })
  return appHeaderHeight
}
