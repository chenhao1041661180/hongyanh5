<template>
  <!-- 订单管理页面 -->
  <view style="width: 100%;" class="wrap">
    <u-navbar back-icon-color="#666666" :titleBold="true" :background="{background: 'rgba(255,255,255)'}" z-index="333"
      title="订单管理" :border-bottom="false" />
    <u-tabs-swiper activeColor="#0E53CF" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
      swiperWidth="750"></u-tabs-swiper>
    <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
      <swiper-item class="swiper-item">
        <order-page-list status="" ref="pageList1" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <order-page-list :status="0" ref="pageList2" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <order-page-list :status="1" ref="pageList3" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <order-page-list :status="2" ref="pageList4" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <order-page-list :status="3" ref="pageList5" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import orderPageList from './components/order-page-list.vue'

  export default {

    components: {
      orderPageList
    },
    data() {
      return {
        current: 0,
        swiperCurrent: 0,
        list: [{
            name: '全部'
          },
          {
            name: '待付款'
          },
          {
            name: '待发货'
          },
          {
            name: '待收货'
          },
          {
            name: '已完成',
            count: 0
          }
        ],
      }
    },

    onLoad(option) {
      this.current = option.current
      this.swiperCurrent = option.current
    },

    mounted() {
      uni.$on('orderList', this.refreshList)
    },

    beforeDestroy() {
      uni.$off('orderList', this.refreshList)
    },
    methods: {
      refreshList() {
        this.$refs.pageList1.refreshList()
        this.$refs.pageList2.refreshList()
        this.$refs.pageList3.refreshList()
        this.$refs.pageList4.refreshList()
        this.$refs.pageList5.refreshList()
      },
      // tab栏切换
      change(index) {
        this.swiperCurrent = index;
        // this.getOrderList(index);
      },
      transition({
        detail: {
          dx
        }
      }) {
        this.$refs.tabs.setDx(dx);
      },
      animationfinish({
        detail: {
          current
        }
      }) {
        this.$refs.tabs.setFinishCurrent(current);
        this.swiperCurrent = current;
        this.current = current;
      }
    }
  }
</script>

<style scoped>
  .wrap {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--window-top));
    width: 100%;
  }

  .swiper-box {
    flex: 1;
  }

  .swiper-item {
    height: 100%;
  }
</style>
