<template>
  <!-- 收货地址列表 -->
  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="我的收货地址"
      :border-bottom="false" />

    <view>
      <address-item @edit="edit" />
      <address-item @edit="edit" />
      <address-item @edit="edit" />

    </view>

    <view class="bottom-view">
      <text class="bottom-btn-text gm-text" @click="add">新增收货地址</text>
    </view>
  </view>
</template>

<script>
  import addressItem from './components/address-item.vue'

  export default {
    components: {
      addressItem
    },
    data() {
      return {

      }
    },
    methods: {
      add() {
        uni.navigateTo({
          url: './receiving-address'
        })
      },
      edit() {
        uni.navigateTo({
          url: './receiving-address'
        })
      }
    },

  }
</script>

<style scoped>
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
