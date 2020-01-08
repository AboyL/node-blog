const addNoMustWhere = (name, value) => {
  if (value) {
    return `and ${name}='${value}' `
  }
  return ''
}

const addNoMustLikeWhere = (name, value) => {
  if (value) {
    return `and ${name} like '%${value}%' `
  }
  return ''
}

module.exports = {
  addNoMustWhere,
  addNoMustLikeWhere
}