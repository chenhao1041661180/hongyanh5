export default {
  methods: {
    onChangeLocale(command) {
      uni.$i18n.locale = command
      console.log(uni.$i18n.locale)
      // let message = `当前语言：${this.$t('_name')} [ ${uni.$i18n.locale} ]`
    },
    getLocale(title) {
      const hasKey = uni.$i18n.te(title)
      if (hasKey) {
        const translatedTitle = uni.$i18n.t(title)
        if (translatedTitle) {
          return translatedTitle
        }
      }
      return uni.$i18n.tc(title, 1, 'zh_cn')
    }
  }
}
