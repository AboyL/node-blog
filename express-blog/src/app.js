const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { accessWriteStream } = require('./utils/logs-util')
// const indexRouter = require('./routes/index');
const usersRouter = require('./routers/user.js');
const blogRouter = require('./routers/blog.js');


const app = express();

const config = require('./config/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 设置session
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',   // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

const logModel = process.env.NODE_ENV === 'dev' ? 'dev' : combined
app.use(logger(logModel, {
  stream: accessWriteStream
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由设置
app.use(`${config.api_pre}/user`, usersRouter);
app.use(`${config.api_pre}/blog`, blogRouter);



// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404')
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
