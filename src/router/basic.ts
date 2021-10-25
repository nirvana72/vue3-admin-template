import type { IAppRoute } from '@/router/types'
import { defaultLayout } from '@/router'

// login
const LOGIN: IAppRoute = {
  name: 'Login',
  path: '/login',
  component: () => import('@/views/login/index.vue'),
  meta: { title: '登录', hiddenTab: true },
}

// root
const ROOT: IAppRoute = {
  name: 'Home',
  path: '/',
  component: defaultLayout,
  redirect: '/home',
  meta: { title: 'Root', hiddenTab: true },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页', affix: true },
    },
  ],
}

const REDIRECT_ROUTE: IAppRoute = {
  name: 'Redirect',
  path: '/redirect',
  component: defaultLayout,
  meta: { title: 'Redirect', hiddenTab: true },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'RedirectTo',
      component: () => import('@/views/common/Redirect.vue'),
      meta: { title: 'Redirect', hiddenTab: true },
    },
  ],
}

// 404 on a page
const PAGE_NOT_FOUND: IAppRoute = {
  name: 'PageNotFound',
  path: '/:path(.*)*',
  component: defaultLayout,
  meta: { title: '页面找不到', hiddenTab: true },
  children: [
    {
      name: 'PageNotFound',
      path: '',
      component: () => import('@/views/exception/404.vue'),
      meta: { title: '页面找不到', hiddenTab: true },
    },
  ],
}

// error page
const ERROR_Log_PAGE: IAppRoute = {
  name: 'ErrorLogPage',
  path: '/error-log',
  component: defaultLayout,
  meta: { title: 'ErrorLogPage' },
  children: [
    {
      name: 'ErrorLogPage',
      path: '',
      component: () => import('@/views/exception/ErrorLog.vue'),
      meta: { title: '错误信息' },
    },
  ],
}

export default [ROOT, LOGIN, REDIRECT_ROUTE, ERROR_Log_PAGE, PAGE_NOT_FOUND]
