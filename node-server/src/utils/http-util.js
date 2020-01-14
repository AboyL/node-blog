const cookie = require('cookie')
const { redisSet } = require('../db/redis')


// 跟seesion对应
const SESSION_NAME = 'token'

module.exports = {
  SESSION_NAME,
  parseCookie: (str = '') => cookie.parse(str),
  getCookie (key, value) {
    return cookie.serialize(key, value, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }) + ';'
  },
  generateSeesionCookie (value) {
    const c = Date.now() + '_' + Math.random()
    // 存储到redis之中
    redisSet(c, value)
    return this.getCookie(SESSION_NAME, c)
  },
  getPostData (req) {
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
}