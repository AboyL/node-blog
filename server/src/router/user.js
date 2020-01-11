const config = require('../config/index')
const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { login } = require('../controller/user')

const httpUtil = require('../utils/http-util')
const api_series = 'user'

const handleUserRouter = async (req, res) => {
  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/login`) {
    const { username, password } = req.body
    const result = await login(username, password)
    if (result.status) {
      const cookie = httpUtil.generateSeesionCookie(result.info)
      res.setHeader('Set-Cookie', cookie)
      return new SuccessResModal({})
    }
    return new ErrorResModal('登录失败')
  }

  // 在dev的情况下可以使用 GET 做登陆测试
  if (process.env.NODE_ENV === 'dev') {

    if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/login`) {
      const { username, password } = req.query
      const result = await login(username, password)
      if (result.status) {
        // 设置cookie跟session
        const cookie = httpUtil.generateSeesionCookie(result.info)
        res.setHeader('Set-Cookie', cookie)
        return new SuccessResModal(result.info)
      }
      return new ErrorResModal('登录失败')
    }

    // 对cookie进行校验
    if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/test-login`) {
      const session = req.session
      if (session) {
        return new SuccessResModal(session)
      }
      return new ErrorResModal('未登录')
    }
  }

}
module.exports = handleUserRouter