const crypto = require("crypto");
const config = require("config");
const { obj2urlParams } = require("./object");

const getRandom = ({ max, min }) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getLoginUrl = ({ Token: token, TmpSecretId, TmpSecretKey }) => {
  const urlParams = getLoginParams(token, TmpSecretId, TmpSecretKey);
  const loginUrl = `//cloud.tencent.com/login/roleAccessCallback?${obj2urlParams(
    urlParams
  )}`;
  console.log(JSON.stringify({ loginUrl }));
  return loginUrl;
};

const getLoginParams = (token, secretId, secretKey) => {
  const signatureParams = {
    action: "roleLogin",
    nonce: getRandom({ min: 10000, max: 100000000 }),
    timestamp: Math.floor(Date.now() / 1000),
    secretId,
  };
  return {
    algorithm: "sha1",
    secretId,
    token,
    nonce: signatureParams.nonce,
    timestamp: signatureParams.timestamp,
    signature: getSignature(signatureParams, secretKey),
    s_url: config.get("s_url"),
  };
};

const getSignature = (params, key) => {
  const formatString =
    "GETcloud.tencent.com/login/roleAccessCallback?" + obj2urlParams(params);
  const hmac = crypto.createHmac("sha1", key);
  const signature = hmac
    .update(Buffer.from(formatString, "utf-8"))
    .digest("base64");

  console.log(
    JSON.stringify({ action: "getSignature", params, result: signature })
  );

  return signature;
};

module.exports = {
  getLoginUrl,
};
