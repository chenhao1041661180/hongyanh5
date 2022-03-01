import './libs/pc'
import Vue from 'vue'
import App from './App'

// 状态管理器
import store from '@/plugin/store'
Vue.prototype.$store = store
window.wx = {}

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)
// 核心功能
import MyApp from '@/plugin/app'
Vue.use(MyApp)

// vue才行
// Vue.config.errorHandler = function(err, vm, info, a) {
//   Vue.nextTick(() => {
//     console.log(err)
//   })
// }

App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
  mounted() {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('app/account/load')
  }
})
app.$mount()
