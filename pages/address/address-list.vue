<template>
  <!-- 收货地址列表 -->
  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="我的收货地址"
      :border-bottom="false" />

    <view class="list-view" v-if="addressList.length">
      <address-item @edit="edit(item)" v-for="(item,index) in addressList" :item="item" :key="index"
        @click.native="clickItem(item)" />

    </view>
    <view class="empty-view" v-else>
      <u-empty></u-empty>
    </view>

    <view class="bottom-view">
      <text class="bottom-btn-text gm-text" @click="add">新增收货地址</text>
    </view>
  </view>
</template>

<script>
  import addressItem from './components/address-item.vue'
  import {
    addressList
  } from '@/api/address.js'
  export default {
    components: {
      addressItem
    },
    data() {
      return {
        //是否是订单页面过来
        order: false,
        addressList: []
      }
    },
    onLoad(option) {
      this.order = option.order
    },
    mounted() {
      uni.$on("modifyAddress", this.modifyAddress)
      this.getAddressList()
    },

    beforeDestroy() {
      uni.$off('modifyAddress', this.modifyAddress);
    },
    methods: {
      //修改地址返回，刷新列表
      modifyAddress() {
        this.getAddressList()
      },
      getAddressList() {

        uni.showLoading({
          title: ''
        })
        addressList()
          .then(res => {
            uni.hideLoading()
            this.addressList = res.data
          })
          .catch(err => {
            uni.hideLoading()
          })
      },
      /**
       * 选择
       */
      clickItem(item) {
        if (this.order == 'true') {
          uni.navigateBack({})
          uni.$emit("addAddress", item);
        }
      },
      //新增
      add() {
        uni.navigateTo({
          url: `/pages/address/receiving-address?order=false`
        })
      },
      //编辑
      edit(item) {
        // let encode = encodeURIComponent(JSON.stringify(item))
        uni.navigateTo({
          url: `/pages/address/receiving-address?id=${item.id}&order=false`
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

  .empty-view {
    height: 90%;
    /* display: flex; */
    align-items: center;
  }
</style>
