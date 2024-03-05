/* Setup Redis client */
const Redis = require("ioredis");

exports.redisClient = new Redis({
  host: "redis.bytebracket.io",
  port: 6379,
  lazyConnect: false,
  connectTimeout: 10000,
});
