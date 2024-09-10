const pt = require('path');
const Router = require('koa-router');

/**
 * @param {String|Array} opts.path
 * @param {String} opts.dir
 * @param {Array} opts.middlewares
 */
module.exports = function (opts = {}) {
  const { dir, path, middlewares = [] } = opts;
  const router = new Router();
  const pageRouter = new Router();

  pageRouter.all('/:path*', ...middlewares, async (ctx, next) => {
    let page;
    // 如果已有回包就不执行 page 模块
    // websocket handshake 请求没有 `ctx.res` 对象, 取 `ctx.status` 会异常. 不影响后面模块执行
    if (ctx.res && (!!ctx.body || ctx.status !== 404)) {
      return next();
    }

    const modulePath = pt.join(dir, (ctx.params.path || '').replaceAll(/\.\/\\/g, ''));

    try {
      page = require(modulePath);
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
      } else {
        e.message && console.warn(e.message);
      }
    }

    if (page && page.render) {
      const res = await page.render(ctx);

      // render 返回的 function 作为中间件对待
      if (typeof res === 'function') {
        return res(ctx, next);
      }
      ctx.body = res;
    } else {
      console.warn(`Please implement render function in ${modulePath}`);
    }

    return next();
  });

  router.use(path, pageRouter.routes());

  return router.routes();
};
