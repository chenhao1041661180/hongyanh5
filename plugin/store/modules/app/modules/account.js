// import util from '@/libs/util';
// import router from '@/router'

// import {
//   loginUser,
//   getUserInfo
// } from '@/api/login';
import md5 from 'blueimp-md5'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param code {String} 验证码
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     */
    login({
      dispatch
    }, {
      username,
      password
    } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        uni.$api.login.loginUser({
            empNo: username,
            password: md5(password),
            mark: 'app',
            // code: code.toUpperCase()
          })
          .then(async res => {
            // 整个系统依赖这两个数据进行校验和存储
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            uni.$util.token.set(res.data)
            // console.log(res)
            // 清空用户信息
            await dispatch('app/user/set', {}, { root: true })
            // 修改密码 不请求用户信息
            if (res.status === 200) {
              await dispatch('GetUserInfo')
            }
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // uni.$util.uniStore.setStorage('uuid', 'admin-' + (res.data.userId || 'uuid'))
            // console.log(uni.$util.uniStore.getStorage('uuid'))
            resolve(res)
          })
          .catch(err => {
            reject(err)
            // console.log('err: ', err)
          })
      })
    },
    /**
     * @description 获取用户信息
     */
    GetUserInfo({ dispatch }) {
      return new Promise((resolve, reject) => {
        uni.$api.login.getUserInfo().then(async response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          uni.$util.uniStore.setStorage('uuid', 'admin-' + (data.userId || 'uuid'))

          // 设置 vuex 用户信息
          await dispatch('app/user/set', {
            ...data
          }, { root: true })

          // 用户登录后从持久化数据加载一系列的设置
          await dispatch('load')
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * @description 前端注销
     */
    FedLogOut({
      dispatch
    }) {
      return new Promise(async resolve => {
        uni.$util.uniStore.removeStorage('uuid');
        uni.$util.token.remove()
        await dispatch('app/user/set', {}, {
          root: true
        })
        uni.reLaunch({
          url: '/pages/my/login/login'
        });
        // router.replaceAll({ name: 'login' })
        // router.replaceAll({ path: '/pages/my/login/login' })
        resolve()
      })
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load({
      commit,
      dispatch
    }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户信息
        await dispatch('app/user/load', null, {
          root: true
        })
        // DB -> store 加载网络状态
        await dispatch('app/network/load', null, {
          root: true
        })
        // DB -> store 加载语言
        await dispatch('app/languages/load', null, {
          root: true
        })
        // end
        resolve()
      })
    }
  }
}
