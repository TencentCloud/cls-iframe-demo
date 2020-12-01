const serve = require("koa-static");

module.exports = function (config = {}) {
  return serve(config.dir, config);
};
