export const mapItemList = [{
    name: "百度地图",
  },
  {
    name: "高德地图",
  },
  {
    name: "腾讯地图",
  }
];

export function appOpenUrl(_url) {
   plus.runtime.openURL(encodeURI(_url));
}
export function openURL(url, downLoadUrl) {
  window.location.href = encodeURI(url);
  var startTime = Date.now();
  var count = 0;
  var endTime = 0;
  var t = setInterval(function() {
    count += 1;
    endTime = Date.now() - startTime;
    if (endTime > 800) {
      clearInterval(t);
    }
    if (count < 40) {
      return false;
    }
    if (!(document.hidden || document.webkitHidden)) {
      window.location.href = encodeURI(downLoadUrl);
      // window.open(encodeURI(downLoadUrl));
    }
    window.onblur = () => {
      clearInterval(t);
    };
  }, 20);
}

export function navigationByAndroid(type = 1, mapData) {
  //百度
  var bdapp = "bdapp://map/direction?origin=name:" + mapData.origin.name +
    "|latlng:" + mapData.origin.lat + "," + mapData.origin.lng +
    "&destination=name:" + mapData.des.name +
    "|latlng:" + mapData.des.lat + "," + mapData.des.lng +
    "&coord_type=bd09ll&mode=driving&src=andr.baidu.openAPIdemo";
  var bdappDown = "http://map.baidu.com/zt/qudao/newfengchao/1012337a/html/slide.html"

  //高德
  var amapuri = "androidamap://route/plan/?sourceApplication=amap&slat=" + mapData.origin.lat +
    "&slon=" + mapData.origin.lng +
    "&sname=" + mapData.origin.name +
    "&dlat=" + mapData.des.lat +
    "&dlon=" + mapData.des.lng +
    "&dname=" + mapData.des.name + "&dev=0&t=0";
  var amapuriDown = "http://wap.amap.com/";

  //腾讯地图
  var qqmap = "qqmap://map/routeplan?type=drive&from="+mapData.origin.name+
  "&fromcoord="+mapData.origin.lat+","+mapData.origin.lng+
  "&to="+mapData.des.name+"&tocoord="+mapData.des.lat+","+mapData.des.lng;
  var qqmapDefault = "https://apis.map.qq.com/uri/v1/routeplan?type=drive&from="+mapData.origin.name+
  "&fromcoord="+mapData.origin.lat+","+mapData.origin.lng+
  "&to="+mapData.des.name+"&tocoord="+mapData.des.lat+","+mapData.des.lng;
  // var qqmapDefault = "https://pr.map.qq.com/j/tmap/download";

  var mapUri = amapuri;
  var downUri = amapuriDown;
  switch (type) {
    case 0:
      mapUri = bdapp;
      downUri = bdappDown;
      break;
    case 1:
      mapUri = amapuri;
      downUri = amapuriDown;
      break;
    case 2:
      mapUri = qqmap;
      downUri = qqmapDefault;
      break;
  }
  openURL(mapUri, downUri);
}

export function navigationByIos(type = 1, mapData) {
  //百度
  var bdapp = "baidumap://map/direction?origin=name:" + mapData.origin.name +
    "|latlng:" + mapData.origin.lat + "," + mapData.origin.lng +
    "&destination=name:" + mapData.des.name +
    "|latlng:" + mapData.des.lat + "," + mapData.des.lng +
    "&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo";
  var bdappDown = "https://apps.apple.com/cn/app/id452186370";

  //高德
  var amapuri = "iosamap://path?sourceApplication=amap&slat=" + mapData.origin.lat +
    "&slon=" + mapData.origin.lng +
    "&sname=" + mapData.origin.name +
    "&dlat=" + mapData.des.lat +
    "&dlon=" + mapData.des.lng +
    "&dname=" + mapData.des.name + "&dev=0&t=0";
  var amapuriDown = "https://apps.apple.com/cn/app/id461703208";

  //腾讯
  var qqmap = "qqmap://map/routeplan?type=drive&from="+mapData.origin.name+
  "&fromcoord="+mapData.origin.lat+","+mapData.origin.lng+
  "&to="+mapData.des.name+"&tocoord="+mapData.des.lat+","+mapData.des.lng;
  var qqmapDefault = "https://apis.map.qq.com/uri/v1/routeplan?type=drive&from="+mapData.origin.name+
  "&fromcoord="+mapData.origin.lat+","+mapData.origin.lng+
  "&to="+mapData.des.name+"&tocoord="+mapData.des.lat+","+mapData.des.lng;

  var mapUri = amapuri;
  var downUri = amapuriDown;
  switch (type) {
    case 0:
      mapUri = bdapp;
      downUri = bdappDown;
      break;
    case 1:
      mapUri = amapuri;
      downUri = amapuriDown;
      break;
    case 2:
      mapUri = qqmap;
      downUri = qqmapDefault;
      break;
  }

  openURL(mapUri, downUri);
}
