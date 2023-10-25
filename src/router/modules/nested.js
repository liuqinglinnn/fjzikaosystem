/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: '编排管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      component: () => import('@/views/nested/menu1/index'),
      meta: { title: '专业设置' }
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '专业主考学校' }
    },
    {
      path: 'menu3',
      name: 'Menu3',
      component: () => import('@/views/nested/menu3/index'),
      meta: { title: '编排管理' }
    }
  ]
}

export default nestedRouter
