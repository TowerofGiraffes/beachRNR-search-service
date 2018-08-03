const esConnection = require('./connection');
const listings = require('../data/mockedDataSearch');

async function insertListingData(data) {
  let bulkOps = [];
  await esConnection.checkConnection();
  await esConnection.resetIndex()
  for (let i = 0; i < data.length; i++) {
    // console.log('data[i].id', data[i].id);
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type, _id: data[i].id }},
    data[i]
    );
    console.log(`Adding ${data[i].id} to array`);
    console.log(bulkOps);
  }

  await esConnection.client.bulk({ body: bulkOps })
  console.log(`Indexed data ${data.length - (bulkOps.length / 2)} - ${data.length}\n\n\n`)
}

insertListingData(listings);
