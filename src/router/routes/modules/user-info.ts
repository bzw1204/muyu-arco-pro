export default {
  path: 'user',
  name: 'user',
  component: () => import('@/layout/default-layout.vue'),
  meta: {
    locale: '用户信息',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: 'info',
      name: 'info',
      component: () => import('@/views/user/info.vue'),
      meta: {
        locale: '个人信息',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
