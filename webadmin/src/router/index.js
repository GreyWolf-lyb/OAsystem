import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '统计报表',
      component: () => import('@/views/home/index'),
      meta: { title: '统计报表', icon: 'icon-shouye' }
    }]
  },

  {
    path: '/apply',
    component: Layout,
    redirect: '/apply/work',
    name: '',
    meta: { title: '办事申请管理', icon: 'icon-17' },
    children: [
      {
        path: 'primary',
        name: 'Primary',
        component: () => import('@/views/apply/primary/index'),
        meta: { title: '办事申请初审', icon: 'icon-17' }
      },
      {
        path: 'work',
        name: 'Work',
        component: () => import('@/views/apply/work/index'),
        meta: { title: '办事申请', icon: 'icon-17' }
      },
      {
        path: 'workPage',
        name: 'WorkPage',
        component: () => import('@/views/apply/work/work.vue'),
        meta: { title: '办事申请', icon: 'icon-17' }
      },
      {
        path: 'preview',
        name: 'Preview',
        component: () => import('@/views/apply/work/preview.vue'),
        meta: { title: '预览', icon: 'icon-17' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/apply/list/index'),
        meta: { title: '申请列表', icon: 'icon-17' }
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/apply/list/details.vue'),
        meta: { title: '详情', icon: 'icon-17' }
      }
    ]
  },
  {
    path: '/eventmanage',
    component: Layout,
    redirect: '/eventmanage/conductView',
    name: '',
    meta: { title: '办理事项管理', icon: 'icon-shuzhuangtu' },
    children: [
      {
        path: 'conductView',
        name: 'conductView',
        component: () => import('@/views/eventmanage/conduct/conductView'),
        meta: { title: '办理事项管理', icon: 'icon-shuzhuangtu' }
      },
      {
        path: 'feedbackView',
        name: 'feedbackView',
        component: () => import('@/views/eventmanage/feedback/feedbackView'),
        meta: { title: '反馈证明模板', icon: 'icon-shuzhuangtu' }
      },
      {
        path: 'addEditDetails',
        name: 'addEditDetails',
        component: () => import('@/views/eventmanage/feedback/common'),
        meta: { title: '添加', icon: 'icon-shuzhuangtu' }
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/frameworkView',
    name: '',
    meta: { title: '系统管理', icon: 'icon-biaoge' },
    children: [
      {
        path: 'frameworkView',
        name: 'frameworkView',
        component: () => import('@/views/system/framework/frameworkView'),
        meta: { title: '组织机构管理', icon: 'icon-biaoge' }
      },
      {
        path: 'signatureView',
        name: 'signatureView',
        component: () => import('@/views/system/signature/signatureView'),
        meta: { title: '电子签章管理', icon: 'icon-biaoge' }
      },
      {
        path: 'classificationView',
        name: 'classificationView',
        component: () => import('@/views/system/classification/classificationView'),
        meta: { title: '人员分类', icon: 'icon-biaoge' }
      },
      {
        path: 'personnel',
        name: 'personnel',
        component: () => import('@/views/system/personnel/index'),
        meta: { title: '人员管理', icon: 'icon-biaoge' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'icon-biaoge' }
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/system/role/roleList'),
        meta: { title: '权限分配', icon: 'icon-biaoge' }
      },
      {
        path: 'journal',
        name: 'journal',
        component: () => import('@/views/system/journal/index'),
        meta: { title: '日志管理', icon: 'icon-biaoge' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/feedback',
    meta: { title: '反馈证明审批', icon: 'icon-wailian' },
    children: [
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('@/views/feedback/feedbackManage/index'),
        meta: { title: '反馈证明管理', icon: 'icon-wailian' }
      },
      {
        path: 'leader',
        name: 'leader',
        component: () => import('@/views/feedback/leader/index'),
        meta: { title: '领导审批', icon: 'icon-wailian' }
      },
      {
        path: 'details',
        name: 'details',
        component: () => import('@/views/feedback/feedbackManage/details'),
        meta: { title: '反馈证明详情', icon: 'icon-wailian' }
      },
      {
        path: 'feedbackLu',
        name: 'feedbackLu',
        component: () => import('@/views/feedback/feedbackLu/index'),
        meta: { title: '反馈证明记录', icon: 'icon-wailian' }
      },
      {
        path: 'feedbackLuDetails',
        name: 'feedbackLuDetails',
        component: () => import('@/views/feedback/feedbackLu/details'),
        meta: { title: '反馈证明详情', icon: 'icon-wailian' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
