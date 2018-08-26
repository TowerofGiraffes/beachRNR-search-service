const searchQuery = require('../utils/elasticSearch/searchQuery');
const redis = require('../utils/redis/redis');

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
  results = await redis.getSearchResults(term.location);
  if (results) {
    formattedData = { timeTaken: 5, count: results.length, data: results };
  } else {
    results = await searchQuery.queryTerm(term);
    formattedData = formatData(results);
  }
  res.status(200).send(formattedData);
  redis.writeSearchToCache(term.location, formattedData.data);
});

module.exports = {
  formatData, search
};
