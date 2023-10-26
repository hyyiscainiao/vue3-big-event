import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
// 登录访问拦截=>默认是直接放行
// 数据返回值决定是放行还是拦截
// 返回值：
// 1、undefined/true直接放行
// 2、false 拦回到from的地址页面
// 3、具体路径或者路径对象，拦截到对应的地址
// '/login'  (name:'login')
router.beforeEach((to) => {
  const userStore = useUserStore()
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  // 只有登录页，可以未授权的时候访问，其他所有页面，都需要先登录再访问
  if (!userStore.token && to.path != '/login') return '/login'
})

// router.beforeEach((to) => {

//   const useStore = useUserStore()
//   if (!useStore.token && to.path !== '/login') return '/login'
// })

export default router
