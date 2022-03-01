export default {
	namespaced: true,
	state: {
		SocketState: {},
		SocketStateErr: {
			msg: '未连接',
			state: false
		}
	},
	mutations: {
		setSocketState(state, info) {
			state.SocketState = info
		},
		setSocketStateErr(state, info) {
			state.SocketStateErr = info
		}
	}
}
