import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/core/IntegralGrade',
    component: Layout,
    redirect: '/IntegralGrade',
    children: [
      {
        path: 'IntegralGrade',
        name: 'IntegralGrade',
        component: () => import('@/views/core/IntegralGrade/list'),
        meta: { title: '积分展示', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/core/dict',
    component: Layout,
    redirect: '/dict',
    children: [
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/core/dict/dict'),
        meta: { title: '数据字典', icon: 'el-icon-zoom-in' },
      },
    ],
  },
  {
    path: '/core/userInfo',
    component: Layout,
    redirect: '/list',
    children: [
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('@/views/core/userInfo/list'),
        meta: { title: '用户列表', icon: 'el-icon-zoom-in' },
      },
    ],
  },
  {
    path: '/core/coreBorrower',
    component: Layout,
    redirect: '/list',
    children: [
      {
        path: 'coreBorrower',
        name: 'coreBorrower',
        component: () => import('@/views/core/coreBorrower/coreBorrower'),
        meta: { title: '审核', icon: 'el-icon-zoom-in' },
      },
    ],
  },
  {
    path: '/core/borrowerInfo',
    component: Layout,
    redirect: '/list',
    children: [
      {
        path: 'borrowerInfo',
        name: 'borrowerInfo',
        component: () => import('@/views/core/borrowerInfo/borrowerInfo.vue'),
        meta: { title: '借款人列表', icon: 'el-icon-zoom-in' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
