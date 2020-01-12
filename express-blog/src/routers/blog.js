const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { getBlogList, getBlogDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')

const router = require('express').Router()

// 统一的登录验证函数
const loginCheck = (req, res, next) => {
  if (!req.session.username) {
    res.json(
      new ErrorResModal('尚未登录')
    )
  }
  next()
}

router.get('/list', async (req, res, next) => {
  const author = req.query.author
  const keyword = req.query.keyword
  const blogList = await getBlogList(author, keyword, {
    isAdmin: !!req.query.isAdmin,
    adminAuthor: req.session.username
  })
  res.json(
    new SuccessResModal(blogList)
  )
})


router.get('/detail', async (req, res, next) => {
  const id = req.query.id
  const detail = await getBlogDetail(id)
  if (detail) {
    res.json(
      new SuccessResModal(detail)
    )
    return
  }
  res.json(
    new ErrorResModal('请输入博客id')
  )
})

router.post('/create', loginCheck, async (req, res, next) => {
  console.log('sss')
  req.body.author = req.session.username
  const result = await createBlog(req.body)
  res.json(
    new SuccessResModal(result)
  )
})

router.post('/update', loginCheck, async (req, res, next) => {
  req.body.author = req.session.username
  const id = req.query.id

  const result = await updateBlog(id, req.body)
  if (result.status) {
    res.json(
      new SuccessResModal({})
    )
    return
  }
  res.json(
    new ErrorResModal(result.message || '更新失败')
  )
})

router.post('/delete', loginCheck, async (req, res, next) => {
  req.body.author = req.session.username
  const id = req.query.id

  const result = await deleteBlog(id, req.body.author)
  if (result.status) {
    res.json(new SuccessResModal({}))
    return
  }
  res.json(
    new ErrorResModal(result.message || '更新失败')
  )
})

module.exports = router