/**
 * 热更新处理
 * start {function} 更新初始化回调
 * success {function} 更新成功回调
 * fail {function} 更新失败回调
 * integrated {boolean} 是否集成微应用
 *
 */

import setting from '@/setting.js'
const plugins = require('@/libs/plugins.js')

const noop = function() {}

class Upgrade {
  constructor({
    start = noop,
    success = noop,
    fail = noop,
    integrated = setting.integrated
  } = {}) {
    this.Task = {
      start,
      success,
      fail,
      integrated
    }
    this.appDomain = setting.image_url
    this.init(this.Task)
    return this.Task
  }
  /**
   * 开始初始化
   */
  init({
    integrated
  } = {}) {
    if (integrated) {
      plugins.PluginGateway(
        (res) => {
          if (res.appDomain) {
            this.appDomain = res.appDomain
          }
          this.getWidgetInfo()
        },
        (res) => {
          console.log(res)
        }
      )
    } else {
      this.getWidgetInfo()
    }
  }
  /**
   * 检查版本
   */
  getWidgetInfo() {
    plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
      uni.$api.index.checkTheLatestVersion({
        applicationId: wgtinfo.appid,
        versionNumber: wgtinfo.version,
        versionType: 'all'
      })
        .then(response => {
          if (response.data) {
            // 创建下载任务
            this.detectUpgrade(response.data)
          }
        })
        .catch((e) => {
        })
    })
  }
  /**
   * 创建下载任务
   */
  detectUpgrade(wgtinfo) {
    this.Task.start.apply(this, arguments)
    const downPath = this.appDomain + wgtinfo.sourceFile
    // const downPath = setting.image_url + wgtinfo.sourceFile;
    const dtask = plus.downloader.createDownload(
      downPath,
      {
        filename: '_doc/update/',
        retryInterval: 3,
        timeout: 10
      },
      (data, status) => {
        const _that = this
        plus.downloader.clear()
        if (status === 200) {
          console.log('正在校验安装包是否完整')
          let path = plus.io.convertLocalFileSystemURL(data.filename)
          if (uni.getSystemInfoSync().platform === 'ios') {
            path = 'file://' + path
          }
          plus.io.resolveLocalFileSystemURL(path, entry => {
            entry.file(function(file) {
              console.log('正在安装')
              // file.size 文件大小
              // force: (Boolean 类型 )是否强制安装
              plus.runtime.install(
                path,
                {
                  force: true
                },
                function() {
                  console.log('安装成功')
                  // 保存版本号
                  uni.$util.uniStore.setStorage('app-version', wgtinfo.versionNumber)
                  setTimeout(() => {
                    // 热更新成功通知
                    // uni.$util.app.PluginIosUpgrade();
                    // 重启
                    // plus.runtime.restart();
                    // appWidget.hide('auto');
                    _that.Task.success.apply(_that, arguments)
                  }, 500)
                  // 删除文件
                  entry.remove(
                    function() {
                      console.log('安装包删除成功')
                    },
                    function() {
                      console.log('安装包删除失败')
                    }
                  )
                },
                function(e) {
                  entry.remove(
                    function() {
                      console.log('安装包删除成功')
                    },
                    function() {
                      console.log('安装包删除失败')
                    }
                  )
                  console.log('安装失败')
                  // appWidget.hide('auto');
                  // uni.showToast({
                  //   icon: "none",
                  //   title: "更新失败，程序将在下次打开时更新"
                  // });
                  _that.Task.fail.apply(_that, arguments)
                  // _that.gourl();
                }
              )
            })
          })
        } else {
          console.log('资源包下载失败')
          // appWidget.hide('auto');
          // uni.showToast({
          //   icon: "none",
          //   title: "更新失败，程序将在下次打开时更新"
          // });
          this.Task.fail.apply(this, arguments)
          // _that.gourl();
        }
      }
    )
    dtask.addEventListener('statechanged', (task, status) => {
      switch (task.state) {
        case 1:
          break
        case 2:
          break
        case 3:
          // let Size = (task.downloadedSize / task.totalSize) * 100;
          // this.upgrade = parseInt(Size);
          break
        case 4:
          break
      }
    })
    dtask.start()
  }
}

export default Upgrade
