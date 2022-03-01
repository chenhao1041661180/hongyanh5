// native
import native from './tools/util.native.js'
// 数据缓存
import uniStore from './tools/util.store/index.js'
// 权限验证
import permision from './tools/util.permission.js'
// 正则验证
import * as validate from './tools/util.validate.js'
// tabBar页面过度
import loading from './tools/util.bar.js'
// token 处理
import token from './tools/util.token.js'
// 防抖 处理
import debounce from './tools/util.debounce.js'
// 手势
import touch from './tools/util.touch.js'
import jsBridge from '@/libs/jsBridge.js'
import $parent from '@/libs/$parent.js'
import config from '@/libs/config.js'
import number from '@/libs/number.js'
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import {
  colorGradient,
  hexToRgb,
  rgbToHex
} from './tools/util.color.js'

// 原生壳通信
const app = require('./plugins.js')
const dayjs = require('dayjs')

// 图片静态资源表
import assetsPath from './assets/util.assets.js'

const util = {
  app,
  dayjs,
  token,
  number,
  uniStore,
  validate,
  assetsPath,
  permision,
  loading,
  debounce,
  touch,
  native,
  colorGradient,
  hexToRgb,
  rgbToHex,
  jsBridge,
  $parent,
  config
}

/*
 * ============================================================
 * 时间格式转换
 * formatTime时间计时秒转00：00：00形态
 */
util.formatTime = function(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

/*
 * ============================================================
 * 时间格式转换
 * dateUtils时间转换xx天前、xx小时前、刚刚
 */
util.dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000
  },
  humanize: function(milliseconds) {
    var humanize = ''
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前'
        break
      }
    }
    return humanize || '刚刚'
  },
  format: function(dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime()
    if (diff < this.UNITS['月']) {
      return this.humanize(diff)
    }
    var _format = function(number) {
      return (number < 10 ? ('0' + number) : number)
    }
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
      _format(date.getHours()) + ':' + _format(date.getMinutes())
  },
  parse: function(str) { // 将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/)
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
  }
}

/*
 * ============================================================
 * 经纬度格式转换 E:119°32′形态
 */
