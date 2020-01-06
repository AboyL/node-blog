const config = require('../config/index')
const api_series = 'blog'

const handleBlogRouter = (req, res) => {
  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/list`) {
    return {
      msg: '这个是获取博客列表的接口'
    }
  }

  if (req.method === 'GET' && req.path === `${config.api_pre}/${api_series}/detail`) {
    return {
      msg: '这个是获取博客详情的接口'
    }
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/new`) {
    return {
      msg: '这个是新建博客'
    }
  }

  if (req.method === 'POST' && req.path === `${config.api_pre}/${api_series}/delete`) {
    return {
      msg: '这个是删除博客'
    }
  }

}
module.exports = handleBlogRouter