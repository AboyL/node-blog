const { exec } = require('../db/index')
const table_name = 'users'

/**
 * 校验是否登陆成功
 * @param {string} username 用户名
 * @param {string} password 密码
 */
const login = async (username = '', password = '') => {
  const sql = `select username,realname from ${table_name} where username='${username}' and password='${password}'`
  const result = await exec(sql)
  const info = result[0] || {}
  if (info.username) {
    return {
      info,
      status: true
    }
  }
  return {
    status: false,
    message: '登陆失败'
  }
}

module.exports = {
  login
}