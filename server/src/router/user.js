const config = require('../config/index')
const api_series = 'user'

const handleUserRouter = (req, res) => {
  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/login`) {
    return {
      msg: '这个是用户的接口'
    }
  }
}
module.exports = handleUserRouter