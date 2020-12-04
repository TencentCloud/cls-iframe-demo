const views = require('koa-views');

module.exports = function (option = {}) {
  const { root, opts } = option;
  return views(root, opts);
};
