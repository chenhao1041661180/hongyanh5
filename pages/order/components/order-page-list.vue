<template>

  <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
    <view class="page-box">
      <view class="list-view" v-if="dataList.length">
        <order-item v-for="(item,index) in dataList" :item="item" :key="index" @click.native.stop="seeDetail(item)" />
        <u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
      </view>
      <view class="empty-view" v-if="!dataList.length && !firstLoad">
        <u-empty />
      </view>
    </view>
  </scroll-view>
</template>

<script>
  import orderItem from './order-item.vue'
  import {
    getMyOrderList
  } from '@/api/order.js'
  export default {
    components: {
      orderItem
    },
    props: {
      //订单状态 0-待付款;1-待发货;2-待收货;3-已完成；4-已关闭
      status: {
        type: [String, Number],
        default: ""
      },
      keyword: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        firstLoad: true,
        pageNum: 1,
        dataList: [],
        // loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
        loadStatus: 'loadmore'
      }
    },
    mounted() {
      this.getMyOrderList()
    },
    methods: {
      getMyOrderList() {

        let param = {
          pageNum: this.pageNum,
          pageSize: 10,
          keyword: this.keyword,
          orderStatus: this.status
        }
        getMyOrderList(param)
          .then(res => {
            this.firstLoad = false
            if (param.pageNum == 1) {
              this.dataList = []
              //清除原先的数据
              // this.$refs.uWaterfall.clear()
            }
            setTimeout(() => {
              this.dataList = this.dataList.concat(res.data.records)
              this.loadStatus = 'loadmore';
            })
            // this.dataList = res.data.records
          })
      },
      reachBottom() {
        // 此tab为空数据
        this.loadStatus = 'loading';
        this.pageNum = this.pageNum + 1
        // 模拟数据加载
        setTimeout(() => {
          this.getMyOrderList();
        }, 200);
      },
      seeDetail(item) {
        console.log('seeDetail')
        //paymentMode  支付方式：0-在线支付，1-对公支付
        uni.navigateTo({
          url: `./order-detail?orderId=${item.orderId}&paymentMode=${item.paymentMode||0}`
        })
      }
    }
  }
</script>

<style scoped>
  .page-box {
    height: 100%;
    /* background-color: #0A98D5; */
  }

  .empty-view {
    height: 100%;
    width: 100%;
    align-items: center;
    /* display: flex; */
  }
</style>
