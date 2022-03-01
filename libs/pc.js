(function() {
  var u = navigator.userAgent
  var w = window.innerWidth
  if (!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1) {
    // window.innerWidth = 600
    // console.log(window)
    window.innerWidth = 600 * (w / 1366)
    window.onload = function() {
      window.innerWidth = 600
    }
  }
})()
