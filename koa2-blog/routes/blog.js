const { SuccessResModal, ErrorResModal } = require('../model/resModal')
const { getBlogList, getBlogDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
const router = require('koa-router')()

router.prefix('/api/blog')

// 统一的登录验证函数
const loginCheck = async (ctx, next) => {
  if (!ctx.session.username) {
    ctx.body = new ErrorResModal('尚未登录')
  }
  await next()
}

router.get('/list', async (ctx, next) => {
  const author = ctx.query.author
  const keyword = ctx.query.keyword
  const blogList = await getBlogList(author, keyword, {
    isAdmin: !!ctx.query.isAdmin,
    adminAuthor: ctx.session.username
  })
  ctx.body = new SuccessResModal(blogList)
})


router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id
  const detail = await getBlogDetail(id)
  if (detail) {
    ctx.body = new SuccessResModal(detail)
    return
  }
  ctx.body = new ErrorResModal('请输入博客id')
})

router.post('/create', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const result = await createBlog({
    author,
    ...ctx.request.body
  })
  console.log('result', result)
  ctx.body = new SuccessResModal(result)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const id = ctx.query.id

  const result = await updateBlog(id, body)
  if (result.status) {
    ctx.body = new SuccessResModal({})
    return
  }
  ctx.body = new ErrorResModal(result.message || '更新失败')
})

router.post('/delete', loginCheck, async (ctx, next) => {

  const author = ctx.session.username
  const id = ctx.query.id
  const result = await deleteBlog(id, author)
  if (result.status) {
    ctx.body = new SuccessResModal({})
    return
  }
  ctx.body = new ErrorResModal(result.message || '更新失败')
})

module.exports = router