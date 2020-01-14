const { escape } = require('../db/mysql')
const xss = require('xss')

const resolveParam = (value) => {
  return escape(xss(value))
}
const addNoMustWhere = (name, value) => {
  if (value) {
    return `and ${name}=${resolveParam(value)} `
  }
  return ''
}

const addNoMustLikeWhere = (name, value) => {
  if (value) {
    return `and ${name} like ${resolveParam('%' + value + '%')} `
  }
  return ''
}

module.exports = {
  addNoMustWhere,
  addNoMustLikeWhere,
  resolveParam
}
