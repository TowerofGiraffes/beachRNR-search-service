const searchQuery = require('../utils/elasticSearch/searchQuery');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

module.exports = asyncMiddleware(async (req, res) => {
  const term = req.params;
  const results = await searchQuery.queryTerm(term);
  const data = await results.hits.hits.map(result => result._source);
  res.json({ timeTaken: results.took, count: results.hits.total, data });
});
