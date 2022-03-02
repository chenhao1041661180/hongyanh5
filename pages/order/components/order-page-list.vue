<template>

  <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
    <view class="page-box">
      <order-item v-for="(item,inde) in dataList" :item="item" :key="index"/>
      <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
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

        dataList: [],
        loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
      }
    },
    mounted() {
      this.getMyOrderList()
    },
    methods: {
      getMyOrderList() {

        let param = {
          pageNum: 1,
          pageSize: 10,
          keyword: this.keyword,
          orderStatus: this.status
        }
        getMyOrderList(param)
          .then(res => {
            this.dataList = res.data.records
          })
      },
      reachBottom() {
        // 此tab为空数据
        // if (this.current != 2) {
        //   this.loadStatus.splice(this.current, 1, "loading")
        //   setTimeout(() => {
        //     // this.getOrderList(this.current);
        //   }, 1200);
        // }
      },
    }
  }
</script>

<style>
</style>
