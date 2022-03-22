<template>
  <!-- 订单列表Item -->
  <view class="item-view">
    <text :style="{color:item.orderStatus==3?'#666666':'#FF6900'}" class="state-text">{{orderStatusStr}}</text>
    <view v-for="(child,index) in item.orderGoodsItemVos" class="content-view">
      <image :src="imageUrl(child)" style="width: 192rpx;height: 192rpx;border-radius: 8rpx;" />
      <view class="content-item-view">
        <text class="title-text">{{ child.goodsName }}</text>
        <text class="describle-text">{{ child.goodsDescribe }}</text>
        <view style="display: flex;flex-direction: row;align-items: center;">
          <text class="price-text">¥{{ child.goodsPrice }}</text>
          <text class="num-text">x{{ child.goodsCount }}</text>
        </view>
      </view>
    </view>

    <view class="btn-view">
      <text v-show="item.orderStatus==0" class="qfk-text" @click.stop="toFk(item)">去付款</text>
      <text v-show="item.orderStatus==2" class="qrsh-text" @click.stop="confirmReceipt(item)">确认收货</text>
    </view>
  </view>
</template>

<script>
  import {
    signFor
  } from '@/api/order.js'
  export default {
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }

    },
    data() {
      return {}
    },
    computed: {
      imageUrl() {

        return function(child) {
          if (child.thumbnail) {
            const imageUrl = uni.$util.assetsPath.IMAGE_URL + child.thumbnail
            console.log(imageUrl)
            return imageUrl
          } else {
            return uni.$util.config.loadingImg
          }
        }

      },
      orderStatusStr() {
        if (this.item) {
          if (this.item.writeOff != null) {
            const writeOff = this.item.writeOff
            return writeOff == 0 ? '待核销' : writeOff == 2 ? '核销不通过' : this.item.orderStatusStr
          } else {
            return this.item.orderStatusStr
          }

        } else {
          return ""
        }

      }
    },
    methods: {
      // 去付款
      toFk(item) {
        console.log('toFk')

        if (this.item.paymentMode == 1) {
          // 对公支付 去上传凭证页面
          uni.navigateTo({
            url: `./order-public?orderPayId=${item.orderPayId}`
          })
        } else {
          uni.navigateTo({
            url: `../shopping-info/submit-order?total=${item.total}&orderPayId=${item.orderPayId}&orderWay=${item.orderWay}`
          })
        }
      },
      // 确认收货
      confirmReceipt(item) {
        uni.showLoading({
          title: ''
        })
        signFor(item.orderPayId)
          .then(res => {
            uni.hideLoading()
            uni.showToast({
              icon: 'none',
              title: '已确认收货'
            })
          })
        uni.$emit('orderList')
          .catch(err => {
            uni.hideLoading()
          })
      }
    }
  }
</script>

<style scoped>
  .state-text {
    font-size: 30rpx;
    display: flex;
    font-family: PingFangSC-Regular;
    padding: 30rpx 30rpx 30rpx 40rpx;
  }

  .item-view {
    margin: 24rpx 24rpx 0 24rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding-bottom: 30rpx;
  }

  .content-view {
    margin-left: 24rpx;
    flex-direction: row;
    display: flex;
    margin-bottom: 30rpx;
    margin-top: 30rpx;

  }

  .content-item-view {
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    justify-content: space-around;
  }

  .title-text {
    width: 470rpx;
    color: #333333;
    font-size: 28rpx;
    word-break: break-all;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .describle-text {
    width: 470rpx;
    color: #999999;
    font-size: 26rpx;
    padding-right: 20rpx;
    word-break: break-all;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-text {
    font-size: 36rpx;
    font-weight: bold;
    font-family: medium;
  }

  .num-text {
    margin-left: 15rpx;
    color: #999999;
    font-size: 26rpx;
    margin-top: 6rpx;
  }

  .btn-view {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 24rpx;
    font-size: 28rpx;
    line-height: 50rpx;

  }

  .qfk-text {
    width: 144rpx;
    height: 50rpx;
    text-align: center;
    /*  padding-left: 36rpx;
    padding-right: 36rpx; */
    border-radius: 28rpx;
    font-family: PingFangSC-Regular;
    background-color: #2059F7;
    color: #FFFFFF;

  }

  .qrsh-text {
    width: 144rpx;
    height: 50rpx;
    text-align: center;
    border: 2rpx #2059F7 solid;
    background-color: #FFFFFF;
    border-radius: 28rpx;
    color: #2059F7;
  }
</style>
