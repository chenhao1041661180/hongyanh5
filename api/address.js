
import request from '@/plugin/request/index.js'
/**
 * 新增收货地址
 */
export function addressAdd(data) {
  return request.post(`/mall/api/address/add`, { data })
}

/**
 * 编辑收货地址
 */
export function addressEdit(data) {
  return request.post(`/mall/api/address/edit`, { data })
}
/**
 * 删除收货地址
 */
export function addressDelete(id) {
  return request.get(`/mall/api/address/delete?id=${id}`)
}

/**
 * 收货地址详情
 */
export function addressDetail(id) {
  return request.get(`/mall/api/address/detail?id=${id}`)
}

/**
 * 查询省市区
 */
export function getRegion(data) {
  return request.get(`/mall/api/region/getRegion`, { data })
}
/**
 * 查询收货地址List
 */
export function addressList() {
  return request.get(`/mall/api/address/list`)
}
