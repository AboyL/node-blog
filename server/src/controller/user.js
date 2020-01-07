/**
 * 校验是否登陆成功
 * @param {string} username 用户名
 * @param {string} password 密码
 */
const checkLogin = (username = '', password = '') => {
  if (username === 'L' && password === "123") {
    return {
      status: true
    }
  }
  return {
    status: false,
    message: '登陆失败'
  }
}

module.exports = {
  checkLogin
}