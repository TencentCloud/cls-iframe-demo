const compose = require('koa-compose');
const { getTmpCredential, getRoleAccessUrl } = require('../utils');
const config = require('config');
const { getAccountArea } = require('../utils/getAccountArea');

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        const requestBody = ctx.request.body;
        // 如果需要支持其他选项，如仪表盘相关页面，可以直接增加请求参数
        console.log(JSON.stringify({ action: 'url', params: requestBody }));

        if (config.get('password') && requestBody.password !== config.get('password')) {
          ctx.send({ code: 'InvalidPassword', message: '密码错误' });
        } else {
          try {
            const targetUrl = `${config.get('s_url')}`;
            const [tmpAuth, area] = await Promise.all([getTmpCredential(), getAccountArea()]);
            const roleAccessUrl = getRoleAccessUrl(tmpAuth.Credentials, targetUrl, area);
            ctx.send({
              url: roleAccessUrl,
            });
          } catch (e) {
            ctx.send({ code: e.code, message: e.message, status: e.status });
          }
        }
        await next();
      },
    ]);
  },
};
