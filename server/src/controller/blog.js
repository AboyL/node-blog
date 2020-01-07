/**
 * 获取博客列表
 * @param {string} author 作者
 * @param {string} keyword 关键字
 */
const getBlogList = (author = '', keyword = '') => {
  return [{
    id: '1',
    title: '第一个博客',
    author: '张三',
    content: '这个是博客的内容',
    createTime: 1578396146561,
  }, {
    id: '2',
    title: '第二个博客',
    author: '李四',
    content: '这个是博客的内容2222',
    createTime: 1578396106561,
  }]
}

/**
 * 获取博客详情
 * @param {string} id id
 */
const getBlogDetail = (id) => {
  if (id) {
    return {
      id: '1',
      title: '第一个博客',
      author: '张三',
      content: '这个是博客的内容',
      createTime: 1578396146561,
    }
  } else {
    return false
  }
}

/**
 * 新建博客
 * @param {object} blogData 新建所需要的内容
 */
const createBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

/**
 * 更新博客
 * @param {string} id id
 * @param {object} blogData 新建所需要的内容
 */
const updateBlog = (id = '', blogData = {}) => {
  if (id) {
    return {
      status: true
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
const deleteBlog = (id) => {
  if (id) {
    return {
      status: true
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