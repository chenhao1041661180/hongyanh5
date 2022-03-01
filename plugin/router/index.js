// import util from '@/libs/util';

class Router {
  constructor(arg) {
    // 代理Util工具类
    // const $uni = new Proxy(uni, {});
    // $uni.util = util;
    // $uni.push = uni.navigateTo;
    // $uni.replace = uni.redirectTo;
    // $uni.replaceAll = uni.reLaunch;
    // $uni.pushTab = uni.switchTab;

    this.routers = arg
  }

  registerHook() {}
}

Router.methods = {
  push: uni.navigateTo,
  pushTab: uni.switchTab,
  replaceAll: uni.reLaunch,
  replace: uni.redirectTo
  // ajax: uni.request
}

// 不验证
Router.whiteList = ['pages/index/index', 'pages/my/login/login', '/pages/my/set']

Router.install = function(Vue) {
  // 路由拦截
  function _pushTo({
    url,
    ...arg
  } = {}, rule) {
    console.log('url：', url)
    Router.methods[rule]({
      url,
      ...arg,
      complete: (res) => {
        // console.log(res)
      }
    })
  }
  // 方法重写
  uni.navigateTo = (ags) => {
    // uni.push({
    // 	url: ags.url
    // })
    _pushTo(ags, 'push')
  }
  uni.switchTab = (ags) => {
    _pushTo(ags, 'pushTab')
  }
  uni.reLaunch = (ags) => {
    _pushTo(ags, 'replaceAll')
  }
  uni.redirectTo = (ags) => {
    _pushTo(ags, 'replace')
  }
  Vue.mixin({
    onLoad() {
    }
  })
  // Vue.mixin({
  //   created: function() {
  //     const mp = this.$mp;
  //     if (mp && mp.page) {
  //       const route = mp.page.route
  //       const token = util.token.get();
  //       if (Router.whiteList.indexOf(route) === -1 && !token) {
  //         // uni.reLaunch({
  //         // 	// url: '/pages/user/login/login?redirect=' + this.$mp.page.route,
  //         // 	url: '/pages/user/login/login'
  //         // });
  //         // 跳转登录
  //         // this.$store.dispatch('app/account/FedLogOut');
  //         // #ifdef APP-PLUS
  //         // util.loadingShow();
  //         // #endif
  //       }
  //     }
  //   }
  // })
}

// module.exports = {
//   name: 'test'
// }

export default Router
