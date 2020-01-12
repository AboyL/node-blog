const config = require('../config/index')
const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { login } = require('../controller/user')

const router = require('express').Router()

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const result = await login(username, password)
  if (result.status) {
    req.session.username = result.info.username
    req.session.realname = result.info.realname
    res.json(
      new SuccessResModal('登陆成功')
    )
    return
  }
  res.json(
    new ErrorResModal('登录失败')
  )
})

if (process.env.NODE_ENV === 'dev') {
  router.get('/login', async (req, res, next) => {
    const { username, password } = req.query
    const result = await login(username, password)
    if (result.status) {
      req.session.username = result.info.username
      req.session.realname = result.info.realname
      res.json(
        new SuccessResModal('登陆成功')
      )
      return
    }
    res.json(
      new ErrorResModal('登录失败')
    )
  })

  router.get('/test-login', async (req, res, next) => {
    const session = req.session
    if (session.username) {
      res.json(
        new SuccessResModal(session)
      )
      return
    }
    res.json(
      new ErrorResModal('未登录')
    )
  })
}

// router.post('/login', async (req, res, next) => {
//   console.log('lllll')
//   const { username, password } = req.body
//   const result = await login(username, password)
//   if (result.status) {
//     req.session.username = result.info.username
//     req.session.realname = result.info.realname
//     res.json(
//       new SuccessResModal('登陆成功')
//     )
//   }
//   res.json(
//     new ErrorResModal('登录失败')
//   )
// })

// const handleUserRouter = async (req, res) => {
//   if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/login`) {
//     const { username, password } = req.body
//     const result = await login(username, password)
//     if (result.status) {
//       const cookie = httpUtil.generateSeesionCookie(result.info)
//       res.setHeader('Set-Cookie', cookie)
//       return new SuccessResModal({})
//     }
//     return new ErrorResModal('登录失败')
//   }

//   // 在dev的情况下可以使用 GET 做登陆测试
//   if (process.env.NODE_ENV === 'dev') {

//     if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/login`) {
//       const { username, password } = req.query
//       const result = await login(username, password)
//       if (result.status) {
//         // 设置cookie跟session
//         const cookie = httpUtil.generateSeesionCookie(result.info)
//         res.setHeader('Set-Cookie', cookie)
//         return new SuccessResModal(result.info)
//       }
//       return new ErrorResModal('登录失败')
//     }

//     // 对cookie进行校验
//     if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/test-login`) {
//       const session = req.session
//       if (session) {
//         return new SuccessResModal(session)
//       }
//       return new ErrorResModal('未登录')
//     }
//   }

// }
module.exports = router