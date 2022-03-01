<template>
  <view class="linear-more-shopping-item-view">
    <image :src="url" style="width: 160rpx;height: 160rpx;"></image>

    <view class="content-view">
      <text class="title-text">{{item.goodsName}}</text>
      <text class="remark-text">{{item.goodsDescribe}}</text>
      <text class="num-text">￥{{item.goodsPrice}}</text>
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
      }
    },
    computed: {
      url() {
        if (this.item && this.item.thumbnail) {
          let imageUrl = uni.$util.assetsPath.IMAGE_URL + this.item.thumbnail;
          console.log(imageUrl)
          return imageUrl
        } else {
          return uni.$util.config.loadingImg
        }

      }
    },
  }
</script>

<style scoped>
  .linear-more-shopping-item-view {
    display: flex;
    margin-bottom: 40rpx;
  }

  .content-view {
    display: flex;
    flex-direction: column;
    margin-left: 24rpx;
    justify-content: space-around;
    width: 470rpx;
  }

  .title-text {
    color: #333333;
    font-family: PingFangSC-Medium;
    font-size: 28rpx;
    width: 470rpx;
    overflow: hidden;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .remark-text {
    color: #999999;

    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    /* white-space: pre-wrap; */
    /* display:inline-block; */
    word-break: break-all;
    overflow: hidden;
    width: 470rpx;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .num-text {
    font-family: medium;
    color: #EF293B;
    font-weight: bold;
    /* margin-top: 24rpx; */
    font-size: 30rpx;
  }
</style>
