import Vue from 'vue'
// 全局过滤器
// import filters from '../filters/index.js'
import * as filters from '../filters/index.js'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 功能插件
// 路由
import router from '../router/index.js'

// 模拟数据
import '../mock/index.js'

// 全局方法
import util from '@/libs/util.js'
uni.$util = util

uni.$dayjs = require('dayjs')

// uni.$lodash = require('@/libs/lodash.min.js')

Vue.prototype.lodash = (title) => {
  return require('@/libs/lodash.min.js')
}

// 多国语
import i18n from '../i18n/index.js'
uni.$i18n = i18n

// Api 全局接口
const _apiFiles = require.context('@/api', false, /\.js$/)
const _api = {}
_apiFiles.keys().forEach(key => {
  _api[key.replace(/(\.\/|\.js)/g, '')] = _apiFiles(key)
})
uni.$api = _api

// 当前环境
// uni.$env = process.env

export default {
  async install(Vue, options) {
    // Vue.use(filters)
    Vue.use(router)
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    Vue.config.productionTip = false
  }
}
