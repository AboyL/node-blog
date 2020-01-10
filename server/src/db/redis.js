const REDIS_CONF = require('../config/redis')
const redis = require("redis")
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

client.on("error", function (err) {
  console.log("Error " + err);
});

const redisSet = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  client.set(key, value)
}

const redisGet = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) {
      resolve(null)
      return
    }
    client.get(key, (err, value) => {
      if (err) {
        reject(err)
      }
      if (value === null) {
        resolve(value)
      }
      try {
        resolve(JSON.parse(value))
      } catch (error) {
        resolve(value)
      }
    })
  })
}

module.exports = {
  redisSet,
  redisGet
}