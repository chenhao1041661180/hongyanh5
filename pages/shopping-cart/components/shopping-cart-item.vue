<template>
  <view class="parent-view">
    <view style="padding: 10rpx 10rpx 10rpx 26rpx;" @click="chooseCart">
    <u-icon custom-prefix="hongyan-icon" :name="isSelect?'a-ic_click_shangpin2x' :'a-ic_normal_shangpin2x'" size="32"
      :color="isSelect?'#156FFF': '#CCCCCC'" v-show="showChoseIcon" />
       </view>
    <view style="margin-left:16rpx;display: flex;">
      <image :src="imgUrl" class="head-image" />
      <view
        style="padding-left: 30rpx;margin-right: 20rpx;justify-content: space-around;display: flex;flex-direction: column;">
        <text class="title-text">{{item.goodsName}}</text>

        <view style="justify-content: space-between;display: flex;align-items: center;">
          <text class="price-text">￥{{item.goodsPrice}}</text>
          <u-number-box v-model="item.goodsCount" :bg-color="bgColor" :color="color" :min="1" :max="item.goodsInventory" :step="step" :index="index"
            :disabled="disabled" @change="change" @focus="focus"></u-number-box>
        </view>
        <view style="display: flex;align-items: flex-end;justify-content: flex-end;">
          <text style="color: #EF293B;font-size: 22rpx;font-family: PingFangSC-Regular;">起订量 {{item.goodsMoq}}  库存{{item.goodsInventory}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {

    props: {
      showChoseIcon: {
        type: Boolean,
        default: true
      },
      index: {
        type: Number,
        default: 0
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        value: 1,
        step: 1,
        bgColor: "#F2F2F2",
        color: '#333333',
        disabled: false,
        //是否选中
        // isSelect:false
      }
    },
    watch: {
      item(n, o) {
        this.isSelect = this.item.select
      }
    },
    methods: {
      change(e) {
        this.$emit("changeCount",e)
      },
      focus() {
        console.log('focus');
      },
      /**
       * 选中商品
       */
      chooseCart() {
        this.item.select = !this.item.select
        this.$emit("chooseItem", {
          isSelect: this.isSelect,
          index: this.index,
          item: this.item
        })
      }
    },
    computed: {
      isSelect() {
        return  this.item.select

      },
      imgUrl() {
        if (this.item && this.item.thumbnail) {
          let imageUrl = uni.$util.assetsPath.IMAGE_URL + this.item.thumbnail;
          return imageUrl
        } else {
          return uni.$util.config.loadingImg
        }

      }
    },
  }
</script>

<style scoped>
  .parent-view {
    width: 100%;
    height: 243rpx;
    align-items: center;
    background-color: #FFFFFF;
    flex-direction: row;
    display: flex;
    padding-left: 0rpx;
  }

  .head-image {
    width: 192rpx;
    height: 192rpx;
    border-radius: 6rpx;
  }

  .title-text {
    width: 380rpx;
    color: #000000;
    margin-top: 10rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular;
    height: 70rpx;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .price-text {
    font-family: medium;
    color: #EF293B;
    font-weight: bold;
    font-size: 32rpx;
  }
</style>
