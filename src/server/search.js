const searchQuery = require('../utils/elasticSearch/searchQuery');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

module.exports = asyncMiddleware(async (req, res) => {
  const term = req.params;
  const results = await searchQuery.queryTerm(term);
  const data = await results.hits.hits.map(result => result._source);
  // console.log('response~~~', { timeTaken: results.took, count: results.hits.total, data });
  return res.status(200).json({ timeTaken: results.took, count: results.hits.total, data });
});
