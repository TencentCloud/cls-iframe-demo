const compose = require('koa-compose');
const { getTmpCredential, getRoleAccessUrl } = require('../utils');

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        try {
          const tmpAuth = await getTmpCredential();
          const loginUrl = getRoleAccessUrl(tmpAuth.Credentials);

          await ctx.render('index.ejs', {
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
