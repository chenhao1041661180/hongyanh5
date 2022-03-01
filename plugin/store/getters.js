const getters = {
  // 用户信息
  info: state => state.app.user.info,
  // 网络状态
  getNetwork: state => state.app.network
}
export default getters
