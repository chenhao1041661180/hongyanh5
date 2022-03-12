<template>
  <view style="align-items: center; justify-content: center;">
   <!-- <u-navbar title-color="#333333" back-icon-color="#666666" :is-fixed="true" :is-back="true"
      :background="{background: '#FFFFFF'}" :titleBold="true" titleSize="36" z-index="333"
      :back-text-style="{color: '#fff'}" title="购物车" back-icon-name="nav-back" back-icon-size="50" /> -->
    <view class="list-view " v-if="cartList.length">
      <view class="select-all-view" style="flex-direction: row; align-items: center;">
        <view style="padding: 10rpx;" @click="toAllSelect">
          <u-icon custom-prefix="hongyan-icon" :name="allSelect?'a-ic_click_shangpin2x':'a-ic_normal_shangpin2x'"
            size="32" :color="allSelect?'#156FFF': '#CCCCCC'" />
        </view>
        <text class="qx-text">全选</text>
      </view>

      <u-swipe-action bg-color="rgb(250, 250, 250,250)" @open="open" :disabled="false" :index="index"
        v-for="(item, index) in cartList" :key="index" @click="click" :show="false" :btn-width="btnWidth"
        @close="close" :options="options" @content-click="contentClick">
        <shopping-cart-item :item="item" :index="index" @chooseItem="chooseItem" @changeCount="changeCount" />

      </u-swipe-action>

    </view>
    <!-- 空数据View -->
    <view class="empty-view" v-if="!cartList.length && !firstLoad">

      <image src="../../static/images/default_no_data.png" style="width: 241rpx;height: 183rpx;" />
      <text class="empty-text">您的购物车空空如也~</text>
      <text class="to-home-text" @click="toHome">去首页选购吧~</text>
    </view>

    <view class="buttom-view" v-show="cartList.length">
      <view style="height: 104rpx; align-items: center;display: flex;padding-left: 42rpx;">
        <view style="padding: 10rpx;" @click="toAllSelect">
          <u-icon custom-prefix="hongyan-icon" :name="allSelect?'a-ic_click_shangpin2x':'a-ic_normal_shangpin2x'"
            size="32" :color="allSelect?'#156FFF': '#CCCCCC'" />
        </view>
        <text class="qx-text">全选</text>

        <view
          style="height: 70%; flex-direction: column;display: flex;margin-left: 35rpx; justify-content: space-around;flex: 1;">
          <view style="flex-direction: row;display: flex;align-items: center;">

            <text style="color: #666666;font-size: 26rpx;">合计</text>
            <text class="price-text">￥{{allCount}}</text>
          </view>
          <text style="color: #999999;font-size: 24rpx;">已选{{selectAllCart}}件</text>
        </view>
        <text class="js-text" :style="{backgroundColor:allCount?'#2059F7':'#EEEEEE'}" @click="toSubmit">结算</text>
      </view>

    </view>
  </view>
</template>

