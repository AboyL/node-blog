const { escape } = require('../db/mysql')

const addNoMustWhere = (name, value) => {
  if (value) {
    return `and ${name}=${escape(value)} `
  }
  return ''
}

const addNoMustLikeWhere = (name, value) => {
  if (value) {
    return `and ${name} like ${escape(`%` + value + `%`)} `
  }
  return ''
}

module.exports = {
  addNoMustWhere,
  addNoMustLikeWhere
}