<template>
  <!-- 商品详情 -->
  <view style="display: flex;flex-direction: column;position: relative;height: 100%;width: 750rpx;">
    <u-navbar
      :background="{background: 'rgba(255,255,255,0)'}"
      :border-bottom="false"
      back-icon-color="#CCCCCC"
      z-index="333"
    />
    <u-swiper
      :list="bannerList"
      indicator-pos="bottomCenter"
      border-radius="0"
      height="750"
      style="position: absolute;top: 0;left: 0;right: 0;"
    />
    <view class="sp-view">
      <text class="title-text">{{ goodsDetail.goodsName }}</text>
      <view style="align-items: center;margin-top: 10rpx;">
      <text class="num-text">商品编号：{{ goodsDetail.goodsCode }}</text>
     <u-icon custom-prefix="hongyan-icon" name="fuzhi" size="32" color="#7F7E86" style="margin-left: 20rpx;" @click="copyNum(goodsDetail.goodsCode)"/>
      </view>

      <view class="jg-view">
        <text class="price-text">￥{{ goodsDetail.goodsPrice }}</text>
        <text class="xl-text">销量 {{ goodsDetail.goodsSales }}</text>
        <text class="kc-text">库存 {{ goodsDetail.goodsInventory }}</text>
        <text class="qdl-text">起订量 {{ goodsDetail.goodsMoq }}</text>
      </view>

    </view>
    <view
      class="sp-view"
      style="margin-top:10rpx ;align-items: center;display: flex;margin-bottom: 114rpx;"
    >

      <view style="align-items: center;">
        <image
          src="../../static/images/img_shangpinxiangqing.png"
          style="width: 26rpx;height: 26rpx;"
        />
        <text
          style="color: #666666 ; font-size: 32rpx;font-family: PingFangSC-Regular; margin-left: 10rpx;margin-right: 10rpx;"
        >商品详情</text>
        <image
          src="../../static/images/img_shangpinxiangqing.png"
          style="width: 26rpx;height: 26rpx;"
        />
      </view>
      <text class="goods-describe-text">{{ goodsDetail.goodsDescribe }}</text>
      <view style="flex-direction: column;display: flex;width: 100%;height: auto;">
        <u-lazy-load
          v-for="(item,index) in goodsDetail.detailPicture"
          :image="detailPictureUrl(item)"
          :index="index"
          threshold="-100"
          border-radius="0"
          img-mode="widthFix"
        />

        <!-- <image mode="widthFix" :src="detailPictureUrl(item)" style="width:100%;margin-top: 12rpx;"
          v-for="(item,index) in goodsDetail.detailPicture" /> -->
      </view>

    </view>

    <view class="bottom-view">
      <view style="display: flex;flex: 1;justify-content: space-around;">
        <view
          class="bottom-item-view"
          @click="toHome"
        >
          <u-icon
            custom-prefix="hongyan-icon"
            name="a-ic_shop2x"
            size="36"
            color="#333333"
          />
          <text class="item-text">店铺</text>
        </view>
        <view
          class="bottom-item-view"
          @click="toGwc"
        >
          <u-icon
            custom-prefix="hongyan-icon"
            name="a-ic_shopping_cart2x"
            size="36"
            color="#333333"
          />
          <text class="item-text">购物车</text>
          <text
            v-show="cartCount!=0"
            class="gwc-num"
          >{{ cartCount }}</text>
        </view>
      </view>
      <text
        class="bottom-btn-text"
        @click="addCart"
      >加入购物车</text>
      <text
        class="bottom-btn-text gm-text"
        @click="toConfirmOrder"
      >立即购买</text>
    </view>
  </view>
</template>