util.formatLocation = function(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function forMatNum(num) {
  return num < 10 ? '0' + num : num + ''
}

util.initDays = function(year, month) {
  const totalDays = new Date(year, month, 0).getDate()
  const dates = []
  for (let d = 1; d <= totalDays; d++) {
    dates.push(forMatNum(d))
  }
  return dates
}

util.initPicker = function(start, end, mode = 'date', step, value, flag) {
  // const aToday = new Date()
  // let tYear; let tMonth; let tDay; let tHours; let tMinutes; let tSeconds;
  let defaultVal = []
  let initstartDate = new Date(start)
  let endDate = new Date(end)
  if (start > end) {
    initstartDate = new Date(end)
    endDate = new Date(start)
  }
  const startYear = initstartDate.getFullYear()
  // const startMonth = initstartDate.getMonth() + 1
  const endYear = endDate.getFullYear()
  const years = []
  const months = []
  const days = []
  const hours = []
  const minutes = []
  const seconds = []
  let returnArr = []
  const curMonth = flag ? value[1] * 1 : (value[1] + 1)
  const totalDays = new Date(startYear, curMonth, 0).getDate()
  for (let s = startYear; s <= endYear; s++) {
    years.push(s + '')
  }
  for (let m = 1; m <= 12; m++) {
    months.push(forMatNum(m))
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push(forMatNum(d))
  }
  for (let h = 0; h < 24; h++) {
    hours.push(forMatNum(h))
  }
  for (let m = 0; m < 60; m += step * 1) {
    minutes.push(forMatNum(m))
  }
  for (let s = 0; s < 60; s++) {
    seconds.push(forMatNum(s))
  }
  if (flag) {
    returnArr = [
      years.indexOf(value[0]),
      months.indexOf(value[1]),
      days.indexOf(value[2]),
      hours.indexOf(value[3]),
      minutes.indexOf(value[4]) === -1 ? 0 : minutes.indexOf(value[4]),
      seconds.indexOf(value[5])
    ]
  }
  switch (mode) {
    case 'range':
      if (flag) {
        defaultVal = [returnArr[0], returnArr[1], returnArr[2], 0, returnArr[0], returnArr[1], returnArr[2]]
        return {
          years,
          months,
          days,
          defaultVal
        }
      } else {
        return {
          years,
          months,
          days
        }
      }
      // break
    case 'date':
      if (flag) {
        defaultVal = [returnArr[0], returnArr[1], returnArr[2]]
        return {
          years,
          months,
          days,
          defaultVal
        }
      } else {
        return {
          years,
          months,
          days
        }
      }
      // break
    case 'yearMonth':
      if (flag) {
        defaultVal = [returnArr[0], returnArr[1]]
        return {
          years,
          months,
          defaultVal
        }
      } else {
        return {
          years,
          months
        }
      }
      // break
    case 'dateTime':
      if (flag) {
        defaultVal = returnArr
        return {
          years,
          months,
          days,
          hours,
          minutes,
          seconds,
          defaultVal
        }
      } else {
        return {
          years,
          months,
          days,
          hours,
          minutes,
          seconds
        }
      }
      // break
    case 'time':
      if (flag) {
        defaultVal = [returnArr[3], returnArr[4], returnArr[5]]
        return {
          hours,
          minutes,
          seconds,
          defaultVal
        }
      } else {
        return {
          hours,
          minutes,
          seconds
        }
      }
      // break
  }
}

/**
 * @description 获取系统信息
 */
util.sysInfo = function() {
  return uni.getSystemInfoSync()
}

/**
 * @description 生成GUID 全局唯一标识符
 */
util.getGuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// JSON数组去重
util.uniqueArray = function(array, key) {
  var result = [array[0]]
  for (var i = 1; i < array.length; i++) {
    var item = array[i]
    var repeat = false
    for (var j = 0; j < result.length; j++) {
      if (item[key] === result[j][key]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
}

/**
 * @description json判断
 */
util.isJSON = function(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

/**
 * @description 数字判断
 */
util.isNumber = function(checkVal) {
  var reg = /^-?[1-9][0-9]?.?[0-9]*$/
  return reg.test(checkVal)
}
// util.isNumber = function(val) {
//   return !isNaN(parseFloat(val))
// }
util.formatNumber = function(num) {
  num = num.toFixed(this.decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? this.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  const separator = ','
  if (separator && !this.isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return x1 + x2
}

/**
 * 随机数
 */
util.random = function(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1
    return Math.floor(Math.random() * gab + min)
  } else {
    return 0
  }
}

/**
 * 打乱数组的顺序
 */
util.randomArray = function(array = []) {
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(() => Math.random() - 0.5)
}

/**
 * 代理数据
 */
util.proxy = (obj, callback = (key, val, oldval) => {}) => {
  for (const key in obj) {
    const itemval = obj[key]
    Object.defineProperty(obj, key, {
      enumerable: true,
      get: function() {
        return this[`APPDATA_${key}`]
      },
      set: function(newvalue) {
        callback(key, newvalue, this[`APPDATA_${key}`])
        this[`APPDATA_${key}`] = newvalue
      }

    })
    obj[key] = itemval
  }
}

/**
 * 随机背景颜色
 */
util.getRandomColor = function() {
  return '#' + (Math.random() * 0xffffff << 0).toString(16)
}

/**
 * 处理时间根据某天日期计算对应一周日期
 */
util.dealTime = function(dayNum, dat) {
  if (dayNum === '0') {
    dayNum = 7
  }
  dat = dat.replace(/[\/-]/g, '')
  var uom = ''
  var dateStr = ''
  // var fday = ''
  // fday = dat.substring(6, 8);
  // uom.setYear(dat.substring(0, 4));
  // uom.setMonth(3);
  // uom.setDate(fday);
  uom = new Date(dat.substring(0, 4), parseInt(dat.substring(4, 6)) - 1, parseInt(dat.substring(6, 8)))

  var nDate = null
  console.log(dat, parseInt(dat.substring(4, 6)) - 1)
  console.log(dayNum, uom.getMonth())
  if (uom.getDay() === 0) {
    nDate = new Date(uom.getTime() - (7 - dayNum) * 86400000)
    // uom.setDate(uom.getDate() - (7 - dayNum));
  } else {
    // uom.setDate(uom.getDate() - (uom.getDay() - dayNum));
    nDate = new Date(uom.getTime() - (uom.getDay() - dayNum) * 86400000)
  }
  console.log(nDate.toLocaleDateString())
  var mon = (nDate.getMonth() + 1) + ''
  if (mon.length !== 2) {
    mon = '0' + mon
  }
  var day = nDate.getDate() + ''
  if (day.length !== 2) {
    day = '0' + day
  }
  dateStr = '' + nDate.getFullYear() + '-' + mon + '-' + day
  return dateStr
}

/*
 * 获取当前日期属于哪一周
 * */
util.weekOfYear = function(date) {
  //   year   年
  //   month  月
  //   day    日
  //   每周从周日开始
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var date1 = new Date(year, 0, 1)
  var date2 = new Date(year, month - 1, day, 1)
  var dayMS = 24 * 60 * 60 * 1000
  var firstDay = (7 - date1.getDay() + 1) * dayMS
  var weekMS = 7 * dayMS
  date1 = date1.getTime()
  date2 = date2.getTime()
  return Math.ceil((date2 - date1 - firstDay) / weekMS) + 1
}

/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 */
util.queryParams = function(data = {}, isPrefix = true, arrayFormat = 'brackets') {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  let commaStr = ''
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) === -1) arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i])
          }
          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(_value => {
            _result.push(key + '=' + _value)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          value.forEach(_value => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(key + '=' + commaStr)
          break
        default:
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
      }
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

/**
 * 版本号比较
 * @param currVer {string}
 * @param promoteVer {string}
 * @returns {boolean}
 *
 * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
 */
util.compareVersion = function(currVer = '0.0.0', promoteVer = '0.0.0') {
  if (currVer === promoteVer) return true
  const currVerArr = currVer.split('.')
  const promoteVerArr = promoteVer.split('.')
  const len = Math.max(currVerArr.length, promoteVerArr.length)
  for (let i = 0; i < len; i++) {
    const proVal = ~~promoteVerArr[i]
    const curVal = ~~currVerArr[i]
    if (proVal < curVal) {
      return true
    } else if (proVal > curVal) {
      return false
    }
  }
  return false
}

// 去空格
util.trim = function(value) {
  return value.replace(/(^\s*)|(\s*$)/g, '')
}

// 内容替换
util.replaceAll = function(text, repstr, newstr) {
  return text.replace(new RegExp(repstr, 'gm'), newstr)
}

// 格式化手机号码
util.formatNumber = function(num) {
  return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num
}

// 金额格式化
util.rmoney = function(money) {
  return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
    /\,$/, '').split('').reverse().join('')
}

// 将时间天小时分钟替换为h:d格式
util.formatHzTime = function(time) {
  if (!time) {
    return
  }
  let hour = 0
  let minute = 0
  if (time.indexOf('天') !== -1) {
    const dayArr = (time.split('天') || [])
    const hourArr = (dayArr[1].split('小时') || [])
    hour = Number(dayArr[0]) * 24 + Number(hourArr[0])
    if (hourArr.length > 1) {
      minute = Number(hourArr[1].replace(/分/, ''))
    }
  } else if (time.indexOf('小时') !== -1) {
    const hourArr = (time.split('小时') || [])
    hour = Number(hourArr[0])
    if (hourArr.length > 1) {
      minute = Number(hourArr[1].replace(/分/, ''))
    }
  } else if (time.indexOf('分') !== -1) {
    minute = Number(time.replace(/分/, ''))
  } else {
    return time
  }

  return hour + 'h:' + minute
  // const str = time.replace(/天|小时|分/g, function(matchStr) {
  //   const obj = {
  //     '天': '-',
  //     '小时': '-',
  //     '分': ''
  //   }
  //   return obj[matchStr]
  // })
}

// 将时间格式转化为08/18 14:00
util.formatSimpTime = function(time) {
  if (!time) {
    return
  }
  const arr1 = time.split(' ')[0]
  const arr2 = time.split(' ')[1]
  const str1 = arr1.split('-').slice(1).join('/')
  const str2 = arr2.split(':').slice(0, -1).join(':')
  return str1 + ' ' + str2
}

// 将时间格式转化为08月18日 14:00
util.formatSimpHzTime = function(time) {
  if (!time) {
    return
  }
  const arr1 = time.split(' ')[0]
  const arr2 = time.split(' ')[1]
  const arr3 = arr1.split('-').slice(1)
  const str1 = arr3[0] + '月' + arr3[1] + '日'
  const str2 = arr2.split(':').slice(0, -1).join(':')
  return str1 + ' ' + str2
}
// 将时间秒数转化为天和小时
util.formatSecTime = function(time) {
  if (time < 3600) {
    return ''
  }
  const days = Math.floor(time / (24 * 3600))
  const hours = Math.ceil((time % (24 * 3600)) / (3600))
  return (days > 0 ? days + '天' : '') + (hours > 0 ? hours + '小时' : '')
}
export default util
