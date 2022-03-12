<template>
  <!-- 新增收货地址 -->
  <view style="width: 100%;">
    <u-navbar back-icon-color="#666666" :background="{background: 'rgba(255,255,255)'}" z-index="333" title="新增收货地址"
      :border-bottom="false">
      <view class="navbar-right" slot="right" v-if="edit" @click="showDeletePopup = true">
        <text>删除</text>
      </view>
    </u-navbar>
    <view class="item-bg-view">
      <u-form :model="model" ref="uForm1" style="width: 100%;">
        <u-form-item label-width="150" :border-bottom="true" :label-position="labelPosition" label="收货人" prop="name">
          <u-input :border="false" placeholder="请填写收货人姓名" v-model="model.consigneeName" type="text" />
        </u-form-item>
        <u-form-item label-width="150" :label-position="labelPosition" label="联系方式" prop="phone">
          <u-input :border="false" placeholder="请填写收货人联系方式" v-model="model.consigneeMobile" type="text" />
        </u-form-item>
      </u-form>
    </view>
    <view class="item-bg-view" style="padding-right: 24rpx;">
      <u-form :model="model" ref="uForm2" style="width: 100%;">
        <u-form-item label-width="150" :label-position="labelPosition" label="所在地区" prop="address">
          <u-input :border="false" placeholder="省市区县、乡镇街道" v-model="model.consigneeRegionName" type="select"
            arrowIcon="a-ic_arrow_right2x" customPrefix="hongyan-icon" @click="showPopup=true" />
        </u-form-item>
      </u-form>

    </view>
    <view class="item-bg-view" style="padding-right: 24rpx;">
      <u-form :model="model" ref="uForm3" style="width: 100%;">
        <u-form-item :label-position="labelPosition" label="详细地址" prop="intro" label-width="150">
          <u-input type="textarea" :border="false" placeholder="楼牌号、小区、楼栋号、单元室等" v-model="model.consigneeAddress" />
        </u-form-item>
      </u-form>
    </view>
    <view class="item-bg-view" style="padding-right: 24rpx;align-items: center;">
      <view style="display: flex;flex-direction: column;flex: 1;margin-top: 24rpx;margin-bottom: 24rpx;">
        <text class="mr-text">设置默认地址</text>
        <text
          style="margin-top:13rpx ;color: #999999;font-family: PingFangSC-Regular; font-size: 30rpx;">下单会优先使用该地址</text>
      </view>
      <u-switch v-model="model.defaultAddress" />
    </view>
    <view class="bottom-view">
      <text class="bottom-btn-text gm-text" @click="saveInfo">保存</text>
    </view>
    <uCitySelect v-model="showPopup" @city-change="cityChange" />

    <u-modal ref="uModal" v-model="showDeletePopup" :show-cancel-button="true" :title="showTitle" :async-close="false"
      @confirm="confirm" :content="modalContent">

    </u-modal>
  </view>
</template>

