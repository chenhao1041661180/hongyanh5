<template>
  <!-- 分类 -->
  <view class="u-menu-wrap">
    <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
      :scroll-into-view="itemId">
      <view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
        :class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
        <text class="u-line-1">{{item.categoryName}}</text>
      </view>
    </scroll-view>
    <block v-for="(item,index) in tabbar" :key="index">
      <scroll-view scroll-y class="right-box" v-if="current==index">
        <view class="page-view">
          <view class="class-item">
            <view class="item-title">
              <text>{{item.categoryName}}</text>
            </view>
            <view class="item-container">
              <view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
                <!-- <image class="item-menu-image" :src="item1.icon" mode=""></image>
   						<view class="item-menu-name">{{item1.name}}</view> -->
                <linear-more-shopping-item></linear-more-shopping-item>
              </view>

              <u-loadmore v-if="dataList.length" bg-color="#F7F7F7" :status="loadingStatus[current]"
                @loadmore="addRandomData" height="70">
              </u-loadmore>
            </view>
          </view>
          <u-empty v-if="!dataList.length && !firstLoad" style="height: 800rpx;"> </u-empty>



        </view>
      </scroll-view>
    </block>
  </view>
</template>

<script>
  import linearMoreShoppingItem from '../more-shopping/components/linear-more-shopping-item.vue'
  import {
    goodsCategoryList
  } from '@/api/classification.js'
  import {
    homeList
  } from '@/api/home.js'
  export default {
    components: {
      linearMoreShoppingItem
    },
    data() {
      return {
        tabbar: [],
        current: 0, // 预设当前项的值
        itemId: '', // 栏目右边scroll-view用于滚动的id
        scrollTop: 0, //tab标题的滚动条位置
        oldScrollTop: 0,
        menuHeight: 0, // 左边菜单的高度
        menuItemHeight: 0, // 左边菜单item的高度
        timer: null, // 定时器
        loadingStatus: []
      }
    },
    mounted() {
      this.goodsCategoryList()
    },
    methods: {
      goodsCategoryList() {
        goodsCategoryList("")
          .then(res => {

            console.log(res)
            this.tabbar = res.data
            res.data.forEach(item => {
              this.loadingStatus.push("loading")
            })
          })
          .catch(err => {

          })
      },
      async swichMenu(index) {

        // if (index == this.current) return;
        // this.scrollRightTop = this.oldScrollTop;
        // this.$nextTick(function() {
        //   this.scrollRightTop = this.arr[index];
        //   this.current = index;
        //   this.leftMenuStatus(index);
        // })
        if (index == this.current) return;
        this.current = index;
        // 如果为0，意味着尚未初始化
        if (this.menuHeight == 0 || this.menuItemHeight == 0) {
          await this.getElRect('menu-scroll-view', 'menuHeight');
          await this.getElRect('u-tab-item', 'menuItemHeight');
        }
        // 将菜单菜单活动item垂直居中
        this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
      },
      // 获取右边菜单每个item到顶部的距离
      getMenuItemTop() {
        new Promise(resolve => {
          let selectorQuery = uni.createSelectorQuery();
          selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
            // 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
            if (!rects.length) {
              setTimeout(() => {
                this.getMenuItemTop();
              }, 10);
              return;
            }
            rects.forEach((rect) => {
              // 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
              this.arr.push(rect.top - rects[0].top);
              resolve();
            })
          }).exec()
        })
      },
      // 设置左边菜单的滚动状态
      async leftMenuStatus(index) {
        this.current = index;
        // 如果为0，意味着尚未初始化
        if (this.menuHeight == 0 || this.menuItemHeight == 0) {
          await this.getElRect('menu-scroll-view', 'menuHeight');
          await this.getElRect('u-tab-item', 'menuItemHeight');
        }
        // 将菜单活动item垂直居中
        this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
      },
      // 获取一个目标元素的高度
      getElRect(elClass, dataVal) {
        new Promise((resolve, reject) => {
          const query = uni.createSelectorQuery().in(this);
          query.select('.' + elClass).fields({
            size: true
          }, res => {
            // 如果节点尚未生成，res值为null，循环调用执行
            if (!res) {
              setTimeout(() => {
                this.getElRect(elClass);
              }, 10);
              return;
            }
            this[dataVal] = res.height;
            resolve();
          }).exec();
        })
      },
      /**
       * 上拉加载更多触发
       */
      addRandomData() {
        console.log('addRandomData')
        this.loadStatus[this.current] = 'loading';
        this.pageNum = this.pageNum + 1
        // 模拟数据加载
        setTimeout(() => {
          // this.getList();
        }, 200);
      },
    }
  }
</script>

<style scoped>
  .u-menu-wrap {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .u-tab-view {
    width: 220rpx;
    height: 100%;
  }

  .u-tab-item {
    height: 100rpx;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #444;
    font-weight: 400;
    line-height: 1;
  }

  .u-tab-item-active {
    position: relative;
    color: #2059F7;
    font-size: 28rpx;
    font-weight: 600;
    background: #f6f6f6;
  }

  .u-tab-item-active::before {
    content: "";
    position: absolute;
    border-left: 4px solid #2059F7;
    height: 32rpx;
    left: 0;
    top: 34rpx;
  }

  .page-view {
    padding: 16rpx;
  }

  .class-item {
    margin-bottom: 30rpx;
    background-color: #fff;
    padding: 16rpx;
    border-radius: 8rpx;
  }

  .class-item:last-child {
    min-height: 100vh;
  }

  .item-title {
    font-size: 26rpx;
    color: $u-main-color;
    font-weight: bold;
  }

  .item-container {
    display: flex;
    flex-wrap: wrap;
  }

  .thumb-box {
    width: 33.333333%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20rpx;
  }
</style>
