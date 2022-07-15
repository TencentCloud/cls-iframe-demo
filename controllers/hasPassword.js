const compose = require('koa-compose');
const config = require('config');

module.exports = {
  async render() {
    return compose([
      // 接口用于页面获取初始化相关信息
      async (ctx, next) => {
        const demoInfo = {
          hasPassword: Boolean(config.get('password')),
        };
        ctx.send(demoInfo);
        await next();
      },
    ]);
  },
};
