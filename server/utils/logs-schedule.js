const schedule = require('node-schedule')
const fs = require('fs-extra')
const path = require('path')

schedule.scheduleJob('0 * * *', function () {
  console.log('chunk access log')
  // 进行复制操作
  const d = new Date()
  const accessLogFile = path.join(__dirname, '../../logs/access.log')
  fs.copySync(accessLogFile,
    path.join(__dirname, `../../logs/access-chunk/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.access.log`))
  fs.outputFile(accessLogFile, '')
})
