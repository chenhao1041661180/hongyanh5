<template>
  <view style="position: relative;">
    <!-- <view class="head-bg" /> -->
    <!-- <view class="title-view">
      <text class="title-text">红岩扶贫</text>
    </view> -->

    <u-swiper :list="bannerList" mode="round" indicator-pos="bottomCenter" v-if="bannerList.length"
      style="margin-top: 0rpx;" :height="400" :border-radius="0"></u-swiper>

    <u-grid col="4" :border="false"
      style="margin-top: 24rpx;margin-left: 24rpx; margin-right: 24rpx;display: flex;width: 702rpx; border-radius: 16rpx;">
      <u-grid-item :name="'item'+index" :index="index" @click="itemClick" v-for="(item,index) in homeFlList">
        <image style="width: 90rpx;height: 90rpx;" :src="imgUrl(item)"></image>
        <view class="grid-text">{{item.categoryName}}</view>
      </u-grid-item>

    </u-grid>

    <view style="padding-top: 33rpx;padding-bottom: 24rpx; display: flex;text-align: center;align-items: center;">
      <image src="../../static/images/ic_baokuan.png" style="width: 34rpx;height: 34rpx;margin-left: 24rpx;" />
      <text class="fire-title">爆款新品</text>

      <text class="more-text" @click="toMore">更多</text>
      <u-icon name="a-ic_arrow_shouhuodizhi2x" custom-prefix="hongyan-icon" size="28" color="#979797"
        style="margin-right: 26rpx;" />
    </view>


    <view class="u-demo-area">
      <u-row gutter="12" offset="1" v-show="dataList.length">
        <u-col span="6" v-for="(item,index)  in dataList" @click="goToDetail(item)" :key="index">
          <home-item :item="item" :index="index" />
        </u-col>

      </u-row>
      <!-- <view style="height: 100%;background-color: #007AFF;" v-show="!dataList.length"> -->
      <u-empty :show="!dataList.length" marginTop="160"></u-empty>
      <!-- </view> -->

    </view>
    <view class="customer-service-view" @click="showCallPopup">
      <image src="../../static/images/btn_kefudianhua.png" style="width: 100rpx;height: 100rpx;" />
    </view>
    <customer-phonenumber-popup ref="callPopup" :show="showCall"></customer-phonenumber-popup>
  </view>
</template>

<script>
  import homeItem from './components/home-item.vue'
  import customerPhonenumberPopup from './components/customer-phonenumber-popup.vue'

  import {
    login,
    homeList,
    bannerList
  } from '@/api/home.js'
  import {
    goodsCategoryList
  } from '@/api/classification.js'
  export default {

    components: {
      homeItem,
      customerPhonenumberPopup
    },
    data() {
      return {
        bannerList: [],
        dataList: [],
        enstring: "",
        showCall: false,
        homeFlList: [",", "", ""],
      }
    },

    onLoad(option) {
      this.enstring = option.enstring
      //有值就保存
      if (this.enstring) {
        uni.$util.uniStore.setStorage("enstring", option.enstring)
      }
      //取缓存中的数据
      this.dataList = uni.$util.uniStore.getStorage("home-list")
      // console.log(option.enstring)
    },

    mounted() {
      this.$nextTick(() => {
        login(this.enstring ? this.enstring : uni.$util.uniStore.getStorage("enstring"))
          .then(res => {
            uni.$util.token.remove()
            // 保存用户信息
            uni.$util.token.set(res.data)
            this.getBannerList()
            this.goodsCategoryList()
            this.getList()

          })
          .catch(err => {
            console.log(err)

          })
      })

    },

    computed: {
      imgUrl() {
        return function(item) {
          if (item.categoryPicture && item.categoryPicture.indexOf('group') != -1) {

            let imageUrl = uni.$util.assetsPath.IMAGE_URL + item.categoryPicture;
            return imageUrl
          } else {
            return item.categoryPicture
          }

        }

      }
    },
    methods: {
      getBannerList() {
        bannerList()
          .then(res => {
            res.data.forEach(item => {
              this.bannerList.push(uni.$util.assetsPath.IMAGE_URL + item.pictureUrl)
            })

          })
          .catch(err => {

          })
      },
      goodsCategoryList() {
        goodsCategoryList(1)
          .then(res => {
            this.homeFlList = []
            this.homeFlList = res.data
            this.homeFlList.push({
              categoryName: "全部",
              categoryPicture: '../../static/images/ic_all.png'
            })
          })
          .catch(err => {

          })
      },
      /**
       * 获取首页列表数据
       */
      getList() {
        let params = {
          pageNum: 1,
          pageSize: 10,
          keyword: "",
          sortord: "",
          categoryId: ""
        }
        homeList(params)
          .then(res => {
            this.dataList = res.data.records
            uni.$util.uniStore.setStorage("home-list", res.data.records)

          })
          .catch(err => {

          })

      },
      itemClick(index) {
        if (index == 3) {
          uni.switchTab({
            url: '../classification/index',
            fail:()=>{
              console.log('switchTab 失败')
            }
          })
        } else {
          uni.navigateTo({
            url: `../more-shopping/index?categoryId=${this.homeFlList[index].id}`,
            fail:()=>{
              console.log('navigateTo 失败')
            }
          })
        }
      },
      showCallPopup() {
        this.$refs.callPopup.open()
      },
      toMore() {
        uni.navigateTo({
          url: '../more-shopping/index'
        })
      },
      goToDetail(item) {
        uni.navigateTo({
          url: `../shopping-info/index?id=${item.id}`
        })
      }
    }
  }
</script>

<style scoped>
  .head-bg {
    background-image: url(../../static/images/bg_homepage.png);
    background-position: 100%;
    background-repeat: no-repeat;
    height: 316rpx;
    display: flex;
    width: 750rpx;
  }

  .grid-text {
    font-size: 24rpx;
    margin-top: 10rpx;
    color: #333333;
  }

  .title-view {
    position: absolute;
    top: 20rpx;
    width: 750rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .title-text {
    flex: 1;
    text-align: center;
    font-weight: bold;
    color: #FFFFFF;
    font-size: 36rpx;
  }

  .fire-title {
    font-weight: bold;
    font-size: 36rpx;
    color: #333333;
    text-align: left;
    margin-left: 20rpx;
    line-height: 36rpx;
    flex: 1;
    font-family: PingFangSC-Medium;
  }

  .more-text {
    color: #999999;
    font-size: 26rpx;
    font-family: PingFangSC-Regular;
  }

  /* #ifdef H5 */
  .u-demo-area /deep/ .u-row {
    display: flex;
    /* flex-wrap: wrap; */
    height: 100%;
    flex: 1;
    align-items: center;
    padding-left: 15rpx;
    padding-right: 15rpx;
    padding-bottom: 30rpx;
  }

  /* #endif */

  .customer-service-view {
    position: fixed;
    right: 24rpx;
    bottom: 180rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .customer-service-text {
    height: 32rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
    border-radius: 16rpx;
    color: #FFFFFF;
    font-size: 20rpx;
    font-family: PingFangSC-Regular;
    background: linear-gradient(to right, #75E0A7, #40B7C8);
    text-align: center;
    line-height: 32rpx;
    margin-top: -15rpx;
    z-index: 2;
  }
</style>
