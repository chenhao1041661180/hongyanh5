/**
 * 代理控制
 *
 */
const ProxyControll = (obj, callback = (key, val, oldval) => {}) => {
  for (const key in obj) {
    const itemval = obj[key]
    Object.defineProperty(obj, key, {
      enumerable: true,
      get: function() {
        return this[`HHYANG_${key}`]
      },
      set: function(newvalue) {
        callback(key, newvalue, this[`HHYANG_${key}`])
        this[`HHYANG_${key}`] = newvalue
      }

    })
    obj[key] = itemval
  }
}

class Request {
  constructor(config = {}) {
    this.platform = this.platformChunk()

    this.config = {}
    this.config.baseUrl = config.baseUrl ? config.baseUrl : ''
    this.config.dataType = config.dataType ? config.dataType : 'json'
    this.config.responseType = config.responseType ? config.responseType : 'text'
    this.config.header = config.header ? config.header : {}
    // 资源上传
    this.config.name = config.name ? config.name : 'file'
    this.config.fileType = config.fileType ? config.fileType : 'image'
    this.config.filePath = config.filePath ? config.filePath : ''
    this.config.files = config.files ? config.files : []
    this.config.abort = config.abort ? config.abort : bt => {}
    this.config.args = config.args ? config.args : {}

    this.config.index = config.index ? config.index : 0
    this.config.extra = config.extra ? config.extra : {}

    this.reqInterceptors = null
    this.resInterceptors = null
    this.interceptors = {
      request: fn => {
        this.reqInterceptors = fn
      },
      response: fn => {
        this.resInterceptors = fn
      }
    }

    Request._isUpOpenDown = this
  }

  set isUpOpenDown(value) {
    Request._isUpOpenDown = value
  }
  get isUpOpenDown() {
    return Request._isUpOpenDown
  }

