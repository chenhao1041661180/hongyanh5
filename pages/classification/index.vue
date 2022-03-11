<template>
  <!-- 分类 -->
  <view class="u-menu-wrap">
    <u-grid :border="false" col="3" >
      <u-grid-item v-for="(item,index) in homeFlList" :index="index" @click="itemClick"
        bgColor="rgba(255,255,255,0)">
        <view class="item-view">
          <image :src="imgUrl(item)" style="width: 95rpx;height: 95rpx;" />
          </image>
          <view class="grid-text">{{ item.categoryName }}</view>
        </view>

      </u-grid-item>

    </u-grid>
  </view>
</template>

<script>
  import {
    goodsCategoryList
  } from '@/api/classification.js'

  export default {
    data() {
      return {
        homeFlList: []

      }
    },
    computed: {
      imgUrl() {
        return function(item) {
          const imageUrl = uni.$util.assetsPath.IMAGE_URL + item.categoryPicture
          return imageUrl
        }
      }
    },
    mounted() {
      this.goodsCategoryList()
    },
    methods: {
      goodsCategoryList() {
        goodsCategoryList('')
          .then(res => {
            console.log(res)
            this.homeFlList = res.data
          })
          .catch(err => {

          })
      },
      itemClick(index) {
          uni.navigateTo({
            url: `../more-shopping/index?categoryId=${this.homeFlList[index].id}`
          })
      }
    }
  }
</script>

<style scoped>
  .u-menu-wrap {
    /* flex: 1; */
    /* display: flex; */
    /* overflow: hidden; */
  }

  .item-view {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    margin-left: 9rpx;
    margin-right: 9rpx;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 192rpx;
  }

  .grid-text {
    font-size: 24rpx;
    margin-top: 10rpx;
    color: #333333;
  }
</style>
