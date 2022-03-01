/**
 * @name 过滤
 * @param {String} val 值
 * @param {String} de 填充值
 */
export function fill(val, de) {
	const cur = de
	return val || val === 0 ? val : (de ? cur : '--')
}

/**
 * @name 数字保留位数
 * @param {Number} val 值
 * @param {Number} bit 位数
 */
export function nf(val, bit) {
	const bitx = bit || bit === 0 ? bit : 1
  if (val === '-') return val
	if (!val) return (0).toFixed(bitx)
	if (!Number(val)) return (0).toFixed(bitx)
	return Number(val).toFixed(bitx)
}

/**
 * @name 数字保留去误差
 * @param {Number} val 值
 * @param {Number} bit 位数
 */
export function nft(val) {
	const v = Number(val) || 0
	return Number(v.toFixed(6))
}

/**
 * @name image
 * @param {String} v 值
 */
export function image(v) {
  if (v && v.indexOf('http') > -1) {
    return v
  }
  const url = '/static/images/'
	return v ? `${url}${v}` : '/static/images/no-image.png'
}
