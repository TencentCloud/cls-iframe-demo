const compose = require("koa-compose");
const { getTmpAuth, getLoginUrl } = require("../utils");

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        const tmpAuth = await getTmpAuth();
        const loginUrl = getLoginUrl(tmpAuth.Credentials);

        await ctx.render("index.ejs", {
          url: loginUrl,
        });

        await next();
      },
    ]);
  },
};
