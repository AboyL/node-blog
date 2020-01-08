const querystring = require('querystring')
const url = require('url')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
  return new Promise((resolve) => {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk
    })
    req.on('end', () => {
      if (postData) {
        resolve(JSON.parse(postData))
      } else {
        resolve({})
      }
    })
  })
}

module.exports = async (req, res) => {
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