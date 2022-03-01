const $ajax = uni.request;
const Mock = require('./mock.js');

require('./api')

// Object.defineProperty(uni, 'request', { writable: true });

uni.request = function(config) {
  // 在请求发送之前做一些处理
  // if (!(/^https:\/\/|http:\/\//.test(config.url))) {}
  if (config.method === 'get' || !config.method) {
    if (typeof config.data === 'string' || config.data === undefined) {
      config.data = {}
    }
    // config.data['t'] = new Date().getTime()
  }
  if (typeof Mock._mocked[config.url] === 'undefined') {
    $ajax(config);
    return false;
  }
  const resTemplate = typeof Mock._mocked[config.url].template === 'object' ? Mock._mocked[config.url].template : Mock._mocked[config.url].template(config);
  const response = Mock.mock(resTemplate);
  if (typeof config.success == 'function') {
    config.success(response)
  }
  if (typeof config.complete == 'function') {
    config.complete(response)
  }
};

// export default Mock;
