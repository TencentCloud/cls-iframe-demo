const tencentcloudCommon = require('tencentcloud-sdk-nodejs/tencentcloud/common');
const config = require('config');

const AccountClient = tencentcloudCommon.CommonClient;

const clientConfig = {
  // 腾讯云认证信息
  credential: {
    secretId: config.get('SecretId'),
    secretKey: config.get('SecretKey'),
  },
  // 产品地域
  region: 'ap-guangzhou',
  // 可选配置实例
  profile: {
    signMethod: 'TC3-HMAC-SHA256',
    httpProfile: {
      reqMethod: 'POST',
      reqTimeout: 30,
      endpoint: `account.${config.get('baseCloudApiEndpoint')}`,
    },
  },
};
const client = new AccountClient('account.tencentcloudapi.com', '2018-12-25', clientConfig);

/**
 * 调用 AssumeRole 接口，获取到角色的临时密钥
 */
async function getAccountArea() {
  try {
    const response = await client.request('DescribeCurrentUserDetails', {});
    console.debug(JSON.stringify({ action: 'DescribeCurrentUserDetails', response }));
    return Number(response.Area || 0);
  } catch (e) {
    console.error(e);
    return Promise.resolve(0);
  }
}

module.exports = {
  getAccountArea,
};