<script>
  import uCitySelect from './components/u-city-select.vue'

  import {
    addressAdd,
    addressEdit,
    addressDelete,
    addressDetail
  } from '@/api/address.js'
  export default {
    components: {
      uCitySelect
    },
    data() {
      return {
        id: '',
        showDeletePopup: false,
        showTitle: "删除地址",
        modalContent: '确认删除当前地址吗？',
        showPopup: false,
        edit: false,
        order: false, //是否是从订单过来
        model: {
          id: '',
          consigneeName: '', //收货人姓名
          consigneeMobile: '', //收货人手机号
          consigneeRegionName: '', //收货人街道名称（省-市-区-街道）
          consigneeRegionId: '', //收货人街道id
          consigneeAddress: '', //收货人详细地址
          defaultAddress: false, //是否为默认地址，1-是；0-否
        },
        labelPosition: 'left',
        // errorType: ['message'],
      }
    },
    onLoad(option) {
      if (option.id) {

        this.edit = true
        this.id = option.id;

        this.getAddressDetail()
        // this.model.defaultAddress =this.model.defaultAddress?1:0
      }
      if (option.order) {
        this.order = option.order
      }

    },
    methods: {
      getAddressDetail() {
        addressDetail(this.id)
          .then(res => {
            this.model = res.data
            this.model.defaultAddress = this.model.defaultAddress == 1

          }).catch(err => {})
      },
      addressInput(e) {
        console.log(e)
      },
      //选择省市区返回
      cityChange(e) {
        this.model.consigneeRegionName = e.province.name + ' ' + e.city.name + ' ' + e.area.name + ' ' + e.street.name;
        this.model.consigneeRegionId = e.street.id
      },

      /**
       * 保存
       */
      saveInfo() {
        const tempModel = this.model
        if (!tempModel.consigneeName) {
          this.showToast('请填写收货人')
          return
        }
        if (!tempModel.consigneeMobile) {
          this.showToast('请填写收货人联系方式')
          return
        }
        const isMobile = this.$u.test.mobile(tempModel.consigneeMobile)
        if (!isMobile) {
          this.showToast('联系方式有误')
          return
        }
        if (!tempModel.consigneeRegionName) {
          this.showToast('请填写收货人所在地区')
          return
        }

        if (!tempModel.consigneeAddress) {
          this.showToast('请填写收货人详细地址')
          return
        }
        // if(tempModel.defaultAddress){

        // }
        tempModel.defaultAddress = tempModel.defaultAddress ? 1 : 0
        if (this.edit) {
          this.modify(tempModel)
        } else {
          this.submit(tempModel)
        }

      },
      /**
       * @param {Object} model 修改收货地址
       */
      modify(model) {
        uni.showLoading({
          title: ''
        })

        addressEdit(model)
          .then(res => {
            uni.hideLoading()

            uni.showToast({
              icon: 'none',
              title: '新增成功'
            })
            uni.navigateBack({})
            uni.$emit("modifyAddress");
          }).catch(err => {
            uni.hideLoading()
          })
      },
      //新增地址
      submit(model) {
        uni.showLoading({
          title: ''
        })
        addressAdd(model)
          .then(res => {

            uni.hideLoading()

            uni.showToast({
              icon: 'none',
              title: '新增成功'
            })
            uni.navigateBack({})
            uni.$emit('modifyAddress');
            // uni.$emit((this.order=='true') ? "addAddress":'modifyAddress', model);

          }).catch(err => {
            uni.hideLoading()
          })
      },
      confirm() {
        this.showDeletePopup = false;
        setTimeout(() => {
          this.deleteAddress()
        }, 200)
      },
      //删除地址
      deleteAddress() {
        uni.showLoading({
          title: ''
        })
        addressDelete(this.model.id)
          .then(res => {
            uni.hideLoading()
            uni.showToast({
              icon: 'none',
              title: '删除成功'
            })
            uni.navigateBack({})
            uni.$emit('modifyAddress');
          }).catch(err => {
            uni.hideLoading()
          })
      },
      showToast(title) {
        uni.showToast({
          icon: 'none',
          title: title
        })
      }
    },
  }
</script>

<style scoped>
  .item-bg-view {
    /* width: 100%; */
    background-color: #FFFFFF;
    margin: 24rpx 24rpx 0 24rpx;
    padding-left: 24rpx;
    display: flex;
    flex-direction: row;
    border-radius: 16rpx;
  }

  .mr-text {
    font-family: PingFangSC-Regular;
    color: #333333;
    font-size: 34rpx;
  }

  .bottom-view {
    position: fixed;
    bottom: 0;
    align-items: center;
    justify-content: center;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(104rpx + env(safe-area-inset-bottom));
    padding-left: 34rpx;
    padding-right: 24rpx;
    width: 100%;
    flex-direction: row;
    display: flex;
    background-color: #FFFFFF;
  }

  .bottom-btn-text {
    width: 90%;
    height: 76rpx;
    line-height: 76rpx;
    text-align: center;
    border-radius: 38rpx;
    border: 2rpx #878787 solid;
    font-size: 28rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
  }

  .gm-text {
    background-color: #2059F7;
    border: 0;
    color: #FFFFFF;
  }

  .navbar-right {
    margin-right: 24rpx;
    display: flex;
  }
</style>
