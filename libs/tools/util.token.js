/**
 * @description token处理
 *
 */

import sjcl from './sjcl.js';
import uniStore from './util.store/index.js';

export default {
  /**
   * @description 获取token
   *
   * util.token.get = function() {
   *   return cookies.get('token')
   * }
   *
   */
  get:  function() {
    const RndNum = function(n) {
      let rnd = ''
      for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10)
      }
      return rnd
    }
    // 生成 token 示例
    const user = uniStore.getStorage('user-token') || {};
    const tokenKey = user.tokenKey;
    const tokenId = user.tokenId;
    const userId = user.userId;
    if (!tokenKey || !tokenId || !userId) {
      return ''
    }
    const hmac = new sjcl.misc.Hmac(tokenKey)
    // 服务器返回的tokenKey;
    // uid :当前用户id
    // tid :服务器返回的tokenId
    // rid :随机字符串 (不能重复,可以考虑本机 ip + 当前时间戳 + 随机字符串)
    // ts : 当前时间戳
    // hash:生成签名
    // const param = 'uid=' + userId + '&tid=' + tokenId + '&rid=' + RndNum(5) + '&ts=' + (new Date()).getTime()
    const param = 'uid=' + userId + '&tid=' + tokenId + '&rid=' + this.guid(64, false, 16) + '&ts=' + (new Date()).getTime()
    const tokens = param + '&hash=' + sjcl.codec.base64.fromBits(hmac.encrypt(param))
    // tokens = 'uid=USER19011800016001U000&tid=0d97d690-a89a-4492-bfd9-ab3a26877d06&rid=81593&ts=1548747072796&hash=MqBplo82IfXun/IkaTAERHTotsvHZiRJQ6zIb1lYSng='
    return tokens
  },
  /**
   * @description 保存token
   * @param {String} token
   */
  set: function(params) {
    uniStore.setStorage('user-token', params);
  },
  /**
   * @description 获取, 壳传过来的参数
   */
  all: function() {
    return uniStore.getStorage('user-token') || {}
  },
  /**
   * @description 清除token
   */
  remove: function() {
    uniStore.removeStorage('user-token');
  },
  /**
   * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
   * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
   * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
   * v-for的时候,推荐使用后端返回的id而不是循环的index
   * @param {Number} len uuid的长度
   * @param {Boolean} firstU 将返回的首字母置为"u"
   * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
   */
  guid: function(len = 32, firstU = true, radix = null) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [];
    radix = radix || chars.length;

    if (len) {
      // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      // rfc4122标准要求返回的uuid中,某些位为固定的字符
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
      uuid.shift();
      return 'u' + uuid.join('');
    } else {
      return uuid.join('');
    }
  }
}
