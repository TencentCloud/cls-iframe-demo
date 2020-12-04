const compose = require('koa-compose');
const { getTmpAuth, getLoginUrlWithHideOptions } = require('../utils');

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        console.log(JSON.stringify({ action: 'url', params: ctx.request.body }));
        const { hideOptions } = ctx.request.body || [];
        try {
          const tmpAuth = await getTmpAuth();
          const loginUrl = getLoginUrlWithHideOptions(tmpAuth.Credentials, hideOptions);

          ctx.send({
            url: loginUrl,
          });
        } catch (e) {
          ctx.send({ code: e.code, message: e.message, status: e.status });
        }

        await next();
      },
    ]);
  },
};
