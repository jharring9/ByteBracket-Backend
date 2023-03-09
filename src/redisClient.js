/* Setup Redis client */
const redis = require("redis");

exports.redisClient = redis.createClient({
  url: "bytebracket-cluster.3mcqkz.clustercfg.use1.cache.amazonaws.com:6379",
});
