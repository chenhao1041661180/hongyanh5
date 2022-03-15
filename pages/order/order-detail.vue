<template>
  <!-- 订单详情页面 -->
  <view style="width: 100%;">
    <u-navbar :title-bold="true" :background="{background: 'rgba(255,255,255)'}" :border-bottom="false"
      back-icon-color="#666666" z-index="333" title="订单详情" />
    <scroll-view :scroll-y="true" style="padding-bottom: 120rpx;">

      <view>
        <view class="head-bg-view">
          <image src="../../static/images/bg_dingdanxiangqing.png" style="width: 100%;height: 214rpx;display: flex;" />
          <view class="status-view">
            <u-icon custom-prefix="hongyan-icon" name="a-ic_to_pay2x" color="#FFFFFF" size="38" />
            <text class="status-text">{{ orderInfo.writeOff == 0 ?'待核销':orderInfo.writeOff ==2?'核销不通过': orderStatusStr }}</text>
          </view>

          <view class="address-view">
            <view v-if="orderInfo.shippingAddressVo" class="address-view2" @click="toAddressList">
              <image src="../../static/images/ic_address.png" style="width: 32rpx;height: 32rpx;" />
              <view class="address-info-view">
                <text class="ssq-text">{{ orderInfo.shippingAddressVo.consigneeRegionName }}</text>
                <text class="detail-address">{{ orderInfo.shippingAddressVo.consigneeAddress }}</text>
                <view style="display: flex;flex-direction: row;align-items: center;">
                  <text class="user-info">{{ orderInfo.shippingAddressVo.consigneeName }}</text>
                  <text class="user-info"
                    style="margin-left: 15rpx;">{{ orderInfo.shippingAddressVo.consigneeMobile }}</text>
                </view>
              </view>
              <u-icon v-show="orderStatus ==0" custom-prefix="hongyan-icon" name="a-ic_arrow_shouhuodizhi2x" size="26"
                color="#CCCCCC" />
            </view>
            <image src="../../static/images/img_address_line.png" class="line-image" />
          </view>
        </view>
        <view class="shopping-list-view">

          <view v-for="(child,index) in orderInfo.orderGoodsItemVos" class="content-view">
            <image :src="imageUrl" style="width: 192rpx;height: 192rpx;border-radius: 8rpx;" />
            <view class="content-item-view">
              <text class="title-text">{{ child.goodsName }}</text>
              <text class="describle-text">{{ child.goodsDescribe }}</text>
              <view style="display: flex;flex-direction: row;align-items: center;">
                <text class="price-text">¥{{ child.goodsPrice }}</text>
                <text class="num-text">x{{ child.goodsCount }}</text>
              </view>
            </view>
          </view>

        </view>

        <view class="shopping-list-view">
          <text
            style="width: 100%; font-family: PingFangSC-Regular; color: #333333; font-size: 30rpx;margin-bottom: 10rpx;">订单信息</text>

          <view class="order-item-view">
            <text class="order-item-text">订单编号</text>
            <text class="order-item-text" style="color: #333333;">{{ orderInfo.orderId }}</text>
          </view>
          <view class="order-item-view">
            <text class="order-item-text">创建时间</text>
            <text class="order-item-text" style="color: #333333;">{{ orderInfo.gmtCreate }}</text>
          </view>
          <view class="order-item-view" v-if="orderInfo.writeOff==2">
            <text class="order-item-text">核销失败原因</text>
            <text class="order-item-text" style="color: #F94265; flex: 1; text-align: end;margin-left: 10rpx;">{{ orderInfo.writeOffRefusalReason }}{{ orderInfo.writeOffRefusalReason }}{{ orderInfo.writeOffRefusalReason }}</text>
          </view>
        </view>

        <view v-if="paymentMode==1" class="shopping-list-view">
          <text
            style="width: 100%; font-family: PingFangSC-Regular; color: #333333; font-size: 30rpx;margin-bottom: 10rpx;">汇款账户信息</text>

          <view class="order-item-view">
            <text class="order-item-text">公司名称</text>
            <text class="order-item-text" style="color: #333333;">江苏职工之家网络信息科技有限公司</text>
          </view>
          <view class="order-item-view">
            <text class="order-item-text">信用代码</text>
            <text class="order-item-text" style="color: #333333;">91320106302645648U</text>
          </view>
          <view class="order-item-view">
            <text class="order-item-text">银行账户</text>
            <text class="order-item-text" style="color: #333333;">32001595636052513089</text>
          </view>
          <view class="order-item-view">
            <text class="order-item-text">开户行</text>
            <text class="order-item-text" style="color: #333333;">中国建设银行南京市白下支行柜台</text>
          </view>
          <view class="order-item-view">
            <text class="order-item-text">联系电话</text>
            <text class="order-item-text" style="color: #333333;">13062598165</text>
          </view>

          <view class="order-item-view">
            <text class="order-item-text"
              style="font-size: 25rpx;line-height: 1.5;">（1）企业/单位可通过客服电话及客户经理完成采购需求、商品报价、商品样品寄送以及其他相关事宜：
              客服电话：4000615855；
              （2）转款/汇款前请仔细核对账户信息；
              （3）对公汇款后请保存汇款凭证并及时与客户经理确认入账；
              （4）汇款完成后请及时与客户经理对接并确认交/收货事宜；
              （5）涉及商品售后及其他相关事宜请及时与客户经理对接并确认。</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-if="orderStatus != 4 && orderStatus!=1" class="bottom-view">
      <text class="bottom-btn-text delete-text" @click="showDeletePopup = true">删除订单</text>
      <text class="bottom-btn-text gm-text" @click="toConfirmOrder">{{ orderInfo.paymentMode==1?'上传支付凭证':'去付款' }}</text>
    </view>
 <view v-else-if="orderInfo.writeOff ==0 ||orderInfo.writeOff ==2" class="bottom-view">
      <text class="bottom-btn-text delete-text" @click="modifyPz">修改凭证</text>

    </view>


    <u-modal ref="uModal" v-model="showDeletePopup" :show-cancel-button="true" :async-close="false" title="删除订单"
      content="确定删除订单吗？删除后,订单将不能恢复" @confirm="confirm" />
  </view>
