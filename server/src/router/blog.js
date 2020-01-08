const config = require('../config/index')
const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { getBlogList, getBlogDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const api_series = 'blog'

const handleBlogRouter = async (req, res) => {
  const id = req.query.id

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/list`) {
    const author = req.query.author
    const keyword = req.query.keyword
    const blogList = await getBlogList(author, keyword)
    return new SuccessResModal(blogList)
  }

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/detail`) {
    const detail = await getBlogDetail(id)
    if (detail) {
      return new SuccessResModal(detail)
    }
    return new ErrorResModal({}, '请输入博客id')
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/create`) {
    req.body.author = 'lisi'
    const result = await createBlog(req.body)
    return new SuccessResModal(result)
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/update`) {
    const result = await updateBlog(id, req.body)
    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal({}, result.message || '更新失败')
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/delete`) {
    req.body.author = 'lisi'
    const result = await deleteBlog(id,req.body.author)
    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal({}, result.message || '更新失败')
  }

}
module.exports = handleBlogRouter