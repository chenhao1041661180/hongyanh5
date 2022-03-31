<template>
  <!-- 更多商品 -->
  <view>
    <u-navbar title-color="#333333" back-icon-color="#666666" :is-fixed="true" :is-back="true"
      :background="{background: '#FFFFFF'}" :titleBold="true" titleSize="36" z-index="333"
      :back-text-style="{color: '#fff'}" :title="title" back-icon-name="nav-back" back-icon-size="50"
      :border-bottom="false">
      <!-- <view class="slot-wrap" v-if="useSlot"> -->
      <view class="search-wrap" v-if="search">
        <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
        <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#666666'}"
          action-text="取消" @search="searchCallback" @custom="cancelSearch" :focus="true" placeholder="输入商品编码或商品名称搜索">
        </u-search>
      </view>
      <!-- </view> -->
      <view class="navbar-right" slot="right" @click="showSearch" v-if="slotRight">
        <u-icon name="a-ic_search2x" custom-prefix="hongyan-icon" color="#B2B2B2" size="30"></u-icon>
      </view>
    </u-navbar>
    <view
      style="height: 84rpx;background-color: #FFFFFF;display: flex;flex-direction: row;padding-right: 40rpx;position: fixed;width: 100%;z-index: 33;"
      v-if="!useSlot">
      <view style="flex: 1;">
        <u-dropdown :close-on-click-mask="true" ref="uDropdown" activeColor="#333333" inactiveColor="#999999"
          titleSize="32" style="width: 500rpx;" menuIcon="arrow-down-fill" :menuIconSize="10" @open="dropOpen"
          @close="dropClose">
          <u-dropdown-item :title="leftDropText" @change="change" :options="options1"  >
          </u-dropdown-item>
          <u-dropdown-item title="销量" :drapIcon="false" :showMask="false">
          </u-dropdown-item>
        </u-dropdown>
      </view>
      <u-icon :name="listGrad?'a-ic_pobuliu2x':'a-ic_liebiao2x'" custom-prefix="hongyan-icon" size="32" color="#999999"
        @click="changeListStyle"></u-icon>
    </view>

    <view class="list-view" v-if="!useSlot">

      <!-- <view class="waterfall-view" v-if="listGrad && dataList.length"> -->
       <!-- <u-waterfall v-model="dataList" ref="uWaterfall">
          <template v-slot:left="{ leftList }">
            <home-item class="demo-warter" v-for="(item, index) in leftList" :key="index"
              @click.native="goToDetail(item)" :item="item" :index="index"> -->
              <!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
          <!--  </home-item>
          </template>
          <template v-slot:right="{ rightList }">
            <home-item class="demo-warter" v-for="(item, index) in rightList" :key="index"
              @click.native="goToDetail(item)" :item="item" :index="index">
            </home-item>
          </template>
        </u-waterfall -->
        <view class="u-demo-area" v-if="listGrad && dataList.length">
          <u-row gutter="12" offset="1" v-if="dataList.length">
            <u-col span="6" v-for="(item,index)  in dataList" @click="goToDetail(item)" :key="index">
              <home-item :item="item" :index="index" />
            </u-col>

          </u-row>
        <!-- </view> -->
      </view>

      <view class="linear-view" v-if="!listGrad && dataList.length">
        <linear-more-shopping-item v-for="(item, index) in dataList" :key="index" @click.native="goToDetail(item)"
          :item="item" :index="index" />
      </view>

      <u-empty v-if="!dataList.length && !firstLoad" style="height: 800rpx;"> </u-empty>



      <u-loadmore v-if="dataList.length" bg-color="#F7F7F7" :status="loadStatus" @loadmore="addRandomData" height="60">
      </u-loadmore>
    </view>

    <!-- 搜索历史 -->
    <view class="search-view" v-if="useSlot">
      <view style="display: flex;flex-direction: row;align-items: center; flex: 1;padding-top: 28rpx;">
        <text class="search-history-text">搜索历史</text>
        <u-icon name="a-ic_delete2x" custom-prefix="hongyan-icon" size="38" color="#999999" @click="clearHistory">
        </u-icon>
      </view>

      <view style="display: flex;
			flex-wrap: wrap;">
        <text class="history-item-text" v-for="(item,index) in historyList">{{item}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  // import moreShoppingItem from './components/more-shopping-item.vue'
  import homeItem from '../home/components/home-item.vue'
  import linearMoreShoppingItem from './components/linear-more-shopping-item.vue'

  import {
    homeList
  } from '@/api/home.js'
  export default {
    components: {
      // moreShoppingItem,
      homeItem,
      linearMoreShoppingItem
    },
    data() {
      return {
        showMask:true,
        firstLoad: true,
        leftDropText: '综合',
        listGrad: true,
        title: '更多商品',
        slotRight: true,
        useSlot: false,
        search: false,
        keyword: '', //搜索内容
        showAction: true,
        pageNum: 1,
        sortord: "", //排序方式，0-销量降序，1-价格升序，2-价格降序，为空时默认按销量排序
        historyList: [],
        options1: [{
            label: '价格升序',
            value: 1,
          },
          {
            label: '价格降序',
            value: 2,
          }
        ],
        loadStatus: 'loadmore',
        dataList: [],
        categoryId:''
      }
    },
    onLoad(option) {
      this.categoryId = option.categoryId
    },
    mounted() {
      this.getList()
      this.doWithHistory()
      window.addEventListener("popstate", function(e) {
        console.log(e)
          // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
      }, false);
    },
    onBackPress(options) {
    		console.log('from:' + options.from)
        return false
    	},
    methods: {
      /**
       * 上拉加载更多触发
       */
      onReachBottom() {
        console.log('onReachBottom')
        this.loadStatus = 'loading';
        this.pageNum = this.pageNum + 1
        // 模拟数据加载
        setTimeout(() => {
          this.getList();
        }, 200);
      },
      getList() {
        let params = {
          pageNum: this.pageNum,
          pageSize: 10,
          keyword: this.keyword,
          sortord: this.sortord,
          categoryId: this.categoryId
        }
        homeList(params)
          .then(res => {
            this.firstLoad = false
            if (params.pageNum == 1) {
              this.dataList = []
              //清除原先的数据
              // this.$refs.uWaterfall.clear()
            }
            setTimeout(() => {
              if(res.data.records){
                 this.dataList = this.dataList.concat(res.data.records)
              }

              this.loadStatus = 'loadmore';
            })

          })
          .catch(err => {

          })
      },
      changeListStyle() {
        this.listGrad = !this.listGrad
      },
      showSearch() {
        this.slotRight = false
        this.useSlot = true
        this.search = true
        this.title = null

      },
      /**
       * 处理历史搜索数据
       */
      doWithHistory() {
        let temHistoryListStr = uni.$util.uniStore.getStorage("historyList")
        let temHistoryList = []
        if (temHistoryListStr) {
          temHistoryList = temHistoryListStr.split(",")
        }
        this.historyList = temHistoryList
        return temHistoryList
      },
      /**
       * 清除历史
       */
      clearHistory() {
        uni.$util.uniStore.setStorage("historyList", "")
        this.historyList = []
      },
      /**
       * @param {Object} e 搜索返回
       */
      searchCallback(e) {
        this.keyword = e
        this.useSlot = false
        let temHistoryList = this.doWithHistory();
        //保存当前搜索的数据 添加到第一位
        temHistoryList.unshift(e)
        //去重
        temHistoryList = this.uniq(temHistoryList)
        this.historyList = temHistoryList
        let historyListStr = temHistoryList.toString()
        uni.$util.uniStore.setStorage("historyList", historyListStr)
        this.getList()
      },
      uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
          }
        }
        return temp;
      },
      /**
       * 取消搜索
       */
      cancelSearch() {
        this.keyword = ""
        this.slotRight = true
        this.useSlot = false
        this.search = false
        this.title = "更多商品"
        this.pageNum = 1

        setTimeout(() => {
          this.getList()
        })

      },
      dropOpen(current) {
        if (current == 1) {
          //初始化页数
          this.pageNum = 1
          this.sortord = 0
          this.leftDropText = "综合"
          this.getList()
        }
      },
      dropClose(current) {
        if (current == 1) {
          //初始化页数
          this.pageNum = 1
          this.sortord = ""
          this.leftDropText = "综合"
          this.getList()
        }
      },

      change(index) {
        //初始化页数
        this.pageNum = 1;
        this.leftDropText = this.options1[index].label
        this.sortord = this.options1[index].value
        this.showMask = false
        this.getList()

      },
      /**
       * 上拉加载更多触发
       */
      addRandomData() {
      console.log('addRandomData')
      this.loadStatus = 'loading';
      this.pageNum = this.pageNum + 1
      // 模拟数据加载
      setTimeout(() => {
        this.getList();
      }, 200);
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
  .search-wrap {
    align-items: center;
    flex: 1;
  }
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
  .navbar-right {
    margin-right: 24rpx;
    display: flex;
  }

  .list-view {
    display: flex;
    flex-direction: column;
    width: 750rpx;
    height: 100%;
    margin-top: 84rpx;
  }

  .linear-view {
    margin: 24rpx;
    border-radius: 20rpx;
    padding-left: 24rpx;
    padding-top: 24rpx;
    background-color: #FFFFFF;
  }

  .search-view {
    width: 750rpx;
    height: 100%;
    background-color: #FFFFFF;
    padding-left: 24rpx;
    padding-right: 44rpx;
  }

  .search-history-text {
    color: #999999;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    flex: 1;
  }

  .history-item-text {
    height: 60rpx;
    background-color: #F6F8F9;
    border-radius: 30rpx;
    padding-left: 34rpx;
    padding-right: 34rpx;
    margin-left: 12rpx;
    color: #333333;
    margin-top: 16rpx;
    font-family: PingFangSC-Regular;
    line-height: 60rpx;
    margin-bottom: 16rpx;
    font-size: 30rpx;
    margin-right: 12rpx;
    overflow: hidden;
    max-width: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .demo-warter {
    border-radius: 8px;
    margin: 5px;
    background-color: #ffffff;
    /* padding: 8px; */
    position: relative;
  }
</style>
