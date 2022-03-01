<template>
  <!-- 新增收货地址 -->
  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="新增收货地址"
      :border-bottom="false" />
    <view class="item-bg-view">
      <u-form :model="model" ref="uForm" :errorType="errorType" style="width: 100%;">
        <u-form-item label-width="150" :border-bottom="true" :label-position="labelPosition" label="收货人" prop="name">
          <u-input :border="false" placeholder="请填写收货人姓名" v-model="model.name" type="text"></u-input>
        </u-form-item>
        <u-form-item label-width="150" :label-position="labelPosition" label="联系方式" prop="name">
          <u-input :border="false" placeholder="请填写收货人联系方式" v-model="model.name" type="text"></u-input>
        </u-form-item>
      </u-form>
    </view>
    <view class="item-bg-view" style="padding-right: 24rpx;">
      <u-form :model="model" ref="uForm" :errorType="errorType" style="width: 100%;">
        <u-form-item label-width="150" :label-position="labelPosition" label="所在地区" prop="name">
          <u-input :border="false" placeholder="省市区县、乡镇街道" v-model="model.name" type="select"
            arrowIcon="a-ic_arrow_right2x" customPrefix="hongyan-icon"></u-input>
        </u-form-item>
      </u-form>

    </view>
    <view class="item-bg-view" style="padding-right: 24rpx;">
      <u-form :model="model" ref="uForm" :errorType="errorType" style="width: 100%;">
        <u-form-item :label-position="labelPosition" label="详细地址" prop="intro" label-width="150">
          <u-input type="textarea" :border="border" placeholder="楼牌号、小区、楼栋号、单元室等" v-model="model.intro" />
        </u-form-item>
      </u-form>
    </view>
    <view class="item-bg-view" style="padding-right: 24rpx;align-items: center;">
      <view style="display: flex;flex-direction: column;flex: 1;margin-top: 24rpx;margin-bottom: 24rpx;">
        <text class="mr-text">设置默认地址</text>
        <text
          style="margin-top:13rpx ;color: #999999;font-family: PingFangSC-Regular; font-size: 30rpx;">下单会优先使用该地址</text>
      </view>
      <u-switch v-model="model.defaultAddress"></u-switch>
    </view>
    <view class="bottom-view">
      <text class="bottom-btn-text gm-text" @click="saveInfo">保持</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          name: '',
          sex: '',
          likeFruit: '',
          intro: '',
          payType: '支付宝',
          agreement: false,
          region: '',
          goodsType: '',
          phone: '',
          code: '',
          password: '',
          rePassword: '',
          defaultAddress: false,
          photo: ''
        },
        labelPosition: 'left',
        errorType: ['message'],
      }
    },
    methods: {
      /**
       * 保存
       */
      saveInfo() {

      }
    },
  }
</script>

<style scoped>
  .item-bg-view {
    /* width: 100%; */
    background-color: #FFFFFF;
    margin: 24rpx 24rpx 0 24rpx;
    padding-left: 24rpx;
    display: flex;
    flex-direction: row;
    border-radius: 16rpx;
  }

  .mr-text {
    font-family: PingFangSC-Regular;
    color: #333333;
    font-size: 34rpx;
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