<script>
  import shoppingCartItem from './components/shopping-cart-item.vue'
  import {
    getPersonalCart,
    cartDelete,
    changeCount
  } from '@/api/shopp-cart.js'
  export default {
    components: {
      shoppingCartItem
    },
    data() {
      return {
        //是否全部选中
        allSelect: false,
        firstLoad: true,
        allCount: 0,
        selectAllCart: 0,
        cartList: [],
        btnWidth: 150,
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#E13036'
          }
        }]
      }
    },

    watch: {

      cartList: {
        handler(newName, oldName) {
          console.log(newName)
          this.allCount = 0
          this.selectAllCart = 0
          newName.forEach(item => {
            if (item.select) {
              //商品价格
              let goodsPriceCount = uni.$util.number.accMul(item.goodsPrice, item.goodsCount)
              this.allCount = uni.$util.number.accAdd(this.allCount, goodsPriceCount)
              this.selectAllCart += item.goodsCount
            }
          })

          let tempList = newName.filter(item => {
            return !item.select
          })

          this.allSelect = !tempList.length

        },
        immediate: true,
        deep: true
      }
    },
    onShow() {
      // this.getPersonalCart()
    },
    onLoad() {
      this.getPersonalCart()
      uni.$on("shopping-cart",this.getPersonalCart)
    },

    beforeDestroy() {
       uni.$off("shopping-cart",this.getPersonalCart)
    },
    methods: {
      getPersonalCart() {
        getPersonalCart()
          .then(res => {
            this.cartList = []
            if (res.data.length) {
              res.data.forEach(item => {
                item.select = false
                this.cartList.push(item)
              })
            }
            this.firstLoad = false
          }).catch(err => {
            this.firstLoad = false
          })
      },
      open(index) {
        // this.list[index].show = true;
        // this.list.map((val, idx) => {
        // 	if (index != idx) this.list[idx].show = false;
        // });
      },
      close(index) {
        // this.list[index].show = false;
      },
      /**
       * 选中某一个商品
       */
      chooseItem(data) {
        console.log('chooseItem')
        this.allSelect = null
        this.cartList[data.index].select = data.isSelect
        // let tempList = this.cartList.filter(item => {
        //   return !item.select
        // })
        // this.allSelect = !tempList.length
      },
      /**
       * @param {Object} e 修改购物车商品数量
       */
      changeCount(e) {
        console.log(e)
        let param = {
          id: this.cartList[e.index].id,
          count: e.value
        }

        changeCount(param)
          .then(res => {

          })
          .catch(err => {

          })

      },
      //去全选
      toAllSelect() {
        this.allSelect = !this.allSelect
        this.cartList.forEach((item, index) => {
          this.cartList[index].select = this.allSelect
        })

      },

      /**
       * 删除商品
       */
      click(index) {

        uni.showLoading({
          title: ""
        })
        cartDelete([this.cartList[index].id])
          .then(res => {
            uni.hideLoading()

            uni.showToast({
              icon: 'none',
              title: "删除成功"
            })
            this.getPersonalCart()

          })
          .catch(err => {
            uni.hideLoading()

          })
      },

      contentClick(index) {

      },

      toHome() {
       let enstring =  uni.$util.uniStore.getStorage("enstring");
        uni.reLaunch({
          url: `../home/index?enstring=${enstring}`
        })
        // uni.switchTab({
        //   url:'../home/index'
        // })
      },
      toSubmit() {
        if (!this.allCount) {
          uni.showToast({
            icon: 'none',
            title: '还未选择商品'
          })
          return
        }

        let idArr = []
        this.cartList.forEach(item => {
          if (item.select) {
            idArr.push(item.id)
          }
        })

        uni.navigateTo({
          url: `../shopping-info/confirm-order?&orderWay=2&ids=${idArr.toString()}`
        })
      }
    }

  }
</script>

<style scoped>
  .qx-text {
    color: #333333;
    font-size: 30rpx;
    margin-left: 26rpx;
  }

  .list-view {
    flex: 1;
    flex-direction: column;
    width: 702rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding-bottom: 16rpx;
    margin: 24rpx 24rpx 134rpx 24rpx;
  }

  .select-all-view {
    height: 84rpx;
    align-items: center;
    display: flex;
    padding-left: 18rpx;
  }

  .empty-view {
    width: 750rpx;
    height: 80%;
    display: flex;
    background-color: #F7F7F7;
    flex: 1;
    margin-bottom: ;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .empty-text {
    color: #999999;
    /* font-weight: bold; */
    font-size: 32rpx;
    margin-top: 40rpx;
  }

  .to-home-text {
    color: #2059F7;
    padding-left: 30rpx;
    padding-right: 30rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    border-radius: 36rpx;
    margin-top: 30rpx;
    font-size: 32rpx;
    border: 2rpx solid #2059F7;
  }

  .buttom-view {
    height: 208rpx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: env(safe-area-inset-bottom);
    background-color: #FFFFFF;
  }

  .price-text {
    font-family: medium;
    color: #EF293B;
    font-weight: bold;
    font-size: 28rpx;
    margin-left: 5rpx;
  }

  .js-text {
    height: 66rpx;
    margin-right: 24rpx;
    border-radius: 33rpx;
    background-color: #2059F7;
    color: #FFFFFF;
    font-size: 30rpx;
    width: 180rpx;
    text-align: center;
    line-height: 66rpx;
  }
</style>
