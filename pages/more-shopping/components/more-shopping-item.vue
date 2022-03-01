<template>
  <view style="background-color: #FFFFFF;border-radius: 16rpx;margin-top: 24rpx;">

    <!-- <image
    src="../../../static/images/mine_index_top_bg.png"
      style="height: 284rpx;width:343rpx ; border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;">
    </image> -->
    <u-lazy-load threshold="-450" border-radius="10" image="../../../static/images/mine_index_top_bg.png" :index="0"></u-lazy-load>
    <text class="title-text">苏工乐影三十元充值卡券十元充</text>
    <view style="margin-top: 18rpx;padding-bottom: 15rpx;">
      <text class="price-text">￥78</text>
      <text class="sum-text">20人已付款</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .title-text {
    font-family: PingFangSC-Medium;
    color: #333333;
    display: flex;
    font-size: 30rpx;
    margin-left: 24rpx;
    margin-right: 24rpx;
    margin-top: 20rpx;
  }
  .price-text{
    font-size: 24rpx;
    color: #FF3B30;
     margin-left: 24rpx;
    font-family: PingFangSC-Medium;
  }
  .sum-text{
    font-family: PingFangSC-Regular;
    color: #999999;
    margin-left: 12rpx;
    font-size: 24rpx;
  }

</style>
