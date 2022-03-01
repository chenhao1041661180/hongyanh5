const Mock = require('./mock.js');
import setting from '@/setting';
const chartsData = require('@/assets/data.json');

const List = []
const count = 12

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '日程提醒',
    content: '您本日有 @integer(1, 3) 个日程需要走访，请合理安排时间。',
    gmtCreate: '@datetime',
    'perused|1': ['', 1],
    'status|1': ['published', 'draft', 'deleted'],
    messageBizParam: {
      'newsType|1': [1, 2, 3]
    },
    label: '@title(5, 10)',
    pageviews: '@integer(300, 5000)',
    platforms: '@first',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)'
  }))
}

// console.log(List)

Mock.mock('https://www.app.cn/data.json', {
  'code': 200,
  'data': chartsData,
  'list|1-20': [
    {
      'name': 3,
      'lastLogin': 4
    }
  ]
})

Mock.mock(setting.base_url + '/cust-visit/app/message/list-bak', {
  'statusCode': 200,
  'data': {
    'status': 200,
    'message': '',
    'data': {
      'pages': 1,
      'records': List
    }
  }
})

Mock.mock(setting.base_url + '/cust-visit/app/message/list', (config) => {
  // console.log(config.data)
  const { pageNum = 1, pageSize = 10 } = config.data
  const pageList = List.filter((item, index) => index < pageNum * pageSize && index >= pageSize * (pageNum - 1))
  const thisdata = {
    pages: Math.ceil(List.length / pageSize),
    total: List.length,
    records: pageList
  }

  return {
    statusCode: 200,
    data: {
      status: 200,
      message: null,
      data: thisdata
    }
  }
})
