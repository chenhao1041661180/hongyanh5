/**
 * 判断是否为空
 * @param str
 * @returns {*<T>|*|*<any>}
 */
const isEmptyStr = (str) => {
  const temp = str + '';
  return (temp == '' || temp == 'null' || temp == 'undefined' || temp == '[]' || temp == '{}');
}

/**
 * 判断是否不为空
 * @param str
 * @returns {boolean}
 */
const isNotEmptyStr = (str) => {
  return !isEmptyStr(str);
}

const getSafeFixed = (str, fixedNum = 1) => {
  if (isEmptyStr(str)) {
    return '-';
  }
  try {
    return parseFloat(str).toFixed(fixedNum)
  } catch (e) {
    return str ? str : '-';
  }
}

const isNumber = (val) => {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

const getNotNullStr = (str) => {
  return str ? str : '-'
}

export default {
  isEmptyStr,
  isNotEmptyStr,
  getSafeFixed,
  isNumber,
  getNotNullStr,
}
