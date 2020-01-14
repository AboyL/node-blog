const http = require('http')

const PROT = 3000
const serverHandle = require('../app')
const app = http.createServer(serverHandle)

app.listen(PROT)