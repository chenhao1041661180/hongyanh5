<template>
  <!-- 支付成功页面 -->
  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :titleBold="true" :background="{background: 'rgba(255,255,255)'}" z-index="333"
      title="支付结果" :border-bottom="false" :customBack="customBack"/>
    <view class="head-bg-view">
      <!-- <image src="../../static/images/bg_dingdanxiangqing.png" style="width: 100%;height: 214rpx;display: flex;" /> -->
      <view class="status-view">
        <u-icon name="zhifuchenggong" custom-prefix="hongyan-icon" size="90" color="#FFFFFF" />
        <text class="zf-success-text">支付成功!</text>
      </view>
    </view>
    <view class="shopping-list-view">
      <view class="order-item-view">
        <text class="order-item-text">交易金额</text>
        <text class="order-item-text" style="color: #333333;">{{dataInfo.total}}</text>
      </view>
      <view class="order-item-view">
        <text class="order-item-text">订单编号</text>
        <text class="order-item-text" style="color: #333333;">{{dataInfo.orderPayId}}</text>
      </view>
      <view class="order-item-view">
        <text class="order-item-text">创建时间</text>
        <text class="order-item-text" style="color: #333333;">{{dataInfo.gmtCreate}}</text>
      </view>
      <view class="order-item-view">
        <text class="order-item-text">支付时间</text>
        <text class="order-item-text" style="color: #333333;">{{dataInfo.paymentTime}}</text>
      </view>
    </view>

    <text class="complete-text" @click="customBack()">完成</text>
  </view>
</template>

<script>
  import {
    queryPayOrder
  } from '@/api/order.js'
  export default {
    data() {
      return {
        outTradeNo: '', //订单号

        /** 交易状态说明：订单创建，等待买家选择支付方式 */
        //"ORDER_PRE_CREATE
        /** 交易状态说明：交易创建，等待买家付款 */
        //WAIT_BUYER_PAY
        /** 交易状态说明：未付款交易超时关闭，或支付完成后全额退款（支付失败） */
        //TRADE_CLOSED
        /** 交易状态说明：交易支付成功 */
        //TRADE_SUCCESS
        tradeStatus: '',
        dataInfo: {}
      }
    },

    onLoad(option) {
      this.outTradeNo = option.out_trade_no
      this.tradeStatus = option.trade_status
      this.getInfo()
    },
    methods: {
      getInfo() {
        queryPayOrder(this.outTradeNo)
          .then(res => {

            this.dataInfo = res.data
          }).catch(err => {})
      },
      customBack(){
        uni.reLaunch({
          url:'../home/index'
        })
      }
    }
  }
</script>

<style scoped>
  .head-bg-view {
    z-index: 1;
    flex-direction: column;
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 214rpx;
    background-image: url(../../static/images/bg_dingdanxiangqing.png);
    background-size: 100%;
    background-repeat: no-repeat;

  }

  .status-view {
    align-items: center;
    display: flex;
    /* margin-top: 30rpx; */
  }

  .zf-success-text {
    color: #FFFFFF;
    font-size: 34rpx;
    margin-left: 20rpx;
    font-family: medium;
  }

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

  .complete-text {
    color: #FFFFFF;
    display: flex;
    margin-left: 30rpx;
    margin-right: 30rpx;
    background-color: #007AFF;
    height: 80rpx;
    align-items: center;
    align-content: center;
    justify-content: center;
    font-size: 30rpx;
    text-align: center;
    border-radius: 40rpx;
  }
</style>
