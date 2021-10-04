import { defineStore } from 'pinia'
import { LocationQuery, RouteLocationNormalized, RouteParams, Router } from 'vue-router'
import { unref } from 'vue'
import { cloneDeep } from 'lodash'

export interface TabStoreItem {
  title: string
  name: string
  path: string
  affix: boolean
  keepAlive: boolean
  params: RouteParams // 刷新重定向时, 带上这两参数
  query: LocationQuery // 刷新重定向时, 带上这两参数
}

interface PageTabsState {
  tabList: TabStoreItem[]
  cacheList: Set<string>
  isTabSwitch: boolean // 是否切换tab标识, tab切换时无需走 addTab 逻辑
}

export const useTabsStore = defineStore({
  id: 'store-page-tabs',
  state: (): PageTabsState => ({
    tabList: [],
    cacheList: new Set(),
    isTabSwitch: false,
  }),
  getters: {
    getTabList(): TabStoreItem[] {
      return this.tabList
    },
    getCacheList(): string[] {
      return Array.from(this.cacheList)
    },
  },
  actions: {
    setIsTabSwitch(flag: boolean) {
      this.isTabSwitch = flag
    },
    initAffixTabs(router: Router) {
      router.getRoutes().forEach((r) => {
        if (r.meta.affix === true) {
          this.addTab(r as unknown as RouteLocationNormalized)
        }
      })
    },
    updateCacheList() {
      const cacheMap: Set<string> = new Set()
      for (const tab of this.tabList) {
        if (tab.keepAlive) {
          cacheMap.add(tab.name)
        }
      }
      this.cacheList = cacheMap
    },
    addTab(route: RouteLocationNormalized) {
      if (this.isTabSwitch) {
        this.isTabSwitch = false
        return
      }
      const { path, name, fullPath, meta, params, query } = route
      if (meta.hiddenTab === true) return
      /**
      path 跳转带不同参数会生成多个标签
      router.push({ path: '/index' })
      router.push({ path: '/index', query: { a: 1 }})
      router.push({ path: '/index', query: { a: 2 }})
      name 跳转则不会
      router.push({ name: 'Index' })
      router.push({ name: 'Index', params: { a: 1 }})
      */
      const cachePath = fullPath || path
      const tabHasExits = this.tabList.some((tab) => {
        return tab.path === cachePath
      })

      if (!tabHasExits) {
        this.tabList.push({
          name: name as string,
          path: cachePath,
          title: meta.title as string,
          affix: !!meta.affix,
          keepAlive: meta.keepAlive !== false,
          params,
          query,
        })
      }

      this.updateCacheList()
    },
    closeTab(tab: TabStoreItem, router: Router) {
      const close = (tab: TabStoreItem) => {
        const index = this.tabList.findIndex((item) => item.path === tab.path)
        if (index !== -1) {
          this.tabList.splice(index, 1)
          this.updateCacheList()
        }
      }

      const { currentRoute, replace } = router
      const { path, fullPath } = unref(currentRoute)
      if (path !== tab.path) {
        // 关闭非当前 tab
        close(tab)
        return
      }

      // 当前 tab 处于哪个位置
      const index = this.tabList.findIndex((item) => item.path === (fullPath || path))
      let nextPath = ''
      if (index === 0) {
        // 当前 tab 处于第一个
        if (this.tabList.length === 1) {
          // 是唯一一个, 跳转到主页
          nextPath = '/'
        } else {
          // 右边还有, 转到右边一个tab
          nextPath = this.tabList[index + 1].path
        }
      } else {
        // 跳转到左边 tab
        nextPath = this.tabList[index - 1].path
      }
      close(tab)
      replace(nextPath)
    },
    findTabByRoute(route: RouteLocationNormalized): TabStoreItem | undefined {
      const { path, fullPath } = route
      const tabKey = fullPath || path
      return this.tabList.find((el) => el.path === tabKey)
    },
    closeTabByRouter(router: Router) {
      const findTab = this.findTabByRoute(router.currentRoute.value)
      if (findTab) {
        this.closeTab(findTab, router)
      }
    },
    closeOtherTabs(remainTab: TabStoreItem, router: Router) {
      const { path } = remainTab
      this.tabList = this.tabList.filter((tab) => tab.affix || tab.path === path)
      this.updateCacheList()
      router.replace(path)
    },
    closeAll(router: Router) {
      this.tabList = this.tabList.filter((tab) => tab.affix)
      this.updateCacheList()
      const target = this.tabList.length > 0 ? this.tabList[0].path : '/'
      router.replace(target)
    },
    refreshPage(tab: TabStoreItem, router: Router) {
      const { name, path, params: _params = {}, query = {} } = tab
      this.cacheList.delete(name)

      const params = cloneDeep(_params)
      if (Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = path
      }
      router.push({ name: 'RedirectTo', params, query })
    },
    setTitle(title: string, router: Router) {
      const findTab = this.findTabByRoute(router.currentRoute.value)
      if (findTab) {
        if (title.indexOf('~') >= 0) {
          findTab.title = title.replace('~', findTab.title)
        } else {
          findTab.title = title
        }
      }
    },
    reset() {
      // eslint-disable-next-line no-console
      console.log('TabsStore.reset')
      this.tabList = []
      this.cacheList = new Set()
      this.isTabSwitch = false
    },
  },
})
