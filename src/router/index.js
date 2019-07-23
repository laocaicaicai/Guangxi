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
  // 专题产品
  {
    path: '/topicProduct',
    component: Layout,
    children: [
      
       {
      path: 'pmTwo',
      component: () => import('@/views/topicProduct/pmTwo') //pm2.0
    },
    {
      path: 'pmTen',
      component: () => import('@/views/topicProduct/pmTen') //pm2.0
    },{
     
      path: 'aodOptics',
      component: () => import('@/views/topicProduct/aodOptics')
    },
    {
     
      path: 'satellite',
      component: () => import('@/views/topicProduct/satellite')
    },
    {
     
      path: 'firePoint',
      component: () => import('@/views/topicProduct/firePoint')
    },
    {
      path: 'ozone',
      component: () => import('@/views/topicProduct/ozone') //pm2.0
    },

    {
     
      path: 'bareLand',
      component: () => import('@/views/topicProduct/bareLand')
    },
    
    {
      path: 'HotspotNetwork',
      component: () => import('@/views/topicProduct/HotspotNetwork')
    }

   
  
  ]
  }
  ,
  //  统计分析

  {
    path: '/statisticalanalysis',
    component: Layout,
    children: [
      {
        path: 'pmTwo',
        component: () => import('@/views/statisticalanalysis/pmTwo') //pm2.0
      },
      {
        path: 'pmTen',
        component: () => import('@/views/statisticalanalysis/pmTen') //pm2.0
      },
      {
        path: 'ozone',
        component: () => import('@/views/statisticalanalysis/ozone') //pm2.0
      },
      {
        path: 'FireProducts',
        component: () => import('@/views/statisticalanalysis/FireProducts') //pm2.0
      },
      {
        path: 'Bareland',
        component: () => import('@/views/statisticalanalysis/Bareland') //pm2.0
      },
      {
        path: 'hotspotGrid',
        component: () => import('@/views/statisticalanalysis/hotspotGrid') //pm2.0
      }, {
        path: 'aod',
        component: () => import('@/views/statisticalanalysis/aod') //pm2.0
      },
    
    ]
  },

  {
    path: '/reportShow',
    component: Layout,
    children: [
      {
        path: 'report',
        component: () => import('@/views//reportShow/index') //pm2.0
      }]
    },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    hidden: true
  },
  
  {
    path: '/3dMap',
    component: Layout,
    children: [{
    
      path:"index",
      component: () => import('@/views/3dMap/index')
     
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // // 404 page must be placed at the end !!!
  { path: '/', redirect: '/3dMap/index', hidden: true }
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
