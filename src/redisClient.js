/* Setup Redis client */
const Redis = require("ioredis");

exports.redisClient = new Redis({
  host: "bytebracket-redis.3mcqkz.ng.0001.use1.cache.amazonaws.com",
  port: 6379,
  lazyConnect: false,
  connectTimeout: 10000,
});
