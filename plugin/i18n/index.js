import Vue from 'vue'
import VueI18n from 'vue-i18n'
import setting from '@/setting'
import store from '@/plugin/store'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = {
        ...locales(key)
      }
    }
  })
  return messages
}

const messages = loadLocaleMessages()

const i18n = new VueI18n({
  locale: setting.app_i18n_locale || 'zh_cn',
  fallbackLocale: setting.app_i18n_fallback_locale,
  messages
})

Vue.prototype.$languages = Object.keys(messages).map(langlage => ({
  label: messages[langlage]._name,
  value: langlage
}))

Vue.prototype.$getLocale = (title) => {
  const hasKey = i18n.te(title)
  if (hasKey) {
    const translatedTitle = i18n.t(title)
    if (translatedTitle) {
      return translatedTitle
    }
  }
  return i18n.tc(title, 1, 'zh_cn')
}

Vue.prototype.$i18nMsg = () => {
  return i18n.messages[i18n.locale]
}

Vue.prototype._i18n = i18n

// 状态管理器保存
store.dispatch('app/languages/init', i18n)

export default i18n
// module.exports = i18n
