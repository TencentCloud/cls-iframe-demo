const pt = require('path');
const Koa = require('koa');
const { page, views, serve, send } = require('./middlewares');
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

const host = '0.0.0.0';
const port = 3000;
app
  .listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  })
  .on('clientError', (err, socket) => {
    console.error(err);
    if (socket.writable) {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    }
  });

module.exports = app;
