const querystring = require('querystring')
const url = require('url')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const httpUtil = require('./src/utils/http-util')
const { redisGet } = require('./src/db/redis')
const { access } = require('./src/utils/logs-util')

const { getPostData, parseCookie, SESSION_NAME } = httpUtil

module.exports = async (req, res) => {
  // 日志处理
  const logDate=new Date()
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${logDate.getHours()}-${logDate.getMinutes()}-${logDate.getSeconds()}`)

  // 设置cookie
  const cookie = parseCookie(req.headers['cookie'] || "")
  req.cookie = cookie
  // 设置session
  let session = await redisGet(cookie[SESSION_NAME])
  req.session = session || {}

  // 设置头部信息
  res.setHeader('Content-type', 'application/json')
  const context = url.parse(req.url)

  // 附加额外值
  req.path = context.pathname
  req.query = querystring.parse(context.query)
  req.body = await getPostData(req)

  // 处理返回值
  let result = {}
  result = await handleBlogRouter(req, res)
  if (result) {
    res.end(
      JSON.stringify(result)
    )
    return
  }

  result = await handleUserRouter(req, res)
  if (result) {
    res.end(
      JSON.stringify(result)
    )
    return

  }

  // 404 处理
  res.writeHead(404, {
    'Content-type': 'text/plain'
  })
  res.write("404 NOT found")
  res.end()

}