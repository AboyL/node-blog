const config = require('../config/index')
const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { getBlogList, getBlogDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const api_series = 'blog'
// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return new ErrorResModal('尚未登录')
  }
}

const handleBlogRouter = async (req, res) => {
  const id = req.query.id

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/list`) {
    const author = req.query.author
    const keyword = req.query.keyword
    const blogList = await getBlogList(author, keyword, {
      isAdmin: !!req.query.isAdmin,
      adminAuthor: req.session.username
    })

    return new SuccessResModal(blogList)
  }

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/detail`) {
    const detail = await getBlogDetail(id)
    if (detail) {
      return new SuccessResModal(detail)
    }
    return new ErrorResModal('请输入博客id')
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/create`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username

    const result = await createBlog(req.body)
    return new SuccessResModal(result)
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/update`) {

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    req.body.author = req.session.username

    const result = await updateBlog(id, req.body)

    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal(result.message || '更新失败')
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/delete`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username

    const result = await deleteBlog(id, req.body.author)
    if (result.status) {
      return new SuccessResModal({})
    }
    return new ErrorResModal({}, result.message || '更新失败')
  }

}
module.exports = handleBlogRouter