</template>

<script>
  import {
    getOrderDetail,
    deleteOrder
  } from '@/api/order.js'
  export default {
    data() {
      return {
        showDeletePopup: false,
        orderId: '',
        paymentMode: 0, // 支付方式：0-在线支付，1-对公支付
        orderInfo: {},
        orderStatus: ''
      }
    },

    onLoad(option) {
      this.orderId = option.orderId
      this.paymentMode = option.paymentMode
      this.orderStatus = option.orderStatus
      this.orderStatusStr = option.orderStatusStr
    },
    computed: {
      imageUrl() {
        if (this.orderInfo && this.orderInfo.orderGoodsItemVos.thumbnail) {
          const imageUrl = uni.$util.assetsPath.IMAGE_URL + this.orderInfo.orderGoodsItemVos.thumbnail
          return imageUrl
        } else {
          return uni.$util.config.loadingImg
        }
      }
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail() {
        uni.showLoading({
          title: ''
        })
        getOrderDetail(this.orderId)
          .then(res => {
            uni.hideLoading()
            this.orderInfo = res.data
          }).catch(err => {
            uni.hideLoading()
          })
      },
      // 删除订单
      toDeleteOrder() {
        uni.showLoading({
          title: ''
        })
        deleteOrder(this.orderInfo.orderId)
          .then(res => {
            uni.hideLoading()
            uni.showToast({
              icon: 'none',
              title: '订单删除成功'
            })
            uni.$emit('orderList')
            uni.navigateBack({})
          }).catch(err => {
            uni.hideLoading()
          })
      },
      // 去付款
      toConfirmOrder() {
        if (this.orderInfo.paymentMode == 1) {
          // 对公付款
          uni.navigateTo({
            url: `./order-public?orderId=${this.orderInfo.orderId}&orderPayId=${this.orderInfo.orderPayId}&modify=false`
          })
        } else {
          // 在线支付
          // window.open(this.href + this.orderInfo.orderPayId)
          window.location.href = uni.$util.PAY_HERF + this.orderInfo.orderPayId
        }
      },
      confirm() {
        this.showDeletePopup = false
        setTimeout(() => {
          this.toDeleteOrder()
        }, 200)
      },
      //去修改凭证
      modifyPz(){
          // 对公付款
          uni.navigateTo({
            url: `./order-public?orderId=${this.orderInfo.orderId}&orderPayId=${this.orderInfo.orderPayId}&modify=true`
          })
      }
    }
  }
