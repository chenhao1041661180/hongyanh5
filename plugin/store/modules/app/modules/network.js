// import util from '@/libs/util';

export default {
  namespaced: true,
  state: {
    // 网络状态
    isConnected: '',
    networkType: ''
  },
  getters: {
    /**
     * 返回网络状态
     * @param {Object} state vuex state
     */
    getNetwork(state) {
      return state
    }
  },
  actions: {
    /**
     * @description 监听网络状态变化
     * @param {Object} state vuex state
     */
    load({
      state,
      dispatch
    }) {
      return new Promise(async resolve => {
        // store 赋值
        uni.getNetworkType({
          success: res => {
            state.isConnected = res.networkType !== 'none';
            state.networkType = res.networkType;
            // console.log(state.isConnected);
            // console.log(state.networkType);
          }
        });
        uni.onNetworkStatusChange(res => {
          // console.log(res.isConnected);
          // console.log(res.networkType);
          // isConnected 当前是否有网络连接
          // networkType 网络类型 none无网络
          // Object.assign(state, res);
          state.isConnected = res.isConnected;
          state.networkType = res.networkType;
        });
        // end
        resolve()
      })
    }
  },
}
