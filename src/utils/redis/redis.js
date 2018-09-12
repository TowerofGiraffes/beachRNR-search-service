const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient({host: 'redis'});
// let client = redis.createClient();
let client;

const writeSearchToCache = async (query, result) => {
  client = client ? client : redis.createClient();

  let filteredResult = result.data.filter(e => e.city.toLowerCase() === query.toLowerCase());
  if (filteredResult.length) {
    await client.setAsync(query, JSON.stringify({ total: result.count, data: filteredResult}));
  }
};

const getSearchResults = async (query) => {
  client = client ? client : redis.createClient();
  let value = await client.getAsync(query);
  return JSON.parse(value);
};

const closeInstance = (callback) => {
  client.quit(callback);
};

module.exports.getSearchResults = getSearchResults;
module.exports.writeSearchToCache = writeSearchToCache;
module.exports.closeInstance = closeInstance;

