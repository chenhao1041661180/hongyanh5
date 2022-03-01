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

 // 公司查询列表
 export function getCompanySearchList(data) {
   return request
     .get('/companyList', {
       baseUrl,
       data
     })
 }

// 枚举
export function getEnumList(data) {
  return request
    .get(`/enum/get/${data}`, {
      baseUrl,
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
// 巡检执行-详情
export function getInspectionDetails(id) {
  return request
    .get(`/patrolManage/get/${id}`, {
      baseUrl
    })
}
// 巡检执行-子详情
export function getInspectionSubPageDetails(data) {
  return request
    .post(`/patrolManage/get2`, {
      baseUrl,
      data
    })
}

// 隐患调度-统计
export function getRiskStatisticsData(data) {
  return request
    .get('/head/risk', {
      baseUrl,
      data
    })
}


// 隐患调度-列表
export function getRiskManageList(data) {
  return request
    .post('/patrolRisk/list', {
      baseUrl,
      data
    })
}

// 隐患调度-隐患信息
export function getRiskDetails(id) {
  return request
    .get(`/patrolRisk/detail/${id}`, {
      baseUrl,
    })
}

// 隐患调度-隐患处理信息
export function getRiskHandleDetails(data) {
  return request
    .post(`/patrolRisk/detail2`, {
      baseUrl,
      data
    })
}

// 工单-统计
export function getWorkFormStatisticsData(data) {
  return request
    .get('/head/wo', {
      baseUrl,
      data
    })
}

// // 工单-检修单列表
// export function getWorkFormManageCheckList(data) {
//   return request
//     .get('/wo/checkList', {
//       baseUrl,
//       data
//     })
// }

// // 工单-整改1、大修2、自发工单3列表
// export function getWorkFormManageList(data) {
//   return request
//     .get('/wo/list', {
//       baseUrl,
//       data
//     })
// }
// 工单列表
export function getWorkFormManageList(data) {
  return request
    .get('/wo/list/fixed', {
      baseUrl,
      data
    })
}
// 工单-自发工单详情
export function getWorkFormDetails(data) {
  const { companyId, woId } = data
  return request
    .get(`/wo/zifaWorkDetail/${companyId}/${woId}`, {
      baseUrl
    })
}

// 润滑详情-统计
export function getLubrication(data) {
  return request
    .get('/head/lubrication', {
      baseUrl,
      data
    })
}
// 润滑详情-列表
export function getLubList(data) {
  return request
    .post('/wo/appLubeList', {
      baseUrl,
      data
    })
}
// 润滑详情-详情
export function getLubDetail(data) {
  return request
    .post('/wo/appLubeDetail', {
      baseUrl,
      data
    })
}
// 维保详情-统计
export function getMaintenance(data) {
  return request
    .get('/head/maintenance', {
      baseUrl,
      data
    })
}
// 维保详情-列表
export function getMainList(data) {
  return request
    .post('/wo/maintenanceList', {
      baseUrl,
      data
    })
}
// 维保详情-详情
export function getRiskAndMaintenance(data) {
  return request
    .get('/wo/riskAndMaintenance', {
      baseUrl,
      data
    })
}
