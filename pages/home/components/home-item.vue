<template>
  <view style="background-color: #FFFFFF;border-radius: 16rpx;margin-top: 24rpx;">
    <u-lazy-load threshold="-450" border-radius="10" :image="url" :index="index"></u-lazy-load>
    <text
      class="title-text">{{item.goodsName}}</text>
    <view class="price-view">
      <text class="price-text">￥{{item.goodsPrice}}</text>
      <text
        class="sum-text">{{item.goodsSales}}人已付款</text>
    </view>
  </view>
</template>

<script>
  export default {

    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      url() {
        if (this.item && this.item.thumbnail) {
          let imageUrl = uni.$util.assetsPath.IMAGE_URL + this.item.thumbnail;
          return imageUrl
        } else {
          return uni.$util.config.loadingImg
        }

      }
    },
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
    word-break: break-all;
    word-wrap: break-word;
    /* word-break: normal; */
    margin-left: 16rpx;
    margin-right: 16rpx;
    margin-top: 20rpx;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-text {
    font-size: 30rpx;
    color: #FF3B30;
    flex: 1;
    margin-left: 16rpx;
    font-family: medium;
    font-weight: bold;
  }

  .sum-text {
    font-family: PingFangSC-Regular;
    color: #999999;
    margin-left: 14rpx;
    font-size: 24rpx;
  }

  .price-view {
    margin-top: 18rpx;
    padding-bottom: 15rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 16rpx;
  }
</style>
