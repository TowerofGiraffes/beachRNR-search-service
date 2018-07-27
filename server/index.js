const express = require('express');

const Listing = require('../data/mockedDataSearch');

const app = express();
const PORT = 3001;

app.get('/api/listing/:location', (req, res) => {
  const queryString = req.url.split('/')[req.url.split('/').length - 1].toLowerCase();
  const results = Listing.listings.filter(listing =>
    listing.unitAddress.toLowerCase().includes(decodeURI(queryString)));
  res.status(200).send(results);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
