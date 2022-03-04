<template>
  <!-- 提交订单-付款 -->

  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="选择付款方式"
      :border-bottom="false" :customBack="customBack" />
    <view
      style="width: 100%;  display: flex;flex-direction: column;align-items: center; background-color: #FFFFFF;padding-top: 50rpx;">
      <text class="order-tips-text">订单金额</text>
      <view style="display: flex;flex-direction: row;align-items: flex-end;font-family: medium;">
        <text style="font-size: 40rpx;margin-bottom: 10rpx;">￥</text>
        <text class="price-text">{{total}}</text>
      </view>
      <view class="ddbh-view">
        <text class="ddbh-tips-text">订单编号</text>
        <text class="ddbh-text">{{orderPayId}}</text>
      </view>
      <view class="line-view" />
      <text class="payment-method-tips">选择支付方式</text>

      <!-- <view class="line-view"/> -->
      <view class="payment-item-view" @click="submitOrder(0)">
        <image src="../../static/images/img_yunshanfu2.png" style="width: 52rpx; height: 52rpx;"></image>
        <view class="item-view">
          <text class="item-text1">江苏工会收银台</text>
          <!-- <text class="item-text2">银联安全支付平台</text> -->
        </view>
        <u-icon name="a-ic_arrow_right2x" custom-prefix="hongyan-icon" color="#CCCCCC" size="32"></u-icon>
      </view>
      <view class="line-view" />
      <view class="payment-item-view" @click="submitOrder(1)">
        <u-icon name="a-img_qiyecaigou2x" custom-prefix="hongyan-icon" color="#3C73F1" size="52" />
        <view class="item-view">
          <text class="item-text1">企业采购</text>
          <text class="item-text2">确认后请进行对公汇款</text>
        </view>
        <u-icon name="a-ic_arrow_right2x" custom-prefix="hongyan-icon" size="32" color="#CCCCCC" />
      </view>

    </view>
    <view class="bottom-view">

      <!-- <text class="bottom-btn-text gm-text" @click="submitOrder">确认支付</text> -->
    </view>
  </view>
</template>

<script>
  import {
    setPaymentMode
  } from '@/api/order.js'
  export default {
    data() {
      return {
        total: '',
        orderPayId: '',
        orderWay: 1, //下单方式：1-商品详情下单，2-购物车下单
        href: "https://tyzy.jsghfw.com/sky-epay-test/epay/index.html?order_pay_id="
      }
    },

    onLoad(option) {
      this.total = option.total
      this.orderPayId = option.orderPayId
      this.orderWay = option.orderWay
      uni.$emit('shopping-cart')
    },
    methods: {
      submitOrder(paymentMode) {
        let param = {
          orderPayId: this.orderPayId,
          paymentMode
        }
        uni.showLoading({
          title: ''
        })

        setPaymentMode(param)
          .then(res => {
            uni.hideLoading()
            if (paymentMode == 0) {
              //工会支付
              //在线支付
              window.open(this.href + this.orderPayId)

            } else if (paymentMode == 1) {
              //对公打款
              uni.navigateTo({
                url: `../order/order-public?orderPayId=${this.orderPayId}`
              })
            }
          })
          .catch(err => {
            uni.hideLoading()
          })
      },
      customBack() {
        const pages = getCurrentPages()
        uni.navigateBack({
          delta: pages.length - 1
        })
      }
    },
    onBackPress() {
      const pages = getCurrentPages()
      uni.navigateBack({
        delta: pages.length - 1
      })

    }
  }
</script>

<style scoped>
  .order-tips-text {
    color: #333333;
    font-size: 34rpx;
    font-family: PingFangSC-Regular;

  }

  .price-text {
    font-size: 72rpx;
    font-family: medium;
    margin-top: 10rpx;
  }

  .ddbh-view {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 34rpx;
    padding-right: 34rpx;
    margin-top: 60rpx;
    margin-bottom: 34rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular;
  }

  .ddbh-tips-text {
    color: #999999;
  }

  .ddbh-text {
    color: #333333;
  }

  .line-view {
    width: 100%;
    background-color: #EEEEEE;
    height: 2rpx;
  }

  .payment-method-tips {
    width: 100%;
    font-size: 34rpx;
    font-weight: bold;
    color: #333333;
    padding-left: 24rpx;
    margin-top: 44rpx;
    margin-bottom: 20rpx;
    font-family: PingFangSC-Medium;
  }

  .payment-item-view {
    width: 100%;
    display: flex;
    height: 130rpx;
    padding-left: 34rpx;
    padding-right: 50rpx;
    align-items: center;
    flex-direction: row;
    /* margin-top: 26rpx;
    margin-bottom: 26rpx; */
  }

  .item-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 24rpx;
  }

  .item-text1 {
    font-size: 32rpx;
    color: #333333;
    font-family: PingFangSC-Medium;
  }

  .item-text2 {
    color: #999999;
    margin-top: 8rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    align-items: center;
    justify-content: center;
    height: 104rpx;
    padding-left: 34rpx;
    padding-right: 24rpx;
    width: 100%;
    flex-direction: row;
    display: flex;
    background-color: #FFFFFF;
  }

  .bottom-btn-text {
    width: 90%;
    height: 76rpx;
    line-height: 76rpx;
    text-align: center;
    border-radius: 38rpx;
    border: 2rpx #878787 solid;
    font-size: 28rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
  }

  .gm-text {
    background-color: #2059F7;
    border: 0;
    color: #FFFFFF;
  }
</style>
