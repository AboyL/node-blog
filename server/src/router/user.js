const config = require('../config/index')
const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { checkLogin } = require('../controller/user')

const api_series = 'user'

const handleUserRouter = async (req, res) => {
  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/login`) {
    const { username, password } = req.body
    const result = await checkLogin(username, password)
    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal('登录失败')
  }
}
module.exports = handleUserRouter