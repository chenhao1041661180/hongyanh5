<template>
  <!-- 对公支付 -->
  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :titleBold="true" :background="{background: 'rgba(255,255,255)'}" z-index="333"
      title="上传支付凭证" :border-bottom="false" title-color="#333333" />
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
          <text class="order-item-text" style="font-size: 25rpx;">（1）企业/单位可通过客服电话及客户经理完成采购需求、商品品报价、商品样品寄送以及其他相关事宜：
            咨询电话：0510-82866863【周一至周五9：00--17：00】
            客户经理1：18014931413【周一至周日8：00--22：00】
            客户经理2：18912362930【周一至周日8：00--22：00】；
            （2）转款/汇款前请仔细核对账户信息；
            （3）对公汇款后请保存汇款凭证并及时与客户经理确认入账；
            （4）汇款完成后请及时与客户经理对接并确认交/收货事宜；
            （5）涉及商品售后及其他相关事宜请及时与客户经理对接并确认。</text>
        </view>
      </view>
      <view class="shopping-list-view">

        <text class="label-text">上传支付凭证</text>

        <view style="width: 100%;">
         <!-- <u-icon custom-prefix="hongyan-icon" name="shangchuantupian" color="#DDDDDD" size="120"></u-icon> -->
         <u-upload width="160" height="160" max-count="1" :action="uploadUrl" :header="{Authorization}"></u-upload>
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
    contraryToPay
  } from '@/api/order.js'
  export default {
    data() {
      return {
        orderPayId: '' ,//订单编号
        Authorization:uni.$util.token.get(),
        uploadUrl: window.location.origin + "/mall/api/file/onefile/upload"
      }
    },
    onLoad(option) {
      this.orderPayId = option.orderId
      // console.log(window.location.origin)
    },
    methods: {
      upload() {

        uni.showLoading({
          title: ''
        })
        let param = {
          orderPayId: this.orderPayId,
          paymentDocument:""
        }

        contraryToPay(param)
          .then(res => {
            uni.hideLoading()
          }).catch(err => {
            uni.hideLoading()
          })

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
