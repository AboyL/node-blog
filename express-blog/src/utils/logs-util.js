const fs = require('fs-extra')
const path = require('path')

// 生成 write Stream
function createWriteStream (fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  // 整个生命周期只执行一次 问题不大
  fs.ensureFileSync(fullFileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')

module.exports = {
  accessWriteStream
}