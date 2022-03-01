<template>
  <view class="item-bg-view">
    <view class="name-logo-view">
      <text class="name-logo-text">加</text>
    </view>


    <view class="name-address-view">
      <view class="name-view">
        <text class="name-text">加菲猫</text>
        <text class="phone-text">1790988777</text>
        <text class="default-text">默认</text>
      </view>
      <text class="address-text">浙江省杭州市钱塘区下沙经济技术开发区下沙街道金沙大道281号</text>
    </view>

    <view style="width: 2rpx;background-color: #EEEEEE;height: 38rpx;margin-left: 24rpx;"></view>

    <u-icon custom-prefix="hongyan-icon" name="a-ic_edit2x" size="32" color="#7F7E86"
      style="padding-left: 24rpx;padding-right: 24rpx;" @click="modify"></u-icon>
  </view>
</template>

<script>
  export default{
    data(){
      return{
  
      }
    },
    methods:{
      modify(){
        this.$emit("edit")
      }
    }
  }

</script>

<style scoped>
  .item-bg-view {
    background-color: #FFFFFF;
    margin: 24rpx 24rpx 0 24rpx;
    padding-left: 24rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 16rpx;
    padding-top: 24rpx;
    padding-bottom: 24rpx;
  }

  .name-logo-view {
    background-color: #EEF3F8;
    width: 76rpx;
    /* flex: 1; */
    /* height: 76rpx; */
    /* display: flex; */
    align-items: center;
    text-align: center;
    border-radius: 38rpx;
  }

  .name-logo-text {

    line-height: 76rpx;


  }

  .name-address-view {
    margin-left: 13rpx;
    flex: 1;
    display: flex;
    flex-direction: column;

  }

  .name-view {
    display: flex;
    flex-direction: row;
    align-items: center;

  }

  .name-text {
    color: #333333;
    font-size: 34rpx;
    font-family: PingFangSC-Medium;
  }

  .phone-text {
    font-size: 28rpx;
    color: #666666;
    margin-left: 22rpx;
    font-family: PingFangSC-Regular;
  }

  .default-text {
    background: linear-gradient(to right, #FD7C51, #F63A2F);
    height: 32rpx;
    border-radius: 3rpx;
    color: #FFFFFF;
    font-size: 22rpx;
    width: 61rpx;
    align-items: center;
    text-align: center;
    line-height: 32rpx;
    margin-left: 14rpx;
    font-family: PingFangSC-Regular;

  }

  .address-text {
    font-family: PingFangSC-Regular;
    color: #666666;
    margin-top: 8rpx;
    font-size: 24rpx;
  }
</style>
