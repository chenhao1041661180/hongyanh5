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

/**
 * 删除订单信息
 */
export function deleteOrder(orderId) {
  return request.get(`/mall/api/order/deleteOrder?orderId=${orderId}`)
}

/**
 * 确认签收-确认收货
 */
export function signFor(orderId) {
  return request.get(`/mall/api/order/signFor?orderId=${orderId}`)
}

/**
 * 选择支付方式
 */
export function setPaymentMode(data) {
  return request.get(`/mall/api/order/setPaymentMode`, { data })
}

/**
 * 首次提交对公支付，上传凭证
 */
export function contraryToPay(data) {
  return request.get(`/mall/api/order/contraryToPay`, { data })
}

/**
 * 编辑修改对公支付，上传凭证
 */
export function editPaymentInfo(data) {
  return request.get(`/mall/api/order/editPaymentInfo`, { data })
}

/**
 * 查询支付平台订单状态
 */
export function queryPayOrder(orderPayId) {
  return request.get(`/mall/api/order/queryPayOrder?orderPayId=${orderPayId}`)
}
