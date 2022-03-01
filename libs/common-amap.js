export default function CommonAmap() {
  const _this = this
  _this.map = new AMap.Map('container', {
    zoom: 15, // 缩放级别
    // center: [116.397428, 39.90923],
    resizeEnable: true // 自动定位
  })
}

CommonAmap.prototype.addMarker = function(imageUrl, LngLat) {
  // 创建一个起点的 Icon
  var Icon = new AMap.Icon({
    size: new AMap.Size(28, 32),
    image: imageUrl,
    imageSize: new AMap.Size(28, 32)
  })
  // 将 起点icon 传入 marker
  var mMarker = new AMap.Marker({
    map: this.map,
    position: LngLat,
    icon: Icon,
    offset: new AMap.Pixel(-14, -32)
  })
  return mMarker
}

CommonAmap.prototype.addPointMarker = function(imageUrl, LngLat) {
  // 创建一个起点的 Icon
  var Icon = new AMap.Icon({
    size: new AMap.Size(12, 12),
    image: imageUrl,
    imageSize: new AMap.Size(12, 12)
  })
  // 将 起点icon 传入 marker
  var mMarker = new AMap.Marker({
    map: this.map,
    position: LngLat,
    icon: Icon,
    offset: new AMap.Pixel(-6, -6)
  })
  return mMarker
}

CommonAmap.prototype.addGJMarker = function(imageUrl, lnglat) {
  // 创建一个 轨迹的Icon
  var gjIcon = new AMap.Icon({
    size: new AMap.Size(48, 48),
    image: imageUrl,
    imageSize: new AMap.Size(48, 48)
  })

  // 绘制轨迹移动的点
  const mMarker = new AMap.Marker({
    map: this.map,
    position: lnglat,
    icon: gjIcon,
    offset: new AMap.Pixel(-20, -20),
    autoRotation: true,
    angle: -90
  })
  return mMarker
}

CommonAmap.prototype.Polyline = function(path, strokeColor = '#0070F5') {
  // 绘制轨迹
  new AMap.Polyline({
    map: this.map,
    path: path,
    showDir: false,
    strokeColor: strokeColor, // 线颜色
    strokeOpacity: 1, // 线透明度
    strokeWeight: 4 // 线宽
  })
}

CommonAmap.prototype.getCurPos = function(complete,error){
  AMap.plugin('AMap.Geolocation', ()=> {
    const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', (result)=>{
          console.log("=== getCurPos complete =="+JSON.stringify(result.position));
          complete(result);
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', (info)=>{
          console.log("=== getCurPos error =="+JSON.stringify(info));
          error(info);
        });      //返回定位出错信息
  });
}
