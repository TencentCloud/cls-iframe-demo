// 参考网址 https://cloud.tencent.com/document/product/614/45742
const crypto = require('crypto');
const config = require('config');

/** 获取最终可用的 免登陆网址。相关逻辑详细介绍请参考 https://cloud.tencent.com/document/product/598/13650
 * @param {{ Token, TmpSecretId, TmpSecretKey}} credential 临时秘钥凭证。使用 getTemCredential 函数获取
 * @param {string} targetUrl 免登陆后跳转的目标网址链接
 */
const getRoleAccessUrl = (credential, targetUrl = config.get('s_url')) => {
  const { Token: token, TmpSecretId, TmpSecretKey } = credential;
  // 通过该角色的临时密钥生成登录签名信息
  const signatureParams = {
    action: 'roleLogin',
    nonce: getRandom({ min: 10000, max: 100000000 }),
    secretId: TmpSecretId,
    timestamp: Math.floor(Date.now() / 1000),
  };
  const signature = getCredentialSignature(signatureParams, TmpSecretKey);

  // s_url 为目标网址链接

  // 拼接完整登录信息以及目的页地址，参数值需要 urlencode 编码
  const finalUrlParams = {
    algorithm: 'sha1',
    secretId: TmpSecretId,
    token,
    nonce: signatureParams.nonce,
    timestamp: signatureParams.timestamp,
    signature,
    s_url: targetUrl,
  };
  const loginUrl = `https://cloud.tencent.com/login/roleAccessCallback?${obj2urlParams(finalUrlParams)}`;
  return loginUrl;
};

/** 根据签名参数和秘钥Key，获取登录签名信息 */
const getCredentialSignature = (signatureParams, secretKey) => {
  // 按Key字母表顺序，拼接签名参数
  const signatureParamStr = obj2urlParams(signatureParams);
  // 拼接签名串
  const formatString = `GETcloud.tencent.com/login/roleAccessCallback?${signatureParamStr}`;
  // 生成签名串
  const hmac = crypto.createHmac('sha1', secretKey);
  const signature = hmac.update(Buffer.from(formatString, 'utf-8')).digest('base64');

  console.log(JSON.stringify({ action: 'getSignature', signatureParams, result: signature }));
  return signature;
};

/** 获取签名使用的随机数 */
const getRandom = ({ max, min }) => Math.floor(Math.random() * (max - min + 1) + min);

/** 以对象Key排序后，拼接为URL参数格式。其中value需要进行 urlencode 编码 */
function obj2urlParams(obj) {
  const keySortedObj = Object.keys(obj).sort();
  return keySortedObj.map((key) => `${key}=${encodeURIComponent(obj[key] || '')}`).join('&');
}

module.exports = {
  getRoleAccessUrl,
};
