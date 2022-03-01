// import util from '@/libs/util';

export default {
	namespaced: true,
	state: {
		// 用户角色
		roles: ['user'],
		// 用户信息
		info: {},
		test: '0'
	},
	getters: {
		/**
		 * 返回所有资源权限
		 * @param {Object} state vuex state
		 */
		getInfo(state) {
			return state.info
		}
	},
	actions: {
		/**
		 * 将 调用方法
		 * @param {Object} state vuex state
		 */
		openadmindb({
			state,
			dispatch
		}) {
			return new Promise(async resolve => {
				console.log('test')
				// end
				resolve()
			})
		},
		/**
		 * @description 测试用的
		 * @param {Object} state vuex state
		 * @param {*} info info
		 */
		testSet({
			state,
			commit,
			dispatch
		}, info) {
			return new Promise(async resolve => {
				// store 赋值
				// state.test = info
				commit('testPush', info)
				await dispatch('openadmindb')
				// end
				resolve()
			})
		},
		/**
		 * @description 设置用户数据
		 * @param {Object} state vuex state
		 * @param {*} info info
		 */
		set({
			state,
			dispatch
		}, info) {
			return new Promise(async resolve => {
				// store 赋值
				// const { roles = [] } = info
				// state.roles = roles
				// delete info.roles
				state.info = info
				// 持久化
				uni.$util.uniStore.setStorage('user-info', info)
				// end
				resolve()
			})
		},
		/**
		 * @description 从数据库取用户数据
		 * @param {Object} state vuex state
		 */
		load({
			state,
			dispatch
		}) {
			return new Promise(async resolve => {
				// store 赋值
				state.info = uni.$util.uniStore.getStorage('user-info')
				// end
				resolve()
			})
		}
	},
	mutations: {
		/**
		 * @description 测试用的
		 * @param {Object} state vuex state
		 * @param {*} info info
		 */
		testPush(state, info) {
			// store 赋值
			state.test = info
		}
	}
}