</script>

<style scoped>
  .head-bg-view {
    z-index: 1;
    flex-direction: column;
    position: relative;
    display: flex;
  }

  .status-view {
    position: absolute;
    display: flex;
    top: 44rpx;
    align-items: center;
    left: 26rpx;
  }

  .status-text {
    font-size: 36rpx;
    color: #FFFFFF;
    margin-left: 10rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
  }

  .address-view {
    display: flex;
    z-index: 4000;
    margin: -80rpx 24rpx 24rpx 24rpx;
    min-height: 170rpx;
    padding-left: 24rpx;
    padding-right: 24rpx;
    align-items: center;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    padding-top: 20rpx;
  }

  .address-view2 {
    flex-direction: row;
    display: flex;
    min-height: 170rpx;
    width: 100%;
    align-items: center;
  }

  .address-info-view {
    display: flex;
    flex: 1;
    margin-right: 10rpx;
    flex-direction: column;
    margin-left: 14rpx;
  }

  .detail-address {
    margin-top: 8rpx;
    margin-bottom: 8rpx;
    color: #343434;
    font-size: 34rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
  }

  .ssq-text {
    color: #343434;
    font-size: 26rpx;
    font-family: PingFangSC-Regular;
  }

  .no-address {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    color: #CCCCCC;
    padding-bottom: 20rpx;
  }

  .no-address2 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-info {
    margin-bottom: 24rpx;
    color: #343434;
    font-size: 26rpx;
    font-family: PingFangSC-Regular;
  }

  .line-image {
    width: 100%;
    background-repeat: no-repeat;
    height: 6rpx;
  }

  .shopping-list-view {
    display: flex;
    margin: 24rpx;
    padding-left: 24rpx;
    padding-right: 24rpx;
    align-items: center;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    padding-top: 20rpx;
  }

  .content-view {
    margin-left: 24rpx;
    flex-direction: row;
    display: flex;
    margin-bottom: 30rpx;
    margin-top: 30rpx;

  }

  .content-item-view {
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    justify-content: space-around;
  }

  .title-text {
    color: #333333;
    font-size: 28rpx;
    word-break: break-all;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .describle-text {
    width: 470rpx;
    color: #999999;
    font-size: 26rpx;
    padding-right: 20rpx;
    word-break: break-all;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-text {
    font-size: 30rpx;
    font-weight: bold;
    font-family: medium;
  }

  .num-text {
    margin-left: 15rpx;
    color: #999999;
    font-size: 26rpx;
    margin-top: 6rpx;
  }

  .order-item-view {
    display: flex;
    width: 100%;
    padding-top: 12rpx;
    padding-bottom: 12rpx;
    justify-content: space-between;
  }

  .order-item-text {
    color: #999999;
    font-size: 30rpx;
    font-family: PingFangSC-Regular;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    align-items: center;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(104rpx + env(safe-area-inset-bottom));
    padding-left: 34rpx;
    padding-right: 24rpx;
    width: 100%;
    justify-content: flex-end;
    flex-direction: row;
    display: flex;
    background-color: #FFFFFF;
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

  .delete-text {}

  .gm-text {
    margin-left: 20rpx;
    background-color: #2059F7;
    border: 0;
    color: #FFFFFF;
  }
</style>
