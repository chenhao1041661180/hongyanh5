import request from '@/plugin/request/index.js'
/**
 * @param {Object} enString 用户登录
 */
export function login(enString) {
  return request.get(`mall/api/user/login?enstring=${enString}`)
}
/**
 * @param {Object} data 商品列表
 */
export function homeList(data) {
  return request.post(`/mall/api/goods/homeList`, {
    data
  })
}

/**
 * @param {Object} data 商品详情
 */
export function goodsInfo(id) {
  return request.get(`/mall/api/goods/detail?id=${id}`)
}
