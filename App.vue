<script>
  export default {
    onLaunch(query) {
      // 删除用户信息
      // uni.$util.token.remove()
      // // 保存用户信息
      // uni.$util.token.set(query.query)

    },
    onShow: function() {},
    onHide: function() {}
  }
</script>

<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import "uview-ui/index.scss";
  /* #ifndef APP-PLUS-NVUE */
  @import './assets/style/uni.css';

  /* #ifdef H5 */
  /* 此处为style标签内容的最前面 */
  @import "@/static/fonts/iconfont.css";

  body {
    width: 750rpx;
    max-width: 750rpx;
    // margin: 0 auto;
    margin: 0px auto;
  }


  /* #endif */

  page {
    background-color: #F7F7F7;
    min-height: 100%;
    display: flex;
    flex: 1;
    font-size: 28upx;
    line-height: 1.4;
  }

  image {
    will-change: transform;
  }

  /* #endif*/

  /* Layout 布局 */
  .app-container {
    /* #ifndef APP-PLUS-NVUE */
    display: flex;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    /* #endif */
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .app-container-row {
    flex-direction: row;
  }

  .app-container__header,
  .app-container__footer {
    /* #ifndef APP-PLUS-NVUE */
    box-sizing: border-box;
    flex-shrink: 0;
    /* #endif */
  }

  .app-container__main {
    /* #ifndef APP-PLUS-NVUE */
    display: block;
    flex-basis: auto;
    /* #endif */
    flex: 1;
    // padding: 20upx;
  }

  .app-container__aside {
    /* #ifndef APP-PLUS-NVUE */
    display: block;
    /* #endif */
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
  }

  /* 组件展示 */
  .app-module-wrap {
    border-width: 1upx;
    border-style: dashed;
    border-color: #dddddd;
    background-color: rgb(250, 250, 250);
    padding: 40upx 20upx;
    border-radius: 6px;
  }

  .app-module-title,
  .app-config-title {
    text-align: center;
    color: #303133;
    font-size: 32upx;
    font-weight: bold;
    margin-bottom: 40upx;
  }

  .app-module-area {
    text-align: center;
  }

  .app-module-here {
    color: $uni-tips-color;
    font-size: 26rpx;
  }

  .app-module-result-line {
    border-width: 1px;
    border-style: dashed;
    border-color: #dddddd;
    padding: 10upx 40upx;
    margin-top: 30upx;
    border-radius: 5px;
    background-color: rgb(240, 240, 240);
    color: $uni-content-color;
    /* #ifndef APP-PLUS-NVUE */
    display: inline-block;
    transition: all 0.35s;
    word-break: break-word;
    /* #endif */
    font-size: 32upx;
    text-align: left;
  }

  .app-config-title {
    margin-top: 40upx;
    margin-bottom: 0upx;
    padding-bottom: 15upx;
  }

  .app-border-bottom {
    border-bottom-width: 1upx;
    border-bottom-style: solid;
    border-bottom-color: #dddddd;
  }

  .app-config-item {
    margin-top: 50upx;
  }

  .app-item-wrap {
    /* #ifndef APP-PLUS-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  }

  .app-item-title {
    position: relative;
    font-size: 28upx;
    padding-left: 8px;
    margin-bottom: 22upx;
  }

  .app-item-icon {
    position: absolute;
    width: 4px;
    height: 16px;
    left: 0;
    border-radius: 10px;
    background-color: $uni-content-color;
  }

  /* #ifdef H5 */
  body::-webkit-scrollbar,
  html::-webkit-scrollbar {
    display: none;
  }

  /* #endif */
</style>
