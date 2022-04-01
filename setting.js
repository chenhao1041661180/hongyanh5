// 根据原生壳切换环境
import uniStore from './libs/tools/util.store/index.js'
const userToken = uniStore.getStorage('user-token') || {}
// console.log(userToken)
let userTokenDomain = ''

// 热更新重启处理
if (userToken.domain) {
  userTokenDomain = userToken.domain
}

// #ifdef APP-PLUS
const info = plus.runtime.arguments
if (isJSON(info)) {
  userTokenDomain = JSON.parse(info).domain
}
// #endif

function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

function _formatUrl(baseUrl, url) {
  if (!baseUrl) return url
  let formatUrl = ''
  const baseUrlEndsWithSlash = baseUrl.endsWith('/')
  const urlStartsWithSlash = url.startsWith('/')
  if (baseUrlEndsWithSlash && urlStartsWithSlash) {
    formatUrl = baseUrl + url.substring(1)
  } else if (baseUrlEndsWithSlash || urlStartsWithSlash) {
    formatUrl = baseUrl + url
  } else {
    formatUrl = baseUrl + '/' + url
  }
  return formatUrl
}

function _formatUrls(baseUrl) {
  let formatUrl = ''
  const baseUrlEndsWithSlash = baseUrl.endsWith('/')
  if (baseUrlEndsWithSlash) {
    formatUrl = baseUrl.substring(0, baseUrl.length - 1)
  } else {
    formatUrl = baseUrl
  }
  return formatUrl
}

const CONFIG = {
  // 开发环境配置
  development: {
    // API地址
    // #ifdef H5
    base_url: '/',
    image_url: 'https://fp.hongyanfuli.com',
	  // image_url: 'http://175.24.203.118',
    // #endif
    // #ifndef H5
    base_url: '/api',
    image_url: window.location.origin,
    // image_url: 'http://ygzxapp.hs56.com',
    // #endif
    assetsPath: '/static/images' // 静态资源路径
  },

  // 生产环境配置
  production: {
    // API地址
    // #ifdef H5
    base_url: '/',
    // image_url: 'http://175.24.203.118',
    image_url: 'https://fp.hongyanfuli.com',
    // #endif
    // #ifndef H5
    // 使用原生壳url http://ygzx.hongshigroup.com
    base_url: userTokenDomain ? _formatUrl(userTokenDomain, '/api') : 'http://ygzxapp.hs56.com/api',
    // #endif
    assetsPath: '/static/images' // 静态资源路径
  }
}

export default {
  ...CONFIG[process.env.NODE_ENV],
  // integrated {boolean} 是否集成微应用
  integrated: true,
  // 国际化配置
  app_i18n_locale: 'zh_cn',
  app_i18n_fallback_locale: 'en_us'
}
