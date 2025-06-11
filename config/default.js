// 注意：
// 该demo中不包含鉴权外部系统鉴权逻辑，部署后所有访问者（即使未登陆腾讯云）均可以demo中配置的角色权限查看账户中的数据。
// 为保障数据隐私，请自行添加外部系统鉴权逻辑或限制其仅在内网中可访问，以确保有权限的用户才能够查看该页面。
const config = {
  password: '',
  port: 3000,
  s_url: 'https://console.cloud.tencent.cn/cls/search?hideLeftNav=true&hideTopNav=true&hideHeader=true',
  // 国际站账号需要使用以下国际站域名的s_url跳转地址
  // s_url: 'https://console.tencentcloud.com/cls/search?hideLeftNav=true&hideTopNav=true&hideHeader=true',

  SecretId: '',
  SecretKey: '',
  RoleArn: '',
  RoleSessionName: 'cls-iframe',
  baseCloudApiEndpoint: 'tencentcloudapi.com',
};

Object.keys(config).forEach((key) => {
  if (process.env[key]) {
    config[key] = process.env[key];
  }
});

module.exports = config;
