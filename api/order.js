import request from '@/plugin/request/index.js'
/**
 * 查询购物车中包含商品数量
 */
export function confirmOrder(data) {
  return request.post(`/mall/api/order/confirm`, { data })
}

/**
 * 查询我的订单个数
 */
export function getMyOrderCount() {
  return request.get(`/mall/api/order/getMyOrderCount`)
}

/**
 * 查询我的订单列表
 */
export function getMyOrderList(data) {
  return request.post(`/mall/api/order/getMyOrderList`, { data })
}
