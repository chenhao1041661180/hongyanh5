export default {
  namespaced: true,
  state: {
    test: ''
  },
  getters: {
    /**
     * 返回
     * @param {Object} state vuex state
     */
    getInfo(state) {
      return state.test
    }
  },
  actions: {
    /**
     * @description 设置
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set({
      state,
      dispatch
    }, info) {
      return new Promise(async resolve => {
        state.test = info
        // end
        resolve()
      })
    }
  }
}
