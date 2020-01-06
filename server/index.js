const http = require('http')
const querystring = require('querystring')
const url = require('url')

const app = http.createServer((req, res) => {
  const u = url.parse(req.url)
  const searchData = querystring.parse(u.query)
  res.setHeader('Content-type','application/json')
  if (req.method === 'POST') {
    let d = ''
    req.on('data', (chunk) => {
      d += chunk
    })
    req.on('end', () => {
      console.log('d',d)
      res.end(`{"a":1}`)
    })
  } else {
    res.end(JSON.stringify( searchData))
  }
})

app.listen(3000)