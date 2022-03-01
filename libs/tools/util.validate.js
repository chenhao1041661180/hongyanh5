export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 中文验证*/
export function validateZh(str) {
  // const reg = /^[\u4e00-\u9fa5]+$/
  const reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateLetter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/* 只能是字母或者数字*/
export function validateEnOrNum(value) {
  //英文或者数字
  let reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/* 验证日期格式 */
export function validateDate(value) {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/* 验证ISO类型的日期格式*/
export function validateDateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/* 验证十进制数字*/
export function validateNumber(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/* 验证整数*/
export function validateDigits(value) {
  return /^\d+$/.test(value)
}

/* 金额,只允许2位小数*/
export function validateAmount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0.\d{1,2}$/.test(value);
}

/* 密码验证*/
export function validatePassword(str) {
  const reg = /^(\w){6,20}$/
  return reg.test(str)
}

/* 密码验证*/
export function validPass(str) {
  const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d_]{6,20}$/
  return reg.test(str)
}

/* 手机验证*/
export function validatePhone(str) {
  const reg = /^1[3-9][0-9]{9}$/
  return reg.test(str)
}

/* 座机验证*/
export function validatePhoneNumber(str) {
  const reg = /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/
  return reg.test(str)
}

/* 手机和座机验证*/
export function validateMobilePhone(str) {
  const reg = /(^1[3-9][0-9]{9}$)|(^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$)/
  return reg.test(str)
}

/* 邮政编码验证*/
export function validatePostcode(str) {
  const reg = /^[1-9]\d{5}$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* 身份证验证*/
export function validateCardNo(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(card)
}

/* 车牌验证*/
export function validateTruckNumber(value) {
  // const reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/
  // // const reg1 = /^[\u4e00-\u9fa5]{1}[0-9]{2}[a-zA-Z_0-9]{5}$/
  // return reg.test(truckNo)
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value)
  } else if (value.length === 8) {
    return xreg.test(value)
  } else {
    return false
  }
}

/* 经度验证 经度整数部分为0-180,小数部分为0到16位 */
export function validateLong(lon) {
  const reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,16})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  return reg.test(lon)
}

/* 纬度验证 纬度整数部分为0-90,小数部分为0到16位 */
export function validateLat(lat) {
  const reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,16}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  return reg.test(lat)
}
