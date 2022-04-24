export default [
  {
    path: '/gp',
    layout: false,
    routes: [
      { path: '/gp', redirect: '/gp/login' },
      { path: '/gp/login', name: '登录', component: './Login' },
      {
        component: './404',
      },
    ]

  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '测试页面',
    icon: 'icon-ceshi',
    path: '/test',
    routes: [
      { path: '/test', redirect: '/test/list' },
      { path: '/test/list', name: '列表页面', icon: 'icon-24gl-playlistHeart2', component: './test/list' },
      { path: '/test/form', name: '表单页面', icon: 'icon-jurassic_add-form', component: './test/form' }
    ]
  },
  // {
  //   name: '测试列表页面',
  //   icon: 'icon-ceshi',
  //   path: '/test',
  //   component: './test',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
