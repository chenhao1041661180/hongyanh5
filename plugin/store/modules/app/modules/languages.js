export default {
  namespaced: true,
  state: {
    // 语言列表
    list: [],
    // 默认语言
    active: 'zh_cn'
  },
  getters: {
    /**
     * 返回当前语言所有数据
     * @param {Object} state vuex state
     */
    activeSetting(state) {
      return state.list.find(e => e.value === state.active)
    }
  },
  actions: {
    /**
     * 默认语言 持久化
     * @param {Object} state vuex state
     */
    openappdb({
      state,
      dispatch
    }) {
      return new Promise(async resolve => {
        uni.$util.uniStore.setStorage('user-languages', state.active)
        uni.$i18n.locale = state.active
        // end
        resolve()
      })
    },
    /**
     * @description 初始化语言
     * @param {Object} state vuex state
     * @param {String} i18n 语言
     */
    init({ state, commit, dispatch }, i18n) {
      return new Promise(resolve => {
        // store 赋值
        const languages = Object.keys(i18n.messages).map(langlage => ({
          title: i18n.messages[langlage]._name,
          value: langlage
        }))
        state.list = languages || []
        state.active = i18n.locale || 'zh_cn'
        // end
        resolve()
      })
    },
    /**
     * @description 选择语言
     * @param {Object} state vuex state
     */
    select({ state, dispatch }) {
      return new Promise(resolve => {
        // store 赋值
        // #ifdef APP-PLUS
        plus.nativeUI.actionSheet({ title: '选择语言',cancel: '取消',buttons: state.list }, async (e) => {
          const label = state.list[e.index - 1] || {};
          state.active = label.value || 'zh_cn'
          // 持久化
          await dispatch('openappdb')
        })
        // #endif
        // end
        resolve()
      })
    },
    /**
     * @description 设置语言
     * @param {Object} state vuex state
     * @param {String} language 语言
     */
    set({ state, dispatch }, language) {
      // console.log(language)
      return new Promise(async resolve => {
        // store 赋值
        // 检查语言在列表里是否存在
        // state.active = state.list.find(e => e.value === language) ? language : state.list[0].value
        state.active = state.list.find(e => e.value === language) ? language : 'zh_cn'
        // 持久化
        await dispatch('openappdb')
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取语言
     * @param {Object} state vuex state
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        const active = uni.$util.uniStore.getStorage('user-languages')
        // 检查是否存在
        if (state.list.find(e => e.value === active)) {
          state.active = active
        } else {
          // state.active = state.list[0].value
          state.active = 'zh_cn'
        }
        // 持久化
        await dispatch('openappdb')
        // end
        resolve()
      })
    }
  }
}
