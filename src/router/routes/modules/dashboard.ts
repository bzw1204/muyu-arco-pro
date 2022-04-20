export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/layout/default-layout.vue'),
  meta: {
    locale: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '工作台',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
