function setupWebViewJavascriptBridge(callback) {
  var bridge = window.WebViewJavascriptBridge || window.WKWebViewJavascriptBridge
  if (bridge) {
    return callback(bridge)
  }
  var callbacks = window.WVJBCallbacks || window.WKWVJBCallbacks
  if (callbacks) {
    return callbacks.push(callback)
  }
  window.WVJBCallbacks = window.WKWVJBCallbacks = [callback]
  if (window.WKWebViewJavascriptBridge) {
    window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
  } else {
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    const timeId = setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
      clearTimeout(timeId)
    }, 0)
  }
}

export default {
  callHandler(name, data, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  registerHandler(name, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      console.log(bridge)
      bridge.registerHandler(name, callback)
    })
  }
}
