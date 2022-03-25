<template>
  <!-- 确认订单 -->
  <view class="parent-view">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="确认订单"
      :border-bottom="false" />

    <view class="address-view">
      <view class="address-view2" v-if="dataInfo.shippingAddressVo" @click="toAddressList">
        <image src="../../static/images/ic_address.png" style="width: 32rpx;height: 32rpx;" />
        <view class="address-info-view">
          <text class="ssq-text">{{dataInfo.shippingAddressVo.consigneeRegionName}}</text>
          <text class="detail-address">{{dataInfo.shippingAddressVo.consigneeAddress}}</text>
          <view style="display: flex;flex-direction: row;align-items: center;">
            <text class="user-info">{{dataInfo.shippingAddressVo.consigneeName}}</text>
            <text class="user-info" style="margin-left: 15rpx;">{{dataInfo.shippingAddressVo.consigneeMobile}}</text>
          </view>

        </view>
        <u-icon custom-prefix="hongyan-icon" name="a-ic_arrow_shouhuodizhi2x" size="26" color="#CCCCCC"></u-icon>
      </view>
      <view class="no-address" v-else @click="toAddressList">
        <view class="no-address2">
          <u-icon custom-prefix="hongyan-icon" name="tianjiadizhi-02" color="#CCCCCC" size="50" />
          <text style="margin-top: 5rpx;">添加收货地址</text>
        </view>
        <u-icon custom-prefix="hongyan-icon" name="a-ic_arrow_shouhuodizhi2x" size="26" color="#CCCCCC"></u-icon>

      </view>


      <image src="../../static/images/img_address_line.png" class="line-image" />
    </view>

    <view class="address-view" style="padding-left: 0;padding-right: 0;padding-bottom: 20rpx; margin-bottom: 120rpx;">
      <shopping-cart-item :showChoseIcon="false" v-for="(item,index) in dataInfo.orderGoodsItemVos" :item="item"
        :key="index" @changeCount="changeCount" />

    </view>
    <view class="bottom-view">
      <view style="display: flex;flex: 1; align-items: center;">
        <text class="custom-text">共{{totalCount}}件</text>
        <text class="custom-text" space="emsp" style="margin-left: 10rpx;margin-right: 10rpx;">|</text>
        <text class="custom-text">合计</text>
        <text class="price-text">￥{{totalPrice}}</text>
      </view>
      <text class="bottom-btn-text gm-text" @click="toConfirmOrder">立即支付</text>
    </view>
  </view>
</template>

<script>
  import shoppingCartItem from '../shopping-cart/components/shopping-cart-item.vue'

  import {
    confirmOrder,
    submitOrder
  } from '@/api/order.js'
  export default {
    components: {
      shoppingCartItem
    },
    data() {
      return {
        ids: [],
        // detail: false,
        orderWay: 1, //下单方式：1-商品详情下单，2-购物车下单
        dataInfo: {}
      }
    },

    onLoad(option) {
      // this.detail = option.detail
      this.orderWay = option.orderWay
      if (this.orderWay == 1) {
        // console.log(option.ids)
        this.ids = option.ids
      } else {
        this.ids = option.ids.split(",")
      }
      // console.log(this.ids)
    },
    mounted() {
      uni.$on("addAddress", this.addAddressEmit)
      this.getList()
    },

    beforeDestroy() {
      uni.$off('addAddress', this.addAddressEmit);
    },

    computed: {
      totalCount() {
        let count = 0
        let orderGoods = this.dataInfo.orderGoodsItemVos
        if (orderGoods) {
          orderGoods.forEach(item => {
            count += item.goodsCount
          })
        }

        return count
      },
      totalPrice() {
        let price = 0
        let orderGoods = this.dataInfo.orderGoodsItemVos
        if (orderGoods) {
          orderGoods.forEach(item => {
            let goodsPriceCount = uni.$util.number.accMul(item.goodsPrice, item.goodsCount)
            price = uni.$util.number.accAdd(price, goodsPriceCount)
          })
        }

        return price
      }
    },
    methods: {
      getList() {
        let param = {
          goodsId: '',
          shippingCartIds: null
        }

        if (this.orderWay == 1) {
          param.goodsId = this.ids
        } else {
          param.shippingCartIds = this.ids
        }
        confirmOrder(param)
          .then(res => {
            this.dataInfo = res.data
          }).catch(err => {

          })
      },
      /**
       * @param {Object} e 修改购物车商品数量
       */
      changeCount(e) {

        let param = {
          id: this.cartList[e.index].id,
          count: e.value
        }

      },
      addAddressEmit(data) {
        this.dataInfo.shippingAddressVo = data
      },
      toConfirmOrder() {
        if (!this.dataInfo.shippingAddressVo) {

          uni.showToast({
            icon: 'none',
            title: '请先添加收货地址'
          })
          return
        }

        uni.showLoading({
          title: ''
        })

        let goodsItemDtoList = []

        this.dataInfo.orderGoodsItemVos.forEach(item => {
          goodsItemDtoList.push({
            goodsId: item.id,
            goodsCount: item.goodsCount
          })
        })

        //生成预支付订单id
        let param = {
          orderWay: this.orderWay,
          addressId: this.dataInfo.shippingAddressVo.id,
          goodsItemDtoList
        }
        // console.log(JSON.stringify(param) )
        submitOrder(param)
          .then(res => {
            uni.hideLoading()
            let orderPayId = res.data.orderPayId //支付平台预支付ID
            let orderId = res.data.orderId //支付平台预支付ID
            let total = res.data.total //订单总额

            uni.navigateTo({
              url: `./submit-order?total=${total}&orderPayId=${orderPayId}&orderId=${orderId}&orderWay=${this.orderWay}`
            })
          }).catch(err => {
            uni.hideLoading()

          })

      },
      /**
       * 去地址新增页面
       */
      toAddAddress() {
        uni.navigateTo({
          url: '../address/receiving-address?order=true'
        })
      },
      toAddressList() {
        uni.navigateTo({
          url: '../address/address-list?order=true'
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
    width: 100%;
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
    width: 100%;
    background-repeat: no-repeat;
    height: 6rpx;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom );
    padding-bottom: env(safe-area-inset-bottom );
    height: calc(104rpx + env(safe-area-inset-bottom));
    align-items: center;
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
    font-weight: bold;
    font-size: 34rpx;
    color: #EF293B;
  }

  .no-address {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    color: #CCCCCC;
    padding-bottom: 20rpx;
  }

  .no-address2 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
