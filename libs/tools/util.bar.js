/**
 * tabBar 页面过度效果
 * 
 */

export default {
  init: function() {
    // #ifdef APP-PLUS
    let viewStyles = {
      top: '0px',
      left: '0px',
      bottom: '57px',
      right: '0px',
      backgroundColor: 'rgba(244, 245, 246, 0.98)'
      // height: '100%',
      // width: '100%'
    }
    const loadingView = new plus.nativeObj.View('loading', viewStyles);
    let text = {
      tag: 'font',
      id: 'loading',
      text: '正在加载...',
      textStyles: {
        size: '16px',
        color: '#e1e1e1'
      },
      position: {
        align: 'center'
      }
    }
    loadingView.draw([text]);
    // loadingView.show();
    // #endif
  },
  show: function() {
    // #ifdef APP-PLUS
    var loading = plus.nativeObj.View.getViewById("loading");
    if (loading) {
      loading.show();
    }
    // #endif
  },
  hide: function() {
    // #ifdef APP-PLUS
    var loading = plus.nativeObj.View.getViewById("loading");
    if (loading) {
      loading.hide();
    }
    // #endif
  }
};
