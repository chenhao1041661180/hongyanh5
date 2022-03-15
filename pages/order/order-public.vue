<template>
  <!-- 对公支付 -->
  <view style="width: 100%;">
    <u-navbar :title-bold="true" :background="{background: 'rgba(255,255,255)'}" :border-bottom="false"
      back-icon-color="#666666" z-index="333" title="上传支付凭证" title-color="#333333" />
    <view style="padding-bottom: 120rpx;">
      <view class="shopping-list-view">
        <text class="label-text">汇款账户信息</text>

        <view class="order-item-view">
          <text class="order-item-text">公司名称</text>
          <text class="order-item-text" style="color: #333333;">江苏职工之家网络信息科技有限公司</text>
        </view>
        <view class="order-item-view">
          <text class="order-item-text">信用代码</text>
          <text class="order-item-text" style="color: #333333;">91320106302645648U</text>
        </view>
        <view class="order-item-view">
          <text class="order-item-text">银行账户</text>
          <text class="order-item-text" style="color: #333333;">32001595636052513089</text>
        </view>
        <view class="order-item-view">
          <text class="order-item-text">开户行</text>
          <text class="order-item-text" style="color: #333333;">中国建设银行南京市白下支行柜台</text>
        </view>
        <view class="order-item-view">
          <text class="order-item-text">联系电话</text>
          <text class="order-item-text" style="color: #333333;">13062598165</text>
        </view>

        <view class="order-item-view">
          <text class="order-item-text"
            style="font-size: 25rpx;line-height: 1.5;">（1）企业/单位可通过客服电话及客户经理完成采购需求、商品报价、商品样品寄送以及其他相关事宜：
            客服电话：4000615855；
            （2）转款/汇款前请仔细核对账户信息；
            （3）对公汇款后请保存汇款凭证并及时与客户经理确认入账；
            （4）汇款完成后请及时与客户经理对接并确认交/收货事宜；
            （5）涉及商品售后及其他相关事宜请及时与客户经理对接并确认。</text>
        </view>
      </view>
      <view class="shopping-list-view">
        <text class="label-text">付款流水号</text>
        <u-input v-model="paymentSerialNumber" placeholder="请输入付款流水号" style="width: 100%;" />
        <text class="label-text" style="margin-top: 20rpx;">上传支付凭证</text>

        <view style="width: 100%;">

          <!-- <u-icon custom-prefix="hongyan-icon" name="shangchuantupian" color="#DDDDDD" size="120"></u-icon> -->
          <u-upload :action="uploadUrl" :header="{Authorization}" :file-list="fileList" width="160" height="160"
            max-count="1" @on-success="onUploadSuccess" @on-remove="removeFile" />
        </view>
      </view>
    </view>

    <view class="bottom-view">

      <text class="bottom-btn-text gm-text" @click="upload">上传</text>
    </view>
  </view>
</template>

<script>
  import {
    getOrderDetail,
    contraryToPay,
    editPaymentInfo
  } from '@/api/order.js'
  export default {
    data() {
      return {
        orderId: '', // 订单编号
        orderPayId: '', // 支付平台id
        modify: false, //是否 编辑修改  true是 false 否
        uri: '',
        paymentSerialNumber: '',
        Authorization: uni.$util.token.get(),
        uploadUrl: window.location.origin + '/mall/api/file/onefile/upload',
        orderInfo: {},
        fileList: []
      }
    },
    onLoad(option) {
      this.orderId = option.orderId
      this.orderPayId = option.orderPayId
      this.modify = option.modify
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail() {
        uni.showLoading({
          title: ''
        })
        getOrderDetail(this.orderId)
          .then(res => {
            uni.hideLoading()
            // this.orderInfo = res.data
            this.paymentSerialNumber = res.data.paymentSerialNumber
            this.fileList.push({
              url: uni.$util.assetsPath.IMAGE_URL + res.data.paymentDocument
            })
            this.uri = res.data.paymentDocument
          }).catch(err => {
            uni.hideLoading()
          })
      },
      upload() {
        if (!this.paymentSerialNumber) {
          uni.showToast({
            icon: 'none',
            title: '请输入付款流水号'
          })

          return
        }
        if (!this.uri) {
          uni.showToast({
            icon: 'none',
            title: '请上传支付凭证'
          })
          return
        }

        uni.showLoading({
          title: ''
        })
        const param = {
          orderPayId: this.orderPayId,
          paymentDocument: this.uri,
          paymentSerialNumber: this.paymentSerialNumber
        }

        let promise
        if (this.modify == "true") {
          promise = editPaymentInfo(param)
        } else {
          promise = contraryToPay(param)
        }

        promise.then(res => {
          uni.hideLoading()
          const pages = getCurrentPages()
          uni.showToast({
            icon: 'none',
            title: this.modify == "true" ? '修改成功' : '提交成功'
          })
          uni.navigateBack({
            delta: pages.length - 1
          })

        }).catch(err => {
          uni.hideLoading()
        })
      },
      /**
       * 上传成功回调
       */
      onUploadSuccess(data, index, lists, index2) {
        console.log(data.data.uri)
        this.uri = data.data.uri
      },
      // 移除文件
      removeFile(index, lists, index2) {
        this.uri = ''
      }
    }
  }
</script>

<style scoped>
  .shopping-list-view {
    display: flex;
    margin: 24rpx;
    padding-left: 24rpx;
    padding-right: 24rpx;
    align-items: center;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    padding-top: 20rpx;
  }

  .label-text {
    width: 100%;
    font-family: PingFangSC-Regular;
    color: #333333;
    font-size: 30rpx;
    margin-bottom: 10rpx;
    font-weight: bold;
  }

  .order-item-view {
    display: flex;
    width: 100%;
    padding-top: 12rpx;
    padding-bottom: 12rpx;
    justify-content: space-between;
  }

  .order-item-text {
    color: #999999;
    font-size: 30rpx;
    font-family: PingFangSC-Regular;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    align-items: center;
    height: 104rpx;
    padding-left: 34rpx;
    padding-right: 24rpx;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    display: flex;
    background-color: #FFFFFF;
  }

  .bottom-btn-text {
    width: 80%;
    height: 76rpx;
    line-height: 76rpx;
    text-align: center;
    border-radius: 38rpx;
    border: 2rpx #878787 solid;
    font-size: 30rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
  }

  .gm-text {
    margin-left: 20rpx;
    background-color: #2059F7;
    border: 0;
    color: #FFFFFF;
  }
</style>
