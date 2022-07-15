const compose = require('koa-compose');

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        try {
          await ctx.render('iframe.ejs');
        } catch (e) {
          ctx.send({ code: e.code, message: e.message, status: e.status });
        }
        await next();
      },
    ]);
  },
};
