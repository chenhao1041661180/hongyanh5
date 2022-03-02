<template>
  <view class="item-bg-view">
    <view class="name-logo-view">
      <text class="name-logo-text">{{item.consigneeName.slice(0,1)}}</text>
    </view>


    <view class="name-address-view">
      <view class="name-view">
        <text class="name-text">{{item.consigneeName}}</text>
        <text class="phone-text">{{item.consigneeMobile}}</text>
        <text class="default-text" v-show="item.defaultAddress==1">默认</text>
      </view>
      <text class="address-text">{{item.consigneeRegionName}}{{item.consigneeAddress}}</text>
    </view>

    <view style="width: 2rpx;background-color: #EEEEEE;height: 38rpx;margin-left: 24rpx;"></view>
<view @click.stop="modify">
  <u-icon custom-prefix="hongyan-icon" name="a-ic_edit2x" size="32" color="#7F7E86"
    style="padding-left: 24rpx;padding-right: 24rpx;" ></u-icon>
</view>

  </view>
</template>

<script>
  export default{
    props:{
      item:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return{

      }
    },
    methods:{
      modify(){
        uni.navigateTo({
          url: `/pages/address/receiving-address?id=${this.item.id}&order=false`
        })
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
    margin-left: 16rpx;
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
    border-radius: 4rpx;
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
    font-size: 26rpx;
  }
</style>
