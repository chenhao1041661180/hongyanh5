import request from '@/plugin/request/index.js'
/**
 * 查询购物车中包含商品数量
 */
export function confirmOrder(data) {
  return request.post(`/mall/api/order/confirm`, { data })
}
