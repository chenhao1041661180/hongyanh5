<template>
  <!-- 订单管理页面 -->
  <view style="width: 100%;" class="wrap">
    <u-navbar back-icon-color="#666666" :titleBold="true" :background="{background: 'rgba(255,255,255)'}" z-index="333"
      title="订单管理" :border-bottom="false" />
    <u-tabs-swiper activeColor="#0E53CF" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
      swiperWidth="750"></u-tabs-swiper>
    <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
      <swiper-item class="swiper-item">
       <order-page-list status=""/>
      </swiper-item>
      <swiper-item class="swiper-item">
       <order-page-list :status="0"/>
      </swiper-item>
      <swiper-item class="swiper-item">
        <order-page-list :status="1"/>
      </swiper-item>
      <swiper-item class="swiper-item">
       <order-page-list :status="2"/>
      </swiper-item>
      <swiper-item class="swiper-item">
        <order-page-list :status="3"/>
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
        current:0,
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

    onLoad(option ) {
      this.current = option.current
      this.swiperCurrent = option.current
    },

    mounted() {
      // this.getMyOrderList()
    },
    methods: {

      reachBottom() {
        // 此tab为空数据
        if (this.current != 2) {
          this.loadStatus.splice(this.current, 1, "loading")
          setTimeout(() => {
            // this.getOrderList(this.current);
          }, 1200);
        }
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
