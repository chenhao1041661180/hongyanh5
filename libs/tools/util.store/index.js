var store  = require('./store');
var extendsFn = require('./extend');
var Store = store.Store;
var proxyStore = store.proxyStore;
var UniStore = function(){
	Store.call(this);
}
extendsFn(UniStore,Store);

UniStore.prototype.getStorage = function(key){
	return uni.getStorageSync(key);
}
UniStore.prototype.setStorage = function(key,val){
	return uni.setStorageSync(key,val);
}
UniStore.prototype.removeStorage = function(key,val){
	return uni.removeStorageSync(key);
}
UniStore.prototype.clearStorage = function(){
	return uni.clearStorage();
}
var storage = proxyStore(new UniStore())

// 拓展方法
storage.getStorageV1 = (key) => {
	try {
		const now = (new Date()).getTime();
		var {
			lasttime,
			data
		} = uni.getStorageSync(key);
		if (!lasttime&&data) {
			return {status:1,data:data};
		}
		if (now <= lasttime&&data) {
			return {status:1,data:data};
		} else {
			try {
				uni.removeStorageSync(key);
			} catch (e) {
				return {status:0,data:data};
			}
			return {status:0,data:data};
		}
	} catch (e) {
		return {status:0,data:null}
	}

};

// module.exports = storage;
export default storage;