<script>
import {
  goodsInfo
} from '@/api/home.js'
import {
  getCartCount,
  addCart
} from '@/api/shopp-cart.js'
export default {
  data() {
    return {

      id: '',
      cartCount: 0, // 购物车总数
      goodsDetail: {},
      bannerList: []

    }
  },
  onLoad(option) {
    this.id = option.id
  },
  computed: {
    detailPictureUrl() {
      return function(item) {
        const imageUrl = uni.$util.assetsPath.IMAGE_URL + item.pictureUrl
        console.log(imageUrl)
        return imageUrl
      }
    }
  },

  mounted() {
    this.goodsInfo()
    this.getCartCount()
  },
  methods: {
    //复制商品编号
    copyNum(value){
      uni.setClipboardData({
        data: value,
        success: function() {
          uni.showToast({
            icon: 'none',
            title: '商品编号已复制'
          })
        }
      })

    },
    toConfirmOrder() {
      // let idArr = []
      // this.cartList.forEach(item => {
      //   if (item.select) {
      //     idArr.push(item.id)
      //   }
      // })

      uni.navigateTo({
        url: `./confirm-order?&orderWay=1&ids=${this.goodsDetail.id}`
      })
    },
    /**
       * 商品详情
       */
    goodsInfo() {
      goodsInfo(this.id)
        .then(res => {
          this.goodsDetail = res.data
          // this.goodsDetail.detailPicture.push({
          //   pictureUrl: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
          // })

          this.goodsDetail.banner.forEach((item) => {
            this.bannerList.push(uni.$util.assetsPath.IMAGE_URL + item.pictureUrl)
          })
        })
        .catch(err => {

        })
    },
    /**
       * 购物车总数
       */
    getCartCount() {
      getCartCount()
        .then(res => {
          const count = res.data
          if (count > 99) {
            this.cartCount = '99+'
          } else {
            this.cartCount = count
          }
        })
        .catch(err => {

        })
    },
    /**
       * 添加到购物车
       */
    addCart() {
      uni.showLoading({
        title: ''
      })
      addCart(this.goodsDetail.id)
        .then(res => {
          uni.hideLoading()
          uni.showToast({
            icon: 'none',
            title: '添加成功'
          })
          this.getCartCount()
        }).catch(err => {
          uni.hideLoading()
        })
    },
    toHome() {
      const enstring = uni.$util.uniStore.getStorage('enstring')
      uni.reLaunch({
        url: `../home/index?enstring=${enstring}`
      })
    },
    // 购物车
    toGwc() {
      uni.$emit('shopping-cart')
      setTimeout(()=>{
        uni.switchTab({
          url: `../shopping-cart/index`
        })
      },50)

    }

  }
}
</script>

<style scoped>
  .title-text {
    color: #333333;
    font-size: 36rpx;
    font-family: PingFangSC-Medium;

  }
  .num-text{
    color: #999999;
    font-size: 28rpx;
  }

  .sp-view {
    display: flex;
    flex-direction: column;
    margin-top: 670rpx;
    padding-left: 34rpx;
    padding-top: 34rpx;
    padding-bottom: 24rpx;
    padding-right: 34rpx;
    background-color: white;
  }

  .jg-view {
    margin-top: 27rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .price-text {
    color: #EF293B;
    font-size: 30rpx;
    font-family: medium;
    font-weight: bold;
  }

  .xl-text {
    color: #999999;
    font-size: 26rpx;
    margin-left: 12rpx;
    flex: 1;
    font-family: PingFangSC-Regular;
  }

  .goods-describe-text {
    flex: 1;
    width: 100%;
    word-break: break-all;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    color: #333333;
    font-size: 32rpx;
  }

  .kc-text {
    color: #999999;
    font-size: 26rpx;
    margin-left: 12rpx;
    font-family: PingFangSC-Regular;
  }

  .qdl-text {
    color: #999999;
    font-size: 26rpx;
    margin-left: 12rpx;
    font-family: PingFangSC-Regular;
  }

  .bottom-item-view {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20rpx;
    flex-direction: column;
    /* width: 128rpx; */
    position: relative;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom );
    padding-bottom: env(safe-area-inset-bottom );
    height: calc(104rpx + env(safe-area-inset-bottom));
    align-items: center;
    padding-left: 20rpx;
    padding-right: 24rpx;
    width: 100%;
    flex-direction: row;
    display: flex;
    background-color: #FFFFFF;
  }

  .item-text {
    font-family: PingFangSC-Regular;
    color: #333333;
    margin-top: 6rpx;
    font-size: 20rpx;

  }

  .gwc-num {
    min-width: 30rpx;
    height: 30rpx;
    background-color: #FF3B30;
    border-radius: 17rpx;
    top: 0;
    font-size: 18rpx;
    padding-left: 5rpx;
    padding-right: 5rpx;
    color: #FFFFFF;
    line-height: 30rpx;
    text-align: center;
    font-family: PingFangSC-Medium;
    position: absolute;
    right: 10rpx;
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
</style>