  async get(url, config = {}) {
    return this._request('get', url, config)
  }
  async post(url, config = {}) {
    return this._request('post', url, config)
  }
  async put(url, config = {}) {
    return this._request('put', url, config)
  }
  async delete(url, config = {}) {
    return this._request('delete', url, config)
  }
  async upload(url, config = {}) {
    return this._upload(url, config)
  }
  async download(url, config = {}) {
    return this._download(url, config)
  }
  setConfig(config = {}) {
    this.config = this._deepCopy(this._merge(this.config, config))
  }
  getConfig() {
    return this.config
  }
  _request(method, url, config) {
    const _this = this
    const newConfig = this._deepCopy(this._merge(this.config, config))
    let lastConfig = {}
    if (this.reqInterceptors && typeof this.reqInterceptors === 'function') {
      const reqInterceptors = this.reqInterceptors(newConfig)
      if (!reqInterceptors && process.env.NODE_ENV === 'development') {
        console.warn('请求被拦截，此消息仅在开发环境显示。')
        return false
      } else if (Object.prototype.toString.call(reqInterceptors) === '[object Promise]') {
        return reqInterceptors
      }
      lastConfig = this._deepCopy(reqInterceptors)
    } else {
      lastConfig = this._deepCopy(newConfig)
    }
    let fullUrl = this._formatUrl(lastConfig.baseUrl, url)
    if ((/^https:\/\/|http:\/\//.test(url))) {
      fullUrl = url
    }
    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      if (fullUrl.indexOf('/wl/') > -1 || fullUrl.indexOf('/mro/') > -1 || fullUrl.indexOf('/newjr/') > -1 || fullUrl.indexOf('/mine/') > -1) {
        fullUrl = fullUrl.replace(/\/api/, '')
      }
    } else {
      if (fullUrl.indexOf('/wl/') > -1 || fullUrl.indexOf('/mro/') > -1 || fullUrl.indexOf('/mine/') > -1) {
        fullUrl = fullUrl.replace(/\/api/, '')
      }
    }

    // console.log('request', fullUrl)
    // console.log(lastConfig.header)
    return new Promise((resolve, reject) => {
      uni.request({
        url: fullUrl,
        method,
        data: lastConfig.data ? lastConfig.data : {},
        header: lastConfig.header,
        dataType: lastConfig.dataType,
        responseType: lastConfig.responseType,
        async complete(response) {
          let res = response
          if (_this.resInterceptors && typeof _this.resInterceptors === 'function') {
            const resInterceptors = _this.resInterceptors(res)
            if (!resInterceptors) {
              // reject('返回值已被您拦截！');
              return
            } else if (Object.prototype.toString.call(resInterceptors) === '[object Promise]') {
              try {
                const promiseRes = await resInterceptors
                resolve(promiseRes)
              } catch (error) {
                reject(error)
              }
            } else {
              res = resInterceptors
            }
          }
          resolve(res)
        }
      })
    })
  }
  _upload(url, config) {
    const _this = this
    const newConfig = this._deepCopy(this._merge(this.config, config))
    let lastConfig = {}
    if (this.reqInterceptors && typeof this.reqInterceptors === 'function') {
      const reqInterceptors = this.reqInterceptors(newConfig)
      if (!reqInterceptors && process.env.NODE_ENV === 'development') {
        console.warn('请求被拦截，此消息仅在开发环境显示。')
        return false
      } else if (Object.prototype.toString.call(reqInterceptors) === '[object Promise]') {
        return reqInterceptors
      }
      lastConfig = this._deepCopy(reqInterceptors)
    } else {
      lastConfig = this._deepCopy(newConfig)
    }
    let fullUrl = this._formatUrl(lastConfig.baseUrl, url)
    if ((/^https:\/\/|http:\/\//.test(url))) {
      fullUrl = url
    }

    delete lastConfig.header['content-type']

    return new Promise((resolve, reject) => {
      const beforeInfo = Object.assign({}, {
        path: fullUrl,
        header: lastConfig.header,
        filePath: lastConfig.filePath,
        fileName: lastConfig.name,
        formData: lastConfig.data || {},
        ...lastConfig.args
      })
      const uploadTask = uni.uploadFile({
        url: fullUrl,
        // #ifdef APP-PLUS
        files: lastConfig.files,
        // #endif
        // #ifdef MP-ALIPAY
        // 仅支付宝小程序，且必填。
        fileType: lastConfig.fileType,
        // #endif
        method: 'UPLOAD',
        name: lastConfig.name,
        filePath: lastConfig.filePath,
        formData: lastConfig.data ? lastConfig.data : {},
        header: lastConfig.header,
        async complete(response) {
          let res = response
          if (_this.resInterceptors && typeof _this.resInterceptors === 'function') {
            const resInterceptors = _this.resInterceptors(res)
            if (!resInterceptors) {
              // reject('返回值已被您拦截！');
              return
            } else if (Object.prototype.toString.call(resInterceptors) === '[object Promise]') {
              try {
                const promiseRes = await resInterceptors
                resolve(promiseRes)
              } catch (error) {
                reject(error)
              }
            } else {
              res = resInterceptors
            }
          }
          resolve(res)
        }
      })
      lastConfig.abort(beforeInfo, uploadTask)
    })
  }
  _download(url, config) {
    const _this = this
    const newConfig = this._deepCopy(this._merge(this.config, config))
    let lastConfig = {}
    if (this.reqInterceptors && typeof this.reqInterceptors === 'function') {
      const reqInterceptors = this.reqInterceptors(newConfig)
      if (!reqInterceptors && process.env.NODE_ENV === 'development') {
        console.warn('请求被拦截，此消息仅在开发环境显示。')
        return false
      } else if (Object.prototype.toString.call(reqInterceptors) === '[object Promise]') {
        return reqInterceptors
      }
      lastConfig = this._deepCopy(reqInterceptors)
    } else {
      lastConfig = this._deepCopy(newConfig)
    }

    delete lastConfig.header['content-type']

    return new Promise((resolve, reject) => {
      const beforeInfo = Object.assign({}, {
        path: url,
        header: lastConfig.header,
        index: lastConfig.index,
        ...lastConfig.extra
      })
      const downloadTask = uni.downloadFile({
        url: url,
        header: lastConfig.header,
        async complete({ statusCode = 0, ...finsh } = {}) {
          if (statusCode === 200) {
            resolve(Object.assign({}, {
              statusCode,
              params: lastConfig.extra,
              ...finsh
            }))
          }
          // return Promise.reject('error')
          reject(finsh)
        }
      })
      lastConfig.abort(beforeInfo, downloadTask)
    })
  }
  _formatUrl(baseUrl, url) {
    if (!baseUrl) return url
    let formatUrl = ''
    const baseUrlEndsWithSlash = baseUrl.endsWith('/')
    const urlStartsWithSlash = url.startsWith('/')
    if (baseUrlEndsWithSlash && urlStartsWithSlash) {
      formatUrl = baseUrl + url.substring(1)
    } else if (baseUrlEndsWithSlash || urlStartsWithSlash) {
      formatUrl = baseUrl + url
    } else {
      formatUrl = baseUrl + '/' + url
    }
    return formatUrl
  }
  _merge(oldConfig, newConfig) {
    const mergeConfig = this._deepCopy(oldConfig)
    if (!newConfig || !Object.keys(newConfig).length) return mergeConfig
    for (const key in newConfig) {
      if (key !== 'header') {
        mergeConfig[key] = newConfig[key]
      } else {
        if (Object.prototype.toString.call(newConfig[key]) === '[object Object]') {
          for (const headerKey in newConfig[key]) {
            mergeConfig[key][headerKey] = newConfig[key][headerKey]
          }
        }
      }
    }
    return mergeConfig
  }
  _deepCopy(obj) {
    const result = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = this._deepCopy(obj[key])
        } else {
          result[key] = obj[key]
        }
      }
    }
    return result
  }
  /**
	 * 设置代理
	 */
  proxy(obj, callback) {
    ProxyControll(obj, callback)
  }
  /**
	 * 运行环境判断
	 */
  platformChunk() {
    if (typeof plus === 'undefined') {
      return 1
    }
    return 0
  }
}

// if (!global.$request) {
//   global.$request = new Request();
// }

// export default global.$request;
export default new Request()
export const RQ = Request
