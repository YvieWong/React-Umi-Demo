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
    path: '/admin',
    name: '用户权限',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '权限页面',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '列表页面',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: '测试页面',
    // icon: 'test',
    path: '/test',
    component: './test',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
