const tencentcloud = require('tencentcloud-sdk-nodejs');
const config = require('config');

const StsClient = tencentcloud.sts.v20180813.Client;

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
    },
  },
};
const client = new StsClient(clientConfig);

/**
 * 调用 AssumeRole 接口，获取到角色的临时密钥
 */
async function getTmpCredential() {
  try {
    const response = await client.AssumeRole({
      RoleArn: config.get('RoleArn'),
      RoleSessionName: config.get('RoleSessionName'),
    });
    console.log(JSON.stringify({ action: 'getTmpCredentials', response }));
    return response;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

module.exports = {
  getTmpCredential,
};
