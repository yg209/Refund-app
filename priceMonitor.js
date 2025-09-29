const Queue = require('bull');
const redisConfig = { host: process.env.REDIS_HOST || '127.0.0.1', port: process.env.REDIS_PORT || 6379 };
const priceQueue = new Queue('price-monitor', { redis: redisConfig });
priceQueue.process(async (job) => {
  console.log('Price monitor job for', job.data);
  return true;
});
module.exports = priceQueue;
