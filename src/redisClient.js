/* Setup Redis client */
const Redis = require("ioredis");

exports.redisClient = new Redis({
  host: "bytebracket-rediscluster.3mcqkz.0001.use1.cache.amazonaws.com",
  port: 6379,
  lazyConnect: false,
  connectTimeout: 10000,
});
