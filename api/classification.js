// 分类api
import request from '@/plugin/request/index.js'
/**
 * @param {Object} enString 分类列表
 */
export function goodsCategoryList(showInHome) {
  return request.get(`/mall/api/goodsCategory/list?showInHome=${showInHome}`)
}
