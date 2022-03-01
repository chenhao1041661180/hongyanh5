/**
 * Native调用Android NFC
 * autostart {Boolean} 开启自动扫描
 * start {function} 更新初始化回调
 * @param {Object} param nfc {Boolean} nfc是否正常
 * @param {Object} param state {Number} 状态码，0：异常，1：不支持NFC，2：未打开，3：正常
 * @param {Object} param msg {String} 默认提示
 * push {function} 扫描回调
 * @param {Object} param UID {Array} 字节数组ID
 * @param {Object} param HEXID {String} 16进制ID
 * @param {Object} param TAGID {String} 16进制翻转ID
 * @param {Object} param DECIMALID {String} 10进制卡号
 *
 */

const noop = function() {}

class NFC {
  constructor({
    start = noop,
    push = noop,
    autostart = false
  } = {}) {
    this.Task = {
      start,
      push
    }
    this.autostart = autostart
    this.platform = uni.getSystemInfoSync().platform === 'android'
    this.NfcAdapter = ''
    this.main = null
    this._nfcAdapter = null
    this.pendingIntent = null
    this.intentFiltersArray = []
    this.techListsArray = []
    this.init()
    // #ifdef APP-PLUS
    // plus.globalEvent.addEventListener('newintent', e => {
    //   this.NFCReadUID()
    // })
    // #endif
    // return this.Task
  }
  /**
   * 开始初始化
   */
  init() {
    try {
      this.main = plus.android.runtimeMainActivity()
      const Intent = plus.android.importClass('android.content.Intent')
      plus.android.importClass('android.app.Activity')
      const PendingIntent = plus.android.importClass('android.app.PendingIntent')
      const IntentFilter = plus.android.importClass('android.content.IntentFilter')

      this.NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter')
      this._nfcAdapter = this.NfcAdapter.getDefaultAdapter(this.main)

      // NfcAdapter.ACTION_NDEF_DISCOVERED
      const ndef = new IntentFilter('android.nfc.action.NDEF_DISCOVERED')
      // NfcAdapter.ACTION_TECH_DISCOVERED
      const tag = new IntentFilter('android.nfc.action.TAG_DISCOVERED')
      const tech = new IntentFilter('android.nfc.action.TECH_DISCOVERED')
      this.intentFiltersArray = [ndef, tag, tech]

      this.techListsArray = [
        ['android.nfc.tech.Ndef'],
        ['android.nfc.tech.IsoDep'],
        ['android.nfc.tech.NfcA'],
        ['android.nfc.tech.NfcB'],
        ['android.nfc.tech.NfcF'],
        ['android.nfc.tech.Nfcf'],
        ['android.nfc.tech.NfcV'],
        ['android.nfc.tech.NdefFormatable'],
        ['android.nfc.tech.MifareClassi'],
        ['android.nfc.tech.MifareUltralight']
      ]

      const _intent = new Intent(this.main, this.main.getClass())
      _intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
      this.pendingIntent = PendingIntent.getActivity(this.main, 0, _intent, 0)

      if (this._nfcAdapter === null) {
        this.Task.start.call(this, { nfc: false, state: 1, msg: '本设备不支持NFC' })
      } else if (this._nfcAdapter.isEnabled() === false) {
        this.Task.start.call(this, { nfc: false, state: 2, msg: 'NFC功能未打开' })
      } else {
        this.Task.start.call(this, { nfc: true, state: 3, msg: 'NFC正常' })
        if (this.autostart) {
          this._nfcAdapter.enableForegroundDispatch(this.main, this.pendingIntent, this.intentFiltersArray, this.techListsArray)
        }
      }
      plus.globalEvent.addEventListener('newintent', e => {
        this.NFCReadUID()
      })
    } catch (e) {
      this.Task.start.call(this, { nfc: false, state: 0, msg: '本设备不支持NFC' })
      // TODO handle the exception
    }
  }
  // 读取卡号
  NFCReadUID() {
    const main = plus.android.runtimeMainActivity()
    const _intent = main.getIntent()
    const _action = _intent.getAction()

    if (this.NfcAdapter.ACTION_NDEF_DISCOVERED === _action || this.NfcAdapter.ACTION_TAG_DISCOVERED === _action || this.NfcAdapter.ACTION_TECH_DISCOVERED === _action) {
      const UID = _intent.getByteArrayExtra(this.NfcAdapter.EXTRA_ID)
      const HEXID = this.Bytes2HexString(UID)
      const TAGID = this.reverseTwo(this.Bytes2HexString(UID))
      const DECIMALID = parseInt(TAGID, 16)
      this.Task.push.call(this, { UID, HEXID, TAGID, DECIMALID })

      // this.UID = uid
      // this.HEXID = this.Bytes2HexString(uid)
      // const tagid = this.reverseTwo(this.Bytes2HexString(uid))
      // this.TAGID = tagid
      // this.DECIMALID = parseInt(tagid, 16)
      // 震动
      // #ifndef H5
      uni.vibrateLong()
      // #endif
    }
  }
  open() {
    if (this._nfcAdapter) {
      this._nfcAdapter.enableForegroundDispatch(this.main, this.pendingIntent, this.intentFiltersArray, this.techListsArray)
    }
  }
  close() {
    if (this._nfcAdapter) {
      this._nfcAdapter.disableForegroundDispatch(this.main)
    }
  }
  reverseTwo(str) {
    let str1 = ''
    for (let i = 1; i <= str.length; i++) {
      str1 += str[i - 1]
      if (i % 2 === 0) {
        if (i === str.length) {
          break
        }
        str1 += ':'
      }
    }
    let str2 = ''
    for (let i = str1.split(':').length - 1; i >= 0; i--) {
      str2 += str1.split(':')[i]
    }
    return str2
  }
  bytesToHexString(inarray) {
    var i, j, x
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    var out = ''
    for (j = 0; j < inarray.length; ++j) {
      x = parseInt(inarray[j]) & 0xff
      i = (x >> 4) & 0x0f
      out += hex[i]
      i = x & 0x0f
      out += hex[i]
    }
    return out
  }
  // 将byte[] 转为Hex
  Bytes2HexString(arrBytes) {
    var str = ''
    for (var i = 0; i < arrBytes.length; i++) {
      var tmp
      var num = arrBytes[i]
      if (num < 0) {
        // Java中数值是以补码的形式存在的，应用程序展示的十进制是补码对应真值。补码的存在主要为了简化计算机底层的运算，将减法运算直接当加法来做
        tmp = (255 + num + 1).toString(16)
      } else {
        tmp = num.toString(16)
      }
      if (tmp.length === 1) {
        tmp = '0' + tmp
      }
      str += tmp
    }
    return str
  }
}

export default NFC
