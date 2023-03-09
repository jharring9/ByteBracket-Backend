/* Setup Redis client */
const Redis = require("ioredis");

exports.redisClient = new Redis({
  host: "bytebracket-redis-001.3mcqkz.0001.use1.cache.amazonaws.com",
  port: 6379,
  tls: {
    rejectUnauthorized: false,
  },
});
