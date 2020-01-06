const querystring = require('querystring')
const url = require('url')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

module.exports = (req, res) => {
  // 设置头部信息
  res.setHeader('Content-type', 'application/json')
  const context = url.parse(req.url)
  req.path = context.pathname
  req.query= querystring.parse(context.query)

  let result = {}
  result = handleBlogRouter(req, res)
  if (result) {
    res.end(
      JSON.stringify(result)
    )
    return
  }

  result = handleUserRouter(req, res)
  if (result) {
    res.end(
      JSON.stringify(result)
    )
    return

  }

  // 都没有匹配到 返回404
  res.writeHead(404, {
    'Content-type': 'text/plain'
  })
  res.write("404 NOT found")
  res.end()

}