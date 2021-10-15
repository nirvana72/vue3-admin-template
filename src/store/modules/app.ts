import { Nullable } from 'element-plus/es/utils/types'
import { defineStore } from 'pinia'
import appSettings, { AppSettings } from '@/settings'
import { useLocalStorage } from '@vueuse/core'

export const enum MenuState {
  FOLD = 'fold',
  EXPAND = 'expand',
}

interface AppState {
  menuState: MenuState
  setting: Nullable<AppSettings>
}

export const useAppStore = defineStore({
  id: 'store-app',
  state: (): AppState => ({
    menuState: MenuState.EXPAND,
    setting: null,
  }),
  getters: {
    getMenuState(): MenuState {
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
      this.menuState = this.menuState === MenuState.FOLD ? MenuState.EXPAND : MenuState.FOLD
    },
    setMenuState(state: MenuState): void {
      this.menuState = state
    },
    reset() {
      // eslint-disable-next-line no-console
      console.log('AppStore.reset')
    },
  },
})
