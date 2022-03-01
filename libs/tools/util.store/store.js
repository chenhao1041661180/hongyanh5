// 本地存储的封装设计
function Store() {

};
Store.prototype = {
	constructor: Store,
	// 存储
	setStorage: function(val, time) {
		throw new Error('please extends Store Class then use!')
	},
	getStorage: function() {
		throw new Error('please extends Store Class then use!')
	},
	removeStorage: function() {
		throw new Error('please extends Store Class then use!')
	},
	clearStorage: function() {
		throw new Error('please extends Store Class then use!')
	},
}
var proxyStore = function(fn) {
	return {
		setStorage: function(key, val, time) {
			if (!key) {
				return;
			}
			const now = (new Date()).getTime();
			var lasttime;
			if (time) {
				lasttime = now + (~~time);
			}
			fn.setStorage(key, {
				data: val,
				lasttime: lasttime
			})
		},
		getStorage: function(key) {
			if (!key) {
				return;
			}
			try {
				var val = fn.getStorage(key);
			} catch (e) {
				console.error('fn.getStorage is not function!')
			}
			const now = (new Date()).getTime();
			if (val) {
				if (val.lasttime >= now || val.lasttime == undefined) {
					return val.data
				} else {
					this.removeStorage(key)
					return false;
				}
			} else {
				return;
			}
		},
		removeStorage: function(key) {
			if (!key) {
				return;
			}
			try {
				fn.removeStorage(key);
			} catch (e) {
				console.error('fn.removeStorage is not function!')
			}
		},
		clearStorage: function() {
			fn.clearStorage();
		}
	}
}

exports.Store = Store;
exports.proxyStore = proxyStore;
