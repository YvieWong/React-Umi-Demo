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
    hideInMenu: true,
    component: './Welcome',
  },
  // {
  //   name: '测试页面',
  //   icon: 'icon-ceshi',
  //   path: '/test',
  //   routes: [
  //     { path: '/test', redirect: '/test/list' },
  //     { path: '/test/list', name: '列表页面', icon: 'icon-24gl-playlistHeart2', component: './test/list' },
  //     { path: '/test/form', name: '表单页面', icon: 'icon-jurassic_add-form', component: './test/form' }
  //   ]
  // },
  {
    name: '成绩查询',
    icon: 'icon-chengjiguanli',
    path: '/score',
    // component: './account'
    component: './test/list'
  },
  {
    name: '成员管理',
    icon: 'icon-chengyuanguanli',
    path: '/member',
    component: './member'
  },
  {
    name: '应用管理',
    icon: 'icon-yingyongguanli',
    path: '/application',
    component: './application'
  },
  {
    name: '账号管理',
    icon: 'icon-zhanghaoguanli',
    path: '/account',
    component: './account'
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
