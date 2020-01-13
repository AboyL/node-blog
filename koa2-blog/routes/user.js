const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { login } = require('../controller/user')

const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const result = await login(username, password)
  if (result.status) {
    ctx.session.username = result.info.username
    ctx.session.realname = result.info.realname
    ctx.body = new SuccessResModal('登陆成功')
    return
  }
  ctx.body = new ErrorResModal('登录失败')
})

if (process.env.NODE_ENV === 'dev') {
  router.get('/login', async (ctx, next) => {
    const { username, password } = ctx.query
    const result = await login(username, password)
    if (result.status) {
      ctx.session.username = result.info.username
      ctx.session.realname = result.info.realname
      ctx.body = new SuccessResModal('登陆成功')

      return
    }
    ctx.body = new ErrorResModal('登录失败')

  })

  router.get('/test-login', async (ctx, next) => {
    const session = ctx.session
    if (session.username) {
      ctx.body =
        new SuccessResModal(session)

      return
    }
    ctx.body = new ErrorResModal('未登录')
  })
}
module.exports = router