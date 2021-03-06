import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';
import logo from './assets/svg/logo_icon.svg'
const loginPath = '/gp/login';
import TabView from './components/TabViews';
import { useEffect } from 'react';
// import { testTest } from './api/test';


/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState () {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      // testTest(81)
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };


  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {

  return {
    // 配置iconfont的使用
    iconfontUrl: '//at.alicdn.com/t/font_3344568_z1lj2phbhr.js',
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // 水印设置
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {!props.location?.pathname?.includes('/login') && (<TabView />)}
          {children}
        </>

      );
    },
    ...initialState?.settings,
    logo: <img src={logo} />
  };
};
