<template>
  <!-- 确认订单 -->
  <view class="parent-view">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="确认订单"
      :border-bottom="false" />

    <view class="address-view">
      <view class="address-view2">
        <image src="../../static/images/ic_address.png" style="width: 32rpx;height: 32rpx;"></image>
        <view class="address-info-view">
          <text class="ssq-text">浙江省 杭州市 余杭区 崇贤街道</text>
          <text class="detail-address">崇杭街与唐康路交汇处旭辉时代城崇</text>
          <text class="user-info">加菲猫 18769786543</text>
        </view>
        <u-icon custom-prefix="hongyan-icon" name="a-ic_arrow_shouhuodizhi2x" size="26" color="#CCCCCC"></u-icon>
      </view>
      <image src="../../static/images/img_address_line.png" class="line-image" />
    </view>

    <view class="address-view" style="padding-left: 0;padding-right: 0;padding-bottom: 20rpx; margin-bottom: 120rpx;">
      <shopping-cart-item :showChoseIcon="false" />
      <shopping-cart-item :showChoseIcon="false" />
      <shopping-cart-item :showChoseIcon="false" />
      <shopping-cart-item :showChoseIcon="false" />
    </view>
    <view class="bottom-view">
      <view style="display: flex;flex: 1; align-items: center;">
        <text class="custom-text">共1件</text>
        <text class="custom-text" space="emsp" style="margin-left: 10rpx;margin-right: 10rpx;">|</text>
        <text class="custom-text">合计</text>
        <text class="price-text">￥788</text>
      </view>
      <text class="bottom-btn-text gm-text" @click="toConfirmOrder">立即支付</text>
    </view>
  </view>
</template>

<script>
  import shoppingCartItem from '../shopping-cart/components/shopping-cart-item.vue'
  export default {
    components: {
      shoppingCartItem
    },
    data() {
      return {

      }
    },
    methods:{
      toConfirmOrder(){
        uni.navigateTo({
          url:'./submit-order'
        })
      }
    }
  }
</script>

<style scoped>
  .parent-view {
    width: 100%;
    /* background-color: #09BB07; */
  }

  .address-view {
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

  .address-view2 {
    flex-direction: row;
    display: flex;
    align-items: center;
  }

  .address-info-view {
    display: flex;
    flex: 1;
    margin-right: 10rpx;
    flex-direction: column;
    margin-left: 14rpx;
  }

  .detail-address {
    margin-top: 8rpx;
    margin-bottom: 8rpx;
    color: #343434;
    font-size: 34rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
  }

  .ssq-text {
    color: #343434;
    font-size: 26rpx;
    font-family: PingFangSC-Regular;
  }

  .user-info {
    margin-bottom: 24rpx;
    color: #343434;
    font-size: 26rpx;
    font-family: PingFangSC-Regular;
  }

  .line-image {
    background-repeat: no-repeat;
    height: 6rpx;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    align-items: center;
    height: 104rpx;
    padding-left: 34rpx;
    padding-right: 24rpx;
    width: 100%;
    flex-direction: row;
    display: flex;
    background-color: #FFFFFF;
  }

  .bottom-btn-text {
    width: 224rpx;
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
    margin-left: 20rpx;
    background-color: #2059F7;
    border: 0;
    color: #FFFFFF;
  }

  .custom-text {
    color: #333333;
    font-size: 26rpx;
    font-family: PingFangSC-Regular;
  }

  .price-text {
    font-family: medium;
    font-size: 34rpx;
    color: #EF293B;
  }
</style>
