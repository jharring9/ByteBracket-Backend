/* Setup Redis client */
const Redis = require("ioredis");

exports.redisClient = new Redis({
  host: "redis://bytebracket-cluster.3mcqkz.clustercfg.use1.cache.amazonaws.com",
  port: 6379,
  tls: {},
});
