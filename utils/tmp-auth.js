const tencentcloud = require('tencentcloud-sdk-nodejs');
const config = require('config');

const StsClient = tencentcloud.sts.v20180813.Client;
const models = tencentcloud.sts.v20180813.Models;
const { Credential } = tencentcloud.common;

/**
 * get temp auth
 */
const getTmpAuth = () => {
  const req = new models.AssumeRoleRequest();
  req.from_json_string(JSON.stringify({
    RoleArn: config.get('RoleArn'),
    RoleSessionName: config.get('RoleSessionName'),
  }));

  const client = new StsClient(
    new Credential(config.get('SecretId'), config.get('SecretKey')),
    config.get('Region'),
  );

  return new Promise((resolve, reject) => {
    client.AssumeRole(req, (errMsg, response) => {
      if (errMsg) {
        reject(errMsg);
        return;
      }

      console.log(JSON.stringify({ action: 'getTmpAuth', response }));
      resolve(response);
    });
  });
};

module.exports = {
  getTmpAuth,
};
