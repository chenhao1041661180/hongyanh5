<template>
  <u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :closeable="true" :safe-area-inset-bottom="true"
    close-icon-color="#ffffff" :z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close" :border-radius="16">
    <u-tabs v-if="value" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs">
    </u-tabs>
    <view class="area-box">
      <view class="u-flex" :class="{ 'change':isChange }">
        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%;">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group>
                <u-cell-item v-for="(item,index) in provinces" :title="item.name" :arrow="false" :index="index"
                  :key="index" @click="provinceChange">
                  <u-icon v-if="isChooseP&&province===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>
        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%;">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group v-if="isChooseP">
                <u-cell-item v-for="(item,index) in citys" :title="item.name" :arrow="false" :index="index" :key="index"
                  @click="cityChange">
                  <u-icon v-if="isChooseC&&city===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>

        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%;">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group v-if="isChooseC">
                <u-cell-item v-for="(item,index) in areas" :title="item.name" :arrow="false" :index="index" :key="index"
                  @click="areaChange">
                  <u-icon v-if="isChooseA&&area===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>
        <view class="area-item">
          <view class="u-padding-10 u-bg-gray" style="height: 100%;">
            <scroll-view :scroll-y="true" style="height: 100%">
              <u-cell-group v-if="isChooseA">
                <u-cell-item v-for="(item,index) in streets" :title="item.name" :arrow="false" :index="index"
                  :key="index" @click="streetChange">
                  <u-icon v-if="isChooseS&& street===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
                </u-cell-item>
              </u-cell-group>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
  import {
    getRegion
  } from '@/api/address.js'
  // import provinces from "uview-ui/libs/util/province.js";
  // import citys from "uview-ui/libs/util/city.js";
  // import areas from "uview-ui/libs/util/area.js";
  /**
   * city-select 省市区级联选择器
   * @property {String Number} z-index 弹出时的z-index值（默认1075）
   * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
   * @property {String} default-region 默认选中的地区，中文形式
   * @property {String} default-code 默认选中的地区，编号形式
   */
  export default {
    name: 'u-city-select',
    props: {
      // 通过双向绑定控制组件的弹出与收起
      value: {
        type: Boolean,
        default: false
      },
      // 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
      defaultRegion: {
        type: Array,
        default () {
          return [];
        }
      },
      // 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
      areaCode: {
        type: Array,
        default () {
          return [];
        }
      },
      // 是否允许通过点击遮罩关闭Picker
      maskCloseAble: {
        type: Boolean,
        default: true
      },
      // 弹出的z-index值
      zIndex: {
        type: [String, Number],
        default: 0
      }
    },
    watch: {
      value(n, o) {
        if (n) {
          this.getRegion()
        }
      }
    },
    data() {
      return {
        parentId: "",
        cityValue: "",
        isChooseP: false, //是否已经选择了省
        province: 0, //省级下标
        provinces: [],
        isChooseC: false, //是否已经选择了市
        city: 0, //市级下标
        citys: [],

        isChooseA: false, //是否已经选择了区
        area: 0, //区级下标
        areas: [],

        isChooseS: false, //是否已经选择了街道
        street: 0, //街道下标
        streets: [],

        tabsIndex: 0,
      }
    },
    mounted() {
      console.log('city')
      this.init();
    },
    computed: {
      isChange() {
        return this.tabsIndex > 1;
      },
      genTabsList() {
        let tabsList = [{
          name: "请选择"
        }];
        if (this.isChooseP) {
          tabsList[0]['name'] = this.provinces[this.province]['name'];
          tabsList[1] = {
            name: "请选择"
          };
        }
        if (this.isChooseC) {
          tabsList[1]['name'] = this.citys[this.city]['name'];
          tabsList[2] = {
            name: "请选择"
          };
        }
        if (this.isChooseA) {
          tabsList[2]['name'] = this.areas[this.area]['name'];
          tabsList[3] = {
            name: "请选择"
          };
        }
        if (this.isChooseS) {
          tabsList[3]['name'] = this.streets[this.street]['name'];
        }
        return tabsList;
      },
      uZIndex() {
        // 如果用户有传递z-index值，优先使用
        return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
      }
    },
    methods: {
      init() {
        if (this.areaCode.length == 3) {
          this.setProvince("", this.areaCode[0]);
          this.setCity("", this.areaCode[1]);
          this.setArea("", this.areaCode[2]);
        } else if (this.defaultRegion.length == 3) {
          this.setProvince(this.defaultRegion[0], "");
          this.setCity(this.defaultRegion[1], "");
          this.setArea(this.defaultRegion[2], "");
        };
      },
      setProvince(label = "", value = "") {
        this.provinces.map((v, k) => {
          if (value ? v.value == value : v.name == label) {
            this.provinceChange(k);
          }
        })
      },
      setCity(label = "", value = "") {
        this.citys.map((v, k) => {
          if (value ? v.value == value : v.name == label) {
            this.cityChange(k);
          }
        })
      },
      setArea(label = "", value = "") {
        this.areas.map((v, k) => {
          if (value ? v.value == value : v.name == label) {
            this.isChooseA = true;
            this.area = k;
          }
        })
      },
      close() {
        this.$emit('input', false);
      },
      tabsChange(index) {
        this.tabsIndex = index;
      },
      provinceChange(index) {
        this.isChooseP = true;
        this.isChooseC = false;
        this.isChooseA = false;
        this.isChooseS = false;
        this.province = index;
        this.parentId = this.provinces[index].id
        // this.citys = citys[index];
        this.tabsIndex = 1;
        this.getRegion()
      },
      cityChange(index) {
        this.isChooseC = true;
        this.isChooseA = false;
        this.isChooseS = false
        this.city = index;
        // this.areas = areas[this.province][index];
        this.parentId = this.citys[index].id
        this.tabsIndex = 2;
        this.getRegion()
      },
      areaChange(index) {
        this.isChooseA = true;
        this.isChooseS = false;
        this.area = index;
        this.parentId = this.areas[index].id
        this.tabsIndex = 3;
        this.getRegion()
        // let result = {};
        // result.province = this.provinces[this.province];
        // result.city = this.citys[this.city];
        // result.area = this.areas[this.area];

      },
      streetChange(index) {
        this.isChooseS = true;
        this.street = index;
        let result = {};
        result.province = this.provinces[this.province];
        result.city = this.citys[this.city];
        result.area = this.areas[this.area];
        result.street = this.streets[this.street];
        this.$emit('city-change', result);
        this.close();
      },
      getRegion() {
        let param = {
          parentId: this.parentId
        }
        getRegion(param)
          .then(res => {
            console.log(res.data)
            if (!this.isChooseP) {
              this.provinces = res.data
            } else if (this.isChooseP && !this.isChooseC) {
              this.citys = res.data
            } else if (this.isChooseP && this.isChooseC && !this.isChooseA) {
              this.areas = res.data
            } else if (this.isChooseP && this.isChooseC && this.isChooseA) {
              this.streets = res.data
            }

          })
          .catch(err => {

          })

      }
    }

  }
</script>
<style lang="scss">
  .area-box {
    width: 100%;
    overflow: hidden;
    height: 800rpx;

    >view {
      width: 150%;
      transition: transform 0.3s ease-in-out 0s;
      transform: translateX(0);

      &.change {
        transform: translateX(-33.3333333%);
      }
    }

    .area-item {
      width: 33.3333333%;
      height: 800rpx;
    }
  }
</style>
