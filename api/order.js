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

/**
 * 查询我的订单详情
 */
export function getOrderDetail(orderId) {
  return request.get(`/mall/api/order/getOrderDetail?orderId=${orderId}`)
}

/**
 * 提交订单信息
 */
export function submitOrder(data) {
  return request.post('/mall/api/order/submit', { data })
}
