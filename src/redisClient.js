/* Setup Redis client */
const Redis = require("ioredis");

exports.redisClient = new Redis(
  "redis://bytebracket-redis.3mcqkz.ng.0001.use1.cache.amazonaws.com:6379",
  {
    tls: {},
  }
);
