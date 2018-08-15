const searchQuery = require('../utils/elasticSearch/searchQuery');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

const formatData = input => {
  const data = input.hits.hits.map(result => result._source);
  return { timeTaken: input.took, count: input.hits.total, data }
}

const search = asyncMiddleware(async (req, res) => {
  const term = req.params;
  const results = await searchQuery.queryTerm(term);
  const formattedData = formatData(results);
  res.status(200).send(formattedData);
});

module.exports = {
  formatData, search
};
