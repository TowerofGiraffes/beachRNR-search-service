const searchQuery = require('../utils/elasticSearch/searchQuery');
const redis = require('../utils/redis/redis');
const {performance} = require('perf_hooks');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

const formatData = input => {
  const data = input.hits.hits.map(result => result._source);
  return { timeTaken: input.took, count: input.hits.total, data };
};

const search = asyncMiddleware(async (req, res) => {
  const term = req.params;
  console.log(term.location);
  let formattedData = [];
  let results;
  let t0 = performance.now();
  results = await redis.getSearchResults(term.location);
  let t1 = performance.now();
  if (results) {
    formattedData = { timeTaken: (t1 - t0).toFixed(2), count: results.total, data: results.data };
  } else {
    results = await searchQuery.queryTerm(term);
    formattedData = formatData(results);
  }
  res.status(200).send(formattedData);
  redis.writeSearchToCache(term.location, formattedData);
});

module.exports = {
  formatData, search
};
