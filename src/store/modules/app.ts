import { Nullable } from 'element-plus/es/utils/types'
import { defineStore } from 'pinia'
import appSettings, { AppSettings } from '@/settings'
import { useLocalStorage } from '@vueuse/core'

export const enum EMenuState {
  FOLD = 'fold',
  EXPAND = 'expand',
}

interface IAppState {
  menuState: EMenuState
  setting: Nullable<AppSettings>
}

export const useAppStore = defineStore({
  id: 'store-app',
  state: (): IAppState => ({
    menuState: EMenuState.EXPAND,
    setting: null,
  }),
  getters: {
    getMenuState(): EMenuState {
      return this.menuState
    },
    getSetting(): AppSettings {
      if (this.setting === null) {
        const store = useLocalStorage<AppSettings>('app-settings', appSettings)
        this.setting = store.value
      }
      return this.setting
    },
  },
  actions: {
    toggleMenuState(): void {
      this.menuState = this.menuState === EMenuState.FOLD ? EMenuState.EXPAND : EMenuState.FOLD
    },
    setMenuState(state: EMenuState): void {
      this.menuState = state
    },
    reset() {
      // eslint-disable-next-line no-console
      console.log('AppStore.reset')
    },
  },
})
