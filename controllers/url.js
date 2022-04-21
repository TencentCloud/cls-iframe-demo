const compose = require('koa-compose');
const { getTmpCredential, getRoleAccessUrl } = require('../utils');
const config = require('config');

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        console.log(JSON.stringify({ action: 'url', params: ctx.request.body }));
        const { hideOptions } = ctx.request.body || [];
        try {
          const tmpAuth = await getTmpCredential();
          const targetUrl =
            config.get('s_url') +
            (Array.isArray(hideOptions) ? `&${hideOptions.map((el) => `${el}=true`).join('&')}` : '');
          const roleAccessUrl = getRoleAccessUrl(tmpAuth.Credentials, targetUrl);

          ctx.send({
            url: roleAccessUrl,
          });
        } catch (e) {
          ctx.send({ code: e.code, message: e.message, status: e.status });
        }

        await next();
      },
    ]);
  },
};
