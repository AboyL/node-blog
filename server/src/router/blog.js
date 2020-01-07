const config = require('../config/index')
const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { getBlogList, getBlogDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const api_series = 'blog'

const handleBlogRouter = (req, res) => {
  const id = req.query.id

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/list`) {
    const author = req.query.author
    const keyword = req.query.keyword
    const blogList = getBlogList(author, keyword)
    return new SuccessResModal(blogList)
  }

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/detail`) {
    const detail = getBlogDetail(id)
    if (detail) {
      return new SuccessResModal(detail)
    }
    return new ErrorResModal({}, '请输入博客id')
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/create`) {
    return new SuccessResModal(createBlog(req.body))
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/update`) {
    console.log(req.body)
    const result = updateBlog(id, req.body)
    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal({}, result.message || '更新失败')
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/delete`) {
    const result = deleteBlog(id)
    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal({}, result.message || '更新失败')
  }

}
module.exports = handleBlogRouter