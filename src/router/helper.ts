import type { IAppRoute, IAppMenu } from '@/router/types'
import type { Router, RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { sortBy } from 'lodash'
import { hasAuth } from '@/directives/auth'

// 根据权限列表，过滤出可用的路由
export function filterRoutesWithAuths(list: IAppRoute[]): IAppRoute[] {
  const ret: IAppRoute[] = []
  list.forEach((r) => {
    if (r.children && r.children.length > 0) {
      r.children = filterRoutesWithAuths(r.children)
    }
    const isApply = (!r.children || r.children.length > 0) && (!r.auth || hasAuth(r.auth))
    if (isApply) {
      ret.push(r)
    }
  })
  return ret
}

// 将路由对象转成菜单对像
export function transformRouteToMenu(hideSingleChildMenu: boolean, routes: IAppRoute[], parentPath = ''): IAppMenu[] {
  let menuList: IAppMenu[] = []

  routes.forEach((route) => {
    const {
      meta: { title: label, icon = '', hiddenMenu = false, orderNo },
      path,
      children: subRouters,
    } = route

    if (hiddenMenu !== true) {
      const slash = path.startsWith('/') ? '' : '/'
      const menu: IAppMenu = {
        label,
        path: `${parentPath}${slash}${path}`,
        icon,
        orderNo,
        children: [],
      }

      if (subRouters && subRouters.length > 0) {
        menu.children = transformRouteToMenu(hideSingleChildMenu, subRouters, menu.path)
      }

      // 只有一个子菜单情况下，把子菜单上提
      if (hideSingleChildMenu && menu.children && menu.children.length === 1) {
        const child = menu.children[0]
        child.orderNo = menu.orderNo
        child.icon = menu.icon
        menuList.push(child)
      } else {
        menuList.push(menu)
      }
    }
  })
  // 排序
  menuList = sortBy(menuList, (o) => o.orderNo || 0)

  return menuList
}

// 将2级以上路由转成2级路由
export function flatMultiLevelRoutes(routeModules: IAppRoute[]): IAppRoute[] {
  for (let index = 0; index < routeModules.length; index++) {
    const routeModule = routeModules[index]
    if (isMultipleRoute(routeModule)) {
      flatRouteLevel(routeModule)
    }
  }
  return routeModules
}

// 判断是否为2级以上路由
function isMultipleRoute(routeModule: IAppRoute): boolean {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 转换路由层级
function flatRouteLevel(routeModule: IAppRoute): void {
  const router: Router = createRouter({
    routes: [routeModule as unknown as RouteRecordRaw],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)

  routeModule.children = routeModule.children?.map((item) => {
    delete item.children
    return item
  })
}

function addToChildren(routes: RouteRecordNormalized[], children: IAppRoute[], routeModule: IAppRoute) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as IAppRoute)
    }
    if (child.children?.length) {
      // 递归处理所有子路由
      addToChildren(routes, child.children, routeModule)
    }
  }
}
