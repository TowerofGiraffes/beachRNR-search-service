const express = require('express');
const search = require('./search');

const app = express();
const PORT = 3001;

app.get('/api/listing/:location', search.search);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
