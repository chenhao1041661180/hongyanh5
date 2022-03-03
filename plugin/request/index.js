import request from './request.js'
import setting from '@/setting'
import store from '@/plugin/store'

// 全局配置
request.setConfig({
  baseUrl: setting.base_url,
  dataType: 'json',
  responseType: 'text',
  // 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
  header: {
    'content-type': 'application/json'
  }
})

// 设置请求拦截器
request.interceptors.request(config => {
  // 配置参数和全局配置相同，此优先级最高，会覆盖在其他地方的相同配置参数

  // 追加请求头，推荐
  // config.header['content-type'] = 'application/json';
  // config.header.token = 'token from interceptors';

  // 覆盖请求头
  // config.header = {
  // 'content-type': 'application/json',
  // 'token': 'token from interceptors'
  // }

  // const token = uni.$util.token.get()
  // if (token && token !== 'undefined') {
  //   config.header['Authorization'] = token
  //   config.header['token'] = token
  // }

  // 覆盖请求头
  config.header = {
    'Language': uni.$i18n.locale,
    'Authorization': uni.$util.token.get(),

    ...config.header
  }
  // return false; // 终止请求
  // return Promise.reject('error from request interceptors'); // 向外层抛出错误，用catch捕获
  return config // 返回修改后的配置，如未修改也需添加这行
})

// 设置响应拦截器
request.interceptors.response(response => {
  // 页面路由
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  // 接收请求，执行响应操作
  // 您的逻辑......

  // return false;    // 阻止返回,页面不会接收返回值
  // return {message: '自定义值，来自拦截器'};   // 返回您自定义的值，将覆盖原始返回值
  // return Promise.reject('error from response interceptors') // 向外层抛出错误，用catch捕获
  if (response.statusCode === 200) {
    if (uni.$util.isJSON(response.data)) {
      response.data = JSON.parse(response.data)
    }

    const dataAxios = response.data || {}
    // 这个状态码是和后端约定的
    const {
      status,
      message
    } = dataAxios
    // 根据 status 进行判断
    if (status === undefined) {
      return Promise.reject('error')
    } else {
      // 有 status 代表这是一个后端接口 可以进行进一步的判断
      switch (status) {
        case 200:
          return dataAxios
        // 修改密码
        case 5006:
          return dataAxios
        case 100610014:
          // 账户无所属组织
          uni.showToast({
            title: message,
            duration: 3000,
            icon: 'none'
          })
          // 开发环境才执行
          if (process.env.NODE_ENV === 'development') {
            store.dispatch('app/account/FedLogOut')
          }
          // 退出应用
          setTimeout(() => {
            uni.$util.native.backPress()
          }, 500)
          return Promise.reject('error')
        case 100019:
          // 热更新错误
          return Promise.reject('error')
        case 30401:
          // token失效
          if (page.route !== 'pages/my/login/login') {
            uni.showToast({
              title: message,
              duration: 3000,
              icon: 'none'
            })
            // 开发环境才执行
            if (process.env.NODE_ENV === 'development') {
              store.dispatch('app/account/FedLogOut')
            }
            // #ifdef APP-PLUS
            // 调用壳方法,跳转到登录页面
            setTimeout(() => {
              uni.$util.app.PluginLogin()
            }, 500)
            // #endif
          }
          return Promise.reject('error')
          // break
        default:
          // 不是正确的 code
          uni.showToast({
            title: message,
            duration: 2000,
            icon: 'none'
          })
          return Promise.reject(message)
          break
      }
    }

    // return response;
  } else {
    switch (response.statusCode) {
      case 301:
        response.message = '请求被转移'
        break
      case 400:
        response.message = '请求错误'
        break
      case 401:
        response.message = '未授权，请登录'
        break
      case 403:
        response.message = '拒绝访问'
        break
      case 404:
        response.message = '请求地址出错'
        break
      case 405:
        response.message = '不受支持的请求'
        break
      case 408:
        response.message = '请求超时'
        break
      case 413:
        response.message = '资源体积过大'
        break
      case 500:
        response.message = '服务器内部错误'
        break
      case 501:
        response.message = '服务未实现'
        break
      case 502:
        response.message = '网关错误'
        break
      case 503:
        response.message = '服务不可用'
        break
      case 504:
        response.message = '网关超时'
        break
      case 505:
        response.message = 'HTTP版本不受支持'
        break
      default:
        response.message = '连接服务器失败，请检查当前网络'
        break
    }
    uni.showToast({
      title: response.message,
      duration: 2000,
      icon: 'none'
    })
    return Promise.reject(response.message)
  }
})

export default request
