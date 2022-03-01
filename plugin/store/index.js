import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  getters
})

// 挂载i18n
store.$getLocale = (title) => {
  const hasKey = uni.$i18n.te(title)
  if (hasKey) {
    const translatedTitle = uni.$i18n.t(title)
    if (translatedTitle) {
      return translatedTitle
    }
  }
  return uni.$i18n.tc(title, 1, 'zh_cn')
}

export default store
