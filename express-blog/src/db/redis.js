const REDIS_CONF = require('../config/redis')
const redis = require("redis")
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = client