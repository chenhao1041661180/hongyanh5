<template>
  <view style="position: relative;">
    <view class="head-bg">

      <view class="info-view">
        <image src="../../static/images/img_default_avatar_female.png" style="width: 128rpx; height: 128rpx;"></image>
        <view class="info-content-view">
          <view style="flex-direction: row;align-items: center; display: flex;">
            <text class="name-text">羽生结弦</text>
            <view style=" position: relative;margin-left: 20rpx;">
              <image src="../../static/images/ic_membership_level.png" class="hyh-img" />
              <text class="hyh-text">32233565</text>
            </view>
          </view>

          <text class="phone-text">1890753321</text>
        </view>

      </view>
    </view>

    <view class="center-view">

      <view style="padding-top: 20rpx;display: flex;text-align: center;align-items: center;">
        <!-- <image ></image> -->
        <text class="fire-title">我的订单</text>

        <text class="more-text">更多</text>
        <u-icon name="a-ic_arrow_shouhuodizhi2x" custom-prefix="hongyan-icon" size="30" color="#979797"
          style="margin-right: 26rpx;" />

      </view>

      <view style="flex-direction: row; display: flex; justify-content: space-around;margin-top: 50rpx;">

        <view class="state-item-view">
          <image src="../../static/images/ic_daifukuan.png" class="state-img-logo"></image>
          <text class="state-text">待付款</text>

          <text class="num-text">9</text>
        </view>
        <view class="state-item-view">
          <image src="../../static/images/ic_ daifahuo.png" class="state-img-logo"></image>
          <text class="state-text">待发货</text>
        </view>
        <view class="state-item-view">
          <image src="../../static/images/ic_daishouhuo.png" class="state-img-logo"></image>
          <text class="state-text">待收货</text>
        </view>
        <view class="state-item-view">
          <image src="../../static/images/ic_done.png" class="state-img-logo"></image>
          <text class="state-text">已完成</text>
        </view>
      </view>
    </view>

    <view class="center-view item-view" @click="toAddress">
      <u-icon name="a-ic_address_my2x" custom-prefix="hongyan-icon" size="37" color="#979797" />
      <text class="shdz-text">我的收货地址</text>
      <u-icon name="a-ic_arrow_shouhuodizhi2x" custom-prefix="hongyan-icon" size="30" color="#CCCCCC" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      /**
       * 去地址管理页面
       */
      toAddress() {
        uni.navigateTo({
          url: '../address/address-list'
        })
      }
    }
  }
</script>

<style scoped>
  .head-bg {
    /* background-color: #007AFF; */
    height: 330rpx;
    display: flex;
    width: 750rpx;
    background-image: url(../../static/images/bg_my.png);
    background-position: 100%;
    background-repeat: no-repeat;
  }

  .info-view {
    display: flex;
    margin-left: 30rpx;
    margin-top: -100rpx;
    align-items: center;
    flex-direction: row;
  }

  .info-content-view {
    display: flex;
    height: 128rpx;
    margin-left: 24rpx;
    flex-direction: column;
    justify-content: space-around;
  }

  .name-text {
    font-family: PingFangSC-Medium;
    color: #FFFFFF;
    font-size: 40rpx;
  }

  .phone-text {
    font-family: PingFangSC-Regular;
    color: #FFFFFF;
    font-size: 30rpx;
  }

  .hyh-img {
    width: 38rpx;
    height: 38rpx;
    position: absolute;
    left: 0;
  }

  .hyh-text {
    background: linear-gradient(to right, #FFDF7F, #FF9900);
    height: 34rpx;
    border-radius: 17rpx;
    color: #FFFFFF;
    font-size: 22rpx;
    font-family: PingFangSC-Medium;
    text-align: end;
    padding-left: 48rpx;
    padding-right: 18rpx;
  }

  .center-view {
    height: 252rpx;
    margin-top: -89rpx;
    margin-left: 24rpx;
    margin-right: 24rpx;
    border-radius: 16rpx;
    background-color: #FFFFFF;
  }

  .fire-title {
    font-size: 34rpx;
    color: #333333;
    text-align: left;
    margin-left: 20rpx;
    font-weight: bold;
    flex: 1;
    font-family: PingFangSC-Medium;
  }

  .more-text {

    color: #999999;
    font-size: 30rpx;
    font-family: PingFangSC-Regular;
  }

  .state-item-view {
    display: flex;
    flex: 1;
    position: relative;
    align-items: center;
    flex-direction: column;
  }

  .state-img-logo {
    width: 60rpx;
    height: 60rpx;
  }

  .state-text {
    font-size: 26rpx;
    color: #999999;
    margin-top: 14rpx;
    font-family: PingFangSC-Regular;
  }

  .num-text {
    position: absolute;
    right: 15rpx;
    top: -12rpx;
    height: 32rpx;
    background-color: #FA3534;
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
    padding-left: 13rpx;
    padding-right: 13rpx;
    color: #FFFFFF;
    font-family: PingFangSC-Medium;
    font-size: 22rpx;
    line-height: 32rpx;
  }

  .shdz-text {
    flex: 1;
    color: #333333;
    font-family: PingFangSC-Regular;
    font-size: 34rpx;
    margin-left: 14rpx;
  }

  .item-view {
    height: 96rpx;
    margin-top: 24rpx;
    align-items: center;
    flex-direction: row;
    display: flex;
    padding-left: 24rpx;
    padding-right: 24rpx;
  }
</style>
