const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient({host: 'redis'});
// let client = redis.createClient();
let client;

const writeSearchToCache = async (query, result) => {
  client = redis.createClient();

  let filteredResult = result.data.filter(e => e.city.toLowerCase() === query.toLowerCase());
  if (filteredResult.length) {
    await client.setAsync(query, JSON.stringify({ total: result.count, data: filteredResult}));
  }
  // await client.setAsync(query, JSON.stringify(filteredResult));
  client.quit();
};

const getSearchResults = async (query) => {
  client = redis.createClient();
  let value = await client.getAsync(query);
  client.quit();
  return JSON.parse(value);
};

// writeSearchToCache(data.listings, 'seattle');
// getSearchResults('seattle');

module.exports.getSearchResults = getSearchResults;
module.exports.writeSearchToCache = writeSearchToCache;

