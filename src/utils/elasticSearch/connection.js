const elasticsearch = require('elasticsearch');
require('dotenv').config();

// Core ES variables for this project
const index = 'listings';
const type = 'homes';
const port = 9200;
const host = process.env.ES_HOST || 'localhost';

let client = new elasticsearch.Client({ host });
if (!process.env.ES_HOST) { client = new elasticsearch.Client({ host: { host, port } }); }

/** Check the ES connection status */
const checkConnection = async (err) => {
  let isConnected = false;
  while (!isConnected) {
    // console.log('Connecting to ES');
    await client.cluster.health({});
    // const health = await client.cluster.health({});
    // console.log(health);
    isConnected = true;
    if (err) {
      throw (err);
    }
  }
};

// checkConnection()

const putListingMapping = async () => {
  const schema = {
    id: { type: 'double' },
    unitName: { type: 'text' },
    unitImage: { type: 'text' },
    hostId: { type: 'double' },
    isSuprhost: { type: 'boolean' },
    unitAddress: { type: 'text' },
    neighbourhood_cleansed: { type: 'text' },
    city: { type: 'text' },
    state: { type: 'text' },
    country_code: { type: 'text' },
    property_type: { type: 'text' },
    room_type: { type: 'text' },
    beds: { type: 'integer' },
    unitPrice: { type: 'text' },
    priceModifier: { type: 'text' },
    numberOfReviews: { type: 'integer' },
    reviewScoresRating: { type: 'integer' },
    freeCancellation: { type: 'boolean' }
  };

  return client.indices.putMapping({ index, type, body: { properties: schema } });
};

const resetIndex = async () => {
  if (await client.indices.exists({ index })) {
    await client.indices.delete({ index });
  }
  await client.indices.create({ index });
  await putListingMapping();
};

module.exports = {
  client, index, type, checkConnection, resetIndex
};
