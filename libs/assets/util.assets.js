import setting from '@/setting.js'
const PATH = setting.assetsPath
const IMAGE_URL = setting.image_url
// import ctpic from '../tools/util.picture';
// const Ctpic = new ctpic();

const _formatUrl = (baseUrl, url) => {
  if (!baseUrl) return url
  let formatUrl = ''
  const baseUrlEndsWithSlash = baseUrl.endsWith('/')
  const urlStartsWithSlash = url.startsWith('/')
  if (baseUrlEndsWithSlash && urlStartsWithSlash) {
    formatUrl = baseUrl + url.substring(1)
  } else if (baseUrlEndsWithSlash || urlStartsWithSlash) {
    formatUrl = baseUrl + url
  } else {
    formatUrl = baseUrl + '/' + url
  }
  return formatUrl
}

// const _getBase64 = async (url) => {
//   if (!url) return false;
//   try {
//     return await Ctpic.dataURLtoBlob({
//       path: url,
//       GetBase64: true,
//       compress: 1,
//     });
//   } catch (e) {
//     console.error('图片转换错误!')
//   }
// }

/*
 * 图片静态资源表，所有图片资源路径在这统一管理，不应该写死在页面中，该数据挂载到Vue原型中。
 * 页面使用：this.$assetsPath.home_1
 * CSS背景：应尽量使用:style="" 行内样式设置背景图
 * PATH说明：本地路径或者服务器路径
 *
 * 举例：<image :src="home_1">  需要在data中映射 home_1: this.$assetsPath.home_1
 *
 * 特别注意：经测试小程序中不支持 <image :src="$assetsPath.home_1"> 该用法
 */

export default {
  // 登陆页面
  password_tips: PATH + '/password_tips.png',

  // 更新页面
  // page_loading: PATH + "/page_loading.png",
  page_loading: PATH + '/loading.gif',

  // 首页的图标 背景图片路径处理
  home_1: _formatUrl(process.env.BASE_URL, PATH) + '/bg_homepage.png',
  home_add: PATH + '/add.png',
  home_visiting_save: PATH + '/success_icon.png',
  none_img: PATH + '/none_img.png',

  // 我的日程签到
  home_details_bg: PATH + '/signin_bg_fireworks.png',
  home_details_success: PATH + '/signin_bg01.png',
  home_details_fail: PATH + '/signin_bg02.png',
  home_details_map_bg: PATH + '/map_bg.png',

  // 消息列表图片
  image_1: PATH + '/message_icon01.png',
  image_2: PATH + '/message_icon02.png',
  image_3: PATH + '/message_icon03.png',

  // 我的图片
  user_head_normal: _formatUrl(process.env.BASE_URL, PATH) + '/img_head_normal.png',
  user_bg_top_h5: _formatUrl(process.env.BASE_URL, PATH) + '/user_bg_top.png',
  user_bg_btm_h5: _formatUrl(process.env.BASE_URL, PATH) + '/user_bg_btm.png',
  my_bg01_h5: _formatUrl(process.env.BASE_URL, PATH) + '/my_bg01.png',
  my_bg02_h5: _formatUrl(process.env.BASE_URL, PATH) + '/my_bg02.png',
  my_bg03_h5: _formatUrl(process.env.BASE_URL, PATH) + '/my_bg03.png',
  my_bg04_h5: _formatUrl(process.env.BASE_URL, PATH) + '/subordinate_bg01.png',
  my_bg05_h5: _formatUrl(process.env.BASE_URL, PATH) + '/subordinate_bg02.png',
  my_bg06_h5: _formatUrl(process.env.BASE_URL, PATH) + '/subordinate_bg03.png',
  user_bg_top: PATH + '/user_bg_top.png',
  user_bg_btm: PATH + '/user_bg_btm_grey.png',
  my_img_1: PATH + '/ad.png',
  my_bg01: PATH + '/my_bg01.png',
  my_bg02: PATH + '/my_bg02.png',
  my_bg03: PATH + '/my_bg03.png',
  my_bg04: PATH + '/subordinate_bg01.png',
  my_bg05: PATH + '/subordinate_bg02.png',
  my_bg06: PATH + '/subordinate_bg03.png',
  task_bg01: PATH + '/task_bg01.png',
  task_bg02: PATH + '/task_bg02.png',
  user_score: PATH + '/user_score.png',

  // 计划列表
  list_line: PATH + '/list_line.png',

  // 缺省图
  none_icon: PATH + '/none_icon.png',
  IMAGE_URL
}
