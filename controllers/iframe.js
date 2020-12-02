const compose = require('koa-compose')
const { getTmpAuth, getLoginUrl } = require('../utils')

module.exports = {
  async render() {
    return compose([
      async (ctx, next) => {
        try {
          const tmpAuth = await getTmpAuth()
          const loginUrl = getLoginUrl(tmpAuth.Credentials)

          await ctx.render('index.ejs', {
            url: loginUrl,
          })
        } catch (e) {
          ctx.body = { code: e.code, message: e.message, status: e.status }
        }

        await next()
      },
    ])
  },
}
