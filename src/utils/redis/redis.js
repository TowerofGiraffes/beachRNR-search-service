const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient({host: 'redis'});
const client = redis.createClient();

const writeSearchToCache = async (query, result) => {
  let filteredResult = result.filter(e => e.city.toLowerCase() === query.toLowerCase());
  await client.setAsync(query, JSON.stringify(filteredResult));
};

const getSearchResults = async (query) => {
  let value = await client.getAsync(query);
  return JSON.parse(value);
};

// writeSearchToCache(data.listings, 'seattle');
// getSearchResults('seattle');
const closeInstance = async (callback) => {
  await client.quit(callback);
};

module.exports.getSearchResults = getSearchResults;
module.exports.writeSearchToCache = writeSearchToCache;
module.exports.closeInstance = closeInstance;
