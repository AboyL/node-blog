const env = process.env.NODE_ENV
let MYSQL_CONF = {}

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'l123321.',
    database: 'blog',
    port: '3306'
  }
}

if (env === 'prod') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'l123321.',
    database: 'blog'
  }
}

module.exports = MYSQL_CONF
