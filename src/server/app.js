const express = require('express');
const search = require('./search');

const app = express();

app.get('/api/listing/:location', search.search);

module.exports = app;
