/* Setup Redis client */
const RedisClustr = require("redis-clustr");

exports.redisClient = new RedisClustr({
  servers: [
    {
      host: "bytebracket-redis.3mcqkz.ng.0001.use1.cache.amazonaws.com",
      port: 6379,
    },
  ],
});
