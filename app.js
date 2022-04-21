const pt = require('path');
const Koa = require('koa');
const { page, views, serve, send } = require('./middlewares');
const config = require('config');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(send());
app.use(bodyParser());

app.use(
  serve({
    dir: pt.join(__dirname, './public'),
  }),
);

app.use(
  views({
    root: pt.join(__dirname, './views'),
    opts: {
      map: {
        ejs: 'ejs',
      },
    },
  }),
);

app.use(
  page({
    path: '',
    dir: pt.join(__dirname, './controllers'),
    middlewares: [],
  }),
);

app
  .listen(config.get('port'), config.get('host'), () => {
    console.log(`Server running at http://${config.get('host')}:${config.get('port')}/`);
  })
  .on('clientError', (err, socket) => {
    console.error(err);
    if (socket.writable) {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    }
  });

module.exports = app;
