<template>
  <u-mask :show="show"  :zoom="true" :duration="280">
    <view class="warp">
      <view class="rect" @tap.stop>

        <image src="../../../static/images/img_popup_picture.png" style="width: 342rpx;height: 226rpx;"></image>
        <text class="kfdh-tips"> 是否拨打客服电话？</text>
        <text class="kfdh-text">4000-615-855</text>
        <text class="call-btn" @click="call">拨打电话</text>
      </view>
      <u-icon name="a-ic_close_search2x" custom-prefix="hongyan-icon" size="58" color="#888888" style="margin-top: 30rpx;" @click="show = false"></u-icon>


    </view>
  </u-mask>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = true
      },
      call(){
        this.show = false

        setTimeout(()=>{
          uni.makePhoneCall({
              phoneNumber: '4000-615-855' //仅为示例
          });
        },150)

      }
    }
  }
</script>

<style scoped>
  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

  }

  .rect {
    width: 70%;
    /* height: 500rpx; */
    padding-bottom: 68rpx;
    padding-top: 90rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(../../../static/images/bg_popup.png);
    background-position:  100% ;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .kfdh-tips {
    color: #333333;
    font-size: 40rpx;
    font-weight: bold;
    margin-top: 23rpx;
  }

  .kfdh-text {
    color: #999999;
    font-size: 32rpx;
    margin-top: 10rpx;
    font-family: PingFangSC-Regular;
  }

  .call-btn {
    color: #FFFFFF;
    font-size: 36rpx;
    width: 400rpx;
    font-weight: bold;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    border-radius: 40rpx;
    margin-top: 35rpx;
    background: linear-gradient(to right, #FF8A1C, #F9BC57);
  }
</style>
