const express = require('express');

const Listings = require('../data/dataGenerator');
const search = require('./search');
const app = express();
const PORT = 3001;

// app.get('/api/listing/:location', (req, res) => {
//   const queryString = req.params.location.toLowerCase();
//   const results = Listings.filter(listing =>
//     listing.unitAddress.toLowerCase().includes(decodeURI(queryString)));
//   res.status(200).send(results);
// });

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

  app.get('/api/listing/:location', asyncMiddleware(async (req, res, next) => {
    const term = req.params;
    const results =  await search.queryTerm(term);
    const data = await results.hits.hits.map(result => result._source);
    res.json({timeTaken: results.took, count:results.hits.total, data: data});
    }
  )
);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
