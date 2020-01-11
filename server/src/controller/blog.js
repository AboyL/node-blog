const { exec,escape } = require('../db/mysql')
const { addNoMustWhere, addNoMustLikeWhere } = require('../db/utils')

const table_name = 'blogs'

/**
 * 获取博客列表
 * @param {string} author 作者
 * @param {string} keyword 关键字
 */
const getBlogList = async (author = '', keyword = '', { isAdmin, adminAuthor }) => {
  let sql = `select * from ${table_name} where 1=1 `
  sql += addNoMustLikeWhere('title', keyword)
  if (isAdmin) {
    sql += addNoMustLikeWhere('author', adminAuthor)
  } else {
    sql += addNoMustWhere('author', author)
  }

  sql += `order by createTime desc`
  const result = await exec(sql)
  return result
}

/**
 * 获取博客详情
 * @param {string} id id
 */
const getBlogDetail = async (id) => {
  let sql = `select * from ${table_name} where id=${escape(id)} `
  const result = await exec(sql)
  return result
}

/**
 * 新建博客
 * @param {object} blogData 新建所需要的内容
 */
const createBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createTime = Date.now()
  let sql = `insert into ${table_name}(title,author,content,createTime) 
  values(${escape(title)},${escape(author)},${escape(content)},${escape(createTime)})`
  const result = await exec(sql)
  return {
    id: result.insertId
  }
}

/**
 * 更新博客
 * @param {string} id id
 * @param {object} blogData 新建所需要的内容
 */
const updateBlog = async (id = '', blogData = {}) => {
  if (id) {
    const { title, content, author } = blogData
    const createTime = Date.now()
    let sql = `update ${table_name} set title=${escape(title)},content=${escape(content)},createTime=${escape(createTime)} where id=${escape(id)} and author=${escape(author)}`
    const result = await exec(sql)
    if (result.affectedRows > 0) {
      return {
        status: true
      }
    }
    return {
      status: false,
      message: '更新失败'
    }
  }
  return {
    status: false,
    message: 'id不能为空'
  }
}

/**
 * 删除博客
 * @param {string} id id
 */
const deleteBlog = async (id, author) => {
  if (id) {
    let sql = `delete from ${table_name} where id=${escape(id)} and author=${escape(author)}`
    const result = await exec(sql)
    if (result.affectedRows > 0) {
      return {
        status: true
      }
    }
    return {
      status: false,
      message: '删除失败'
    }
  }
  return {
    status: false,
    message: 'id不能为空'
  }
}
module.exports = {
  getBlogList,
  getBlogDetail,
  createBlog,
  updateBlog,
  deleteBlog
}