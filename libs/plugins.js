/**
 * @author li
 * @description 原生壳通信 重新登陆: 1, 关闭uniapp加载动画: 2, 升级更新成功: 3, 关闭uni动画: 4, uni异常回调: 5
 *
 */

import setting from '@/setting.js'

!(function(root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define(factory)
  } else {
    // 5+ 兼容
    document.addEventListener('plusready', function() {
      // 插件名称
      var moduleName = 'PGPlugin'
      // 挂载在plus下
      root.plus[moduleName] = factory()
    }, false)
  }
}(this, function() {
  // 插件名称
  var _BARCODE = 'PGPlugin'
  var plugintest = {
    // 壳跳转到登录页面
    // token失效退出登录
    PluginLogin: function() {
      // 生产机才执行
      if (process.env.NODE_ENV === 'production' && setting.integrated) {
        return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [104])
      }
    },
    // 关闭iOS启动动画
    PluginCloseSplashscreen: function() {
      // 生产机才执行
      if (process.env.NODE_ENV === 'production' && setting.integrated) {
        return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [105])
      }
    },
    // 热更新成功通知
    PluginIosUpgrade: function() {
      // 生产机才执行
      if (process.env.NODE_ENV === 'production' && setting.integrated) {
        return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [200])
      }
    },
    // 关闭小程序，Android关闭退出动画
    PluginCloseAndroid: function() {
      // 生产机才执行
      if (process.env.NODE_ENV === 'production' && setting.integrated) {
        return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [103])
      }
    },
    // 业务异常 300+
    PluginServiceError: function() {
      // 生产机才执行
      if (process.env.NODE_ENV === 'production' && setting.integrated) {
        return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [300])
      }
    },
    // uni异常 400+
    PluginError: function() {
      // 生产机才执行
      if (process.env.NODE_ENV === 'production' && setting.integrated) {
        return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [400])
      }
    },
    // 获取原生壳网关 {"appDomain":"http://192.168.173.129/","mobile":"13798985533","photoUrl":""}
    PluginGateway: function(successCallback, errorCallback) {
    	// 生产机才执行
    	if (process.env.NODE_ENV === 'production') {
    		var success = typeof successCallback !== 'function' ? null : function(args) {
    			successCallback(args)
    		}
    		var fail = typeof errorCallback !== 'function' ? null : function(code) {
    			errorCallback(code)
    		}
    		var callbackID = plus.bridge.callbackId(success, fail)
    		const message = {
    			callbackID
    		}
    		return plus.bridge.exec(_BARCODE, 'PluginMessageFunction', [202, message])
    	} else {
    		return successCallback({
    			'appDomain': ''
    		})
    	}
    },
    // Android全局关闭动画
    // PluginAndroidCloseSplashscreen: function() {
    //   return plus.bridge.exec(_BARCODE, "exitUniAppTransition", []);
    // },
    PluginTestFunction: function(Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function(args) {
        successCallback(args)
      }
      var fail = typeof errorCallback !== 'function' ? null : function(code) {
        errorCallback(code)
      }
      var callbackID = plus.bridge.callbackId(success, fail)

      return plus.bridge.exec(_BARCODE, 'PluginTestFunction', [callbackID, Argus1, Argus2, Argus3, Argus4])
    },
    PluginTestFunctionArrayArgu: function(Argus, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function(args) {
        successCallback(args)
      }
      var fail = typeof errorCallback !== 'function' ? null : function(code) {
        errorCallback(code)
      }
      var callbackID = plus.bridge.callbackId(success, fail)
      return plus.bridge.exec(_BARCODE, 'PluginTestFunctionArrayArgu', [callbackID, Argus])
    },
    PluginTestFunctionSync: function(Argus1, Argus2, Argus3, Argus4) {
      return plus.bridge.execSync(_BARCODE, 'PluginTestFunctionSync', [Argus1, Argus2, Argus3, Argus4])
    },
    PluginTestFunctionSyncArrayArgu: function(Argus) {
      return plus.bridge.execSync(_BARCODE, 'PluginTestFunctionSyncArrayArgu', [Argus])
    }
  }
  return plugintest
}))
