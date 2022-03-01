import request from '@/plugin/request/index.js'
/**
 * 查询购物车中包含商品数量
 */
export function getCartCount() {
  return request.get(`/mall/api/shippingCart/getPersonalCartCount`)
}

/**
 * 添加商品到购物车
 */
export function addCart(goodsId) {
  return request.get(`/mall/api/shippingCart/add?goodsId=${goodsId}`)
}

/**
 * 查看个人购物车
 */
export function getPersonalCart() {
  return request.get(`/mall/api/shippingCart/getPersonalCart`)
}

/**
 * 删除购物车商品
 */
export function cartDelete(data) {
  return request.post(`/mall/api/shippingCart/delete`, { data })
}
