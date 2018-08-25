const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const data = require('./mockedDataSearch');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient({host: 'redis'});
const client = redis.createClient();

client.on('error', (err) => {
  console.log('Error ' + err);
});

const writeSearchToCache = (result, query) => {
  let filteredResult = result.filter(e => e.city.toLowerCase() === query.toLowerCase());
  console.log('filteredResult', filteredResult);
  client.setAsync(query, JSON.stringify(filteredResult));
};

const getSearchResults = (query) => {
  console.log('~~~~~~~~query', query);
  return client.getAsync(query)
    .then( (value) => {
      return JSON.parse(value);
    })
    .catch( (err) => console.log('an error?', err));
};

// writeSearchToCache(data.listings, 'seattle');
// getSearchResults('seattle');


module.exports.getSearchResults = getSearchResults;
module.exports.writeSearchToCache = writeSearchToCache;
