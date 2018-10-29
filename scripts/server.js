/* eslint no-console: 0 */

const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const killable = require('killable');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { ip, DEV_SERVER_PORT, log } = require('../config/webpack.common');
const webpackConfig = require('../config/webpack.config.dev');
const path = require('path');
// // const mocer = require('mocer');
let server;
let wdm;
let app;

function applyWebpackCompiler(config) {
  const app = express();
  console.log('运行目录' + process.cwd());
  app.use(express.static(process.cwd(), {
    extensions: [ 'html' ],
  }));
  const compiler = webpack(config);
  // console.log('compiler is ', compiler)
  console.log('config is ', config.output.publicPath)
  compiler.plugin('compile', () => {
    log('开始构建...');
  });
  compiler.plugin('done', () => {
    log(chalk.green('webpack构建完成!'));
  });
  // wdm = webpackDevMiddleware(compiler, {
  //   publicPath: config.output.publicPath,
  //   stats: {
  //     colors: true,
  //   },
  //   // progress: true,
  // });
  // app.use(wdm);
  app.use(webpackHotMiddleware(compiler));

  // moc数据
  // app.use(mocer(path.join(__dirname, '../config/moc')));

  // 针对spa做了路由处理
  // app.use((req, res, next) => {
  //   if (req.get('Accept').indexOf('html') > -1) {
  //     return res.sendFile(path.join(__dirname, '../preview/index.html'));
  //   }
  //   return next();
  // });
  return app;
}

function startServer(app, cb) {
  log(`正在启动服务器(端口号:${DEV_SERVER_PORT})...`);
  server = app.listen(DEV_SERVER_PORT, function(err) {
    if (err) {
      log('启动服务器失败');
      console.error(err);
      throw err;
    }
    log(chalk.green.bold('启动服务器成功'));
    cb();
  });
  server = killable(server);
  server.on('error', e => {
    if (e.code === 'EADDRINUSE') {
      log(`端口号${DEV_SERVER_PORT}被占用了，请使用其他端口号`);
    } else {
      throw e;
    }
  });
}


function stopServer(cb) {
  log('正在关闭开发服务器...');
  wdm.close(() => {
    wdm = null;
    log('关闭wdm成功');
    // log(server.kill);
    server.kill(() => {
      server = null;
      app = null;
      log('关闭服务器成功');
      cb();
    });
  });
}


app = applyWebpackCompiler(webpackConfig);
startServer(app, () => {
  const localHttpAddress = chalk.underline.blue(`http://localhost:${DEV_SERVER_PORT}`);
  const ipHttpAddress = chalk.underline.blue(`http://${ip}:${DEV_SERVER_PORT}`);
  log(`请访问 ${localHttpAddress} or ${ipHttpAddress}`);
});

process.on('SIGTERM', () => {
  stopServer(() => {
    log('退出成功');
    process.exit(0);
  });
});
