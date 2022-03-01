const plugins = require('../plugins.js')

export default {
  backPress: function() {
    // #ifdef APP-PLUS
    if (uni.getSystemInfoSync().platform === 'android') {
      // Android关闭动画
      plugins.PluginCloseAndroid()
      // plus.runtime.quit()
      // Android常驻内存
      const main = plus.android.runtimeMainActivity()
      main.moveTaskToBack(false)
    } else if (uni.getSystemInfoSync().platform === 'ios') {
      // iOS退出应用
      plugins.PluginCloseAndroid()
      plus.runtime.quit()
      // const threadClass = plus.ios.importClass("NSThread");
      // const mainThread = plus.ios.invoke(threadClass, "mainThread");
      // plus.ios.invoke(mainThread, "exit");
      const notiClass = plus.ios.importClass('NSNotificationCenter')
      notiClass.defaultCenter().postNotificationNameobject('CloseWebAPP', null)
    } else {
      // 其他
      plus.runtime.quit()
    }
    // 重启当前的应用
    // plus.runtime.restart()
    // #endif
  }
}
