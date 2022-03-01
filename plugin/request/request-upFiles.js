/**
 * 文件上传
 * 
 */

import request from './index.js';

/**
 * 代理控制
 */
const ProxyControll = (obj, callback = (key, val, oldval) => {}) => {
	for (let key in obj) {
		let itemval = obj[key];
		Object.defineProperty(obj, key, {
			enumerable: true,
			get: function() {
				return this[`HHYANG_${key}`]
			},
			set: function(newvalue) {
				callback(key, newvalue, this[`HHYANG_${key}`]);
				this[`HHYANG_${key}`]= newvalue;
			}

		})
		obj[key] = itemval;
	}
}

// 是否在上传js中引入下载的js
let _isUpOpenDown = false;

let _defaultFile = {
	filesFilter: {
		0: 'image',
		1: 'video',
		2: 'none'
	},
	upOpenDown: false
}
let _down = null; // 下载文件对象

class UpFiles {
	constructor(...arg) {
		this.platform = this.platformChunk();
		this.defaultFile = _defaultFile;
		this.FunChunk = {
			0: this.AppSelectFiles,
			1: this.otherSelectFiles
		};
		this.proxy(this.defaultFile, (key, value) => {
			// console.log(key)
			if (key === 'upOpenDown' && value === true) {
				if (_down !== null) {
					return console.error(`'${key}' property is set repeatedly`, this);
				}
				_down = require('./request-downFiles.js').default;
			}
		});
	}
	set isUpOpenDown(value) {
		_isUpOpenDown = value;
	}
	get isUpOpenDown() {
		return _isUpOpenDown;
	}
	/**
	 * 开始上传文件
	 */
	startUpFiles({
		path = '',
		files = [],
		isUp = true,
		title = false,
		_ADMININDEX = null,	
		data = {},
		abort = bt => {},
		...args
	} = {}, res) {
		return new Promise(async (resolve, reject) => {
			let upres = [];
			let filePath = [];
			if (isUp) { // 需要上传到服务器，然后再返回
				if (title) {
					uni.showLoading({
						title,
						mask: true,
					});
				}
				for (let i = 0; i < res.length; i++) {
					let fileName = files[i] !== undefined ? files[i] : (files[files.length - 1] || 'file');
					try {
						const response = await request.upload('/platform/fileApi/upload', {
							index: _ADMININDEX || i,
							filePath: res[i],
							name: fileName,
							abort,
							data,
							args: args
						})
						upres.push(
							response.data
						)
						filePath.push(
							res[i]
						)
					} catch (error) {
						reject(error)
						// upres.push(error)
					}
				}
				if (title) {
					uni.hideLoading();
				}
				resolve({
					uploaded: true,
					upres,
					filePath
				});
			}
			return resolve(res);
		})
	}
	/**
	 * 上传网络资源
	 */
	upnNetRes({
		netPath = '',
		files = [],
		abort = (finsh,bt) => {},
		title = false,
		data = {},
		...args
	} = {}) {
		return new Promise(async (resolve, reject) => {
			const obj = {
				uploaded: true,
				upres:[]
			};
			if(netPath.constructor===String){
				netPath = netPath.split(',');
			}
			for (let i = 0; i < netPath.length; i++) {
				try {
					const res = await _down.startDownFiles({
						path: [netPath[i]],
						...args
					});
					const uploadRes = await this.startUpFiles({
						_ADMININDEX: i,
						files,
						isUp: true,
						abort,
						title,
						data,
						...args
					}, res.FilePath);
					obj.upres.push(uploadRes.upres[0])
				} catch (e) {
					obj.upres.push(e)
				}
			}
			resolve(obj);
		})
	}
	/**
	 * 选择文件
	 */
	selectFiles({
		type = 2,
		isUp=true,
		maximum = 1,
		multiple = true,
		sizeType = ['original', 'compressed'],
		sourceType = ['album','camera'],
		upload = {
			path: '',
			files: [],
			isUp: false,
			title: false,
			abort: bt => {},
			data: {}
		},
		...extra
	} = {}) {
		return new Promise(async (resolve, reject) => {
			let merge = {
				type,
				maximum,
				sizeType,
				sourceType,
				multiple,
				...extra,
			}
			// const res = await this.FunChunk[this.platform](merge);
			const res = await this.otherSelectFiles(merge);
			if(!isUp){
				return resolve(res);
			}
			try {
				const uploadRes = await this.startUpFiles(upload, res);
				resolve(uploadRes);
			} catch (e) {
				reject(e);
			}
		})
	}
	/**
	 * App选择文件
	 */
	AppSelectFiles(queryInfo) {
		return new Promise(async (resolve, reject) => {
			plus.gallery.pick(path => {
				resolve(path.files);
			}, err => {
				reject(err);
			}, {
				filter: _defaultFile.filesFilter[queryInfo.type],
				system: false,
				...queryInfo
			});
		})
	}
	/**
	 * 其他小程序，h5
	 */
	otherSelectFiles(queryInfo) {
		return new Promise(async (resolve, reject) => {

			// #ifdef APP-PLUS
			// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			if (queryInfo.sourceType.length !== 2) {
				let status = await this.checkPermission(null, queryInfo.sourceType);
				if (status !== 1) {
					reject(status)
					return;
				}
			}
			// #endif

			uni.chooseImage({
				count: queryInfo.maximum,
				success: res => {
					resolve(res.tempFilePaths);
				},
				fail: err => {
					// #ifdef APP-PLUS
					if (err['code'] && err.code !== 0 && queryInfo.sourceType.length === 2) {
						this.checkPermission(err.code, queryInfo.sourceType);
					}
					// #endif
					
					// #ifdef MP
					uni.getSetting({
						success: (res) => {
							let authStatus = false;
							// switch (queryInfo.sourceType.length) {
							// 	case 0:
							// 		authStatus = res.authSetting['scope.camera'];
							// 		break;
							// 	case 1:
							// 		authStatus = res.authSetting['scope.album'];
							// 		break;
							// 	case 2:
							// 		authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
							// 		break;
							// 	default:
							// 		break;
							// }
							if (queryInfo.sourceType.length === 2) {
								authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
							}
							if (queryInfo.sourceType[0] === 'camera') {
								authStatus = res.authSetting['scope.camera'];
							}
							if (queryInfo.sourceType[0] === 'album') {
								authStatus = res.authSetting['scope.album'];
							}
							if (!authStatus) {
								uni.showModal({
									title: '授权失败',
									content: 'app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
									success: (res) => {
										if (res.confirm) {
											uni.openSetting()
										}
									}
								})
							}
						}
					})
					// #endif

					reject(err)
				},
				...queryInfo
			});
		})
	}
	
	/**
	 * 验证权限
	 */
	async checkPermission(code, sourceType) {
		const len = sourceType.length === 2 ? 2 : sourceType[0] === 'camera' ? 0 : sourceType[0] === 'album' ? 1 : 1;
		const type = code ? code - 1 : len;
		const sourceMap = [
			['camera'],
			['album'],
			['camera', 'album']
		]
		let status = uni.$util.permision.isIOS ? await uni.$util.permision.requestIOS(sourceMap[type][0]) :
			await uni.$util.permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
				'android.permission.READ_EXTERNAL_STORAGE');
		if (status === null || status === 1) {
			status = 1;
		} else {
			uni.showModal({
				content: "没有开启权限",
				confirmText: "设置",
				success: function(res) {
					if (res.confirm) {
						uni.$util.permision.gotoAppSetting();
					}
				}
			})
		}
		return status;
	}
	
	/**
	 * 设置代理
	 */
	proxy(obj, callback) {
		ProxyControll(obj, callback);
	}
	/**
	 * 运行环境判断
	 */
	platformChunk() {
		if (typeof plus == 'undefined') {
			return 1;
		}
		return 0;
	}
}

// if (!global.$upload) {
//   global.$upload = new UpFiles();
// }

// export default global.$upload;
export default new UpFiles();
