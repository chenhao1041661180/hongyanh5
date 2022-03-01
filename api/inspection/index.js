import request from '@/plugin/request';
const baseUrl = '/board'
// 巡检次数,发现隐患,完成工单
export function getStatisticsData(data) {
  return request
    .get('/statisticsData', {
      baseUrl,
      data
    })
}

// 完成润滑数量
export function getLubricateNum(data) {
  return request
    .get('/lubricateNum', {
      baseUrl,
      data
    })
}

// 完成维保数量
export function getMaintenanceNum(data) {
  return request
    .get('/maintenanceNum', {
      baseUrl,
      data
    })
}


// 刷卡签到率
export function getPayByCardRate(data) {
  return request
    .get('/payByCardRate', {
      baseUrl,
      data
    })
}

// 巡检完成率
export function getPatrolCompletionRate(data) {
  return request
    .get('/patrolCompletionRate', {
      baseUrl,
      data
    })
}

// 巡检列表
export function getPatrolList(data) {
  return request
    .get('/rankingList', {
      baseUrl,
      data
    })
}

// 隐患调度效率
export function getDispatchEfficiency(data) {
  return request
    .get('/dispatchEfficiency', {
      baseUrl,
      data
    })
}

// 隐患调度情况
export function getDispatchTotal(data) {
  return request
    .get('/dispatchTotal', {
      baseUrl,
      data
    })
}
// 隐患调度排行列表
export function getRiskList(data) {
  return request
    .get('/dispatchRankList', {
      baseUrl,
      data
    })
}

// 工单情况
export function getWorkFormChartData(data) {
  return request
    .get('/head/wo', {
      baseUrl,
      data
    })
}


// 工单排行列表
export function getWorkFormList(data) {
  return request
    .get('/womainRankList', {
      baseUrl,
      data
    })
}

// 润滑排行列表
export function getLubricationList(data) {
  return request
    .get('/lubricationRankList', {
      baseUrl,
      data
    })
}

// 维保排行列表
export function getMaintenanceList(data) {
  return request
    .get('/maintenanceRankList', {
      baseUrl,
      data
    })
}

// 巡检执行-统计
export function getInspectionStatisticsData(data) {
  return request
    .get('/head/xj', {
      baseUrl,
      data
    })
}

// 枚举
export function getEnumList(data) {
  return request
    .get(`/enum/get/${data}`, {
      baseUrl
    })
}

// 巡检执行-巡检列表
export function getPatrolManageList(data) {
  return request
    .post('/patrolManage/list', {
      baseUrl,
      data
    })
}
// 巡检执行-点检列表
export function getPatrolManagePointList(data) {
  return request
    .post('/patrolManage/spot/list', {
      baseUrl,
      data
    })
}
// 巡检执行-所有公司列表
export function getCompanyList(data) {
  return request
    .get('/company/list', {
      baseUrl,
      data
    })
}
// 巡检执行-设备类型和区域
export function getDeviceTypeOrAreaList(data) {
  return request
    .get('/patrolManage/spot/listLocationMobile', {
      baseUrl,
      data
    })
}
