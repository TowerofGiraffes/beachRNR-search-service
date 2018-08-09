const esConnection = require('./connection');
const listings = require('../data/dataGenerator');

async function insertListingData(data) {
  let bulkOps = [];
  await esConnection.checkConnection();
  await esConnection.resetIndex();
  for (let i = 0; i < data.length; i++) {
    // console.log('data[i].id', data[i].id);
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type, _id: data[i].id }},
      data[i]
    );
    console.log(`Adding ${data[i].id} to array`);
    console.log(bulkOps);
    if (i > 0 && i % 500 === 0) {
      await esConnection.client.bulk({ body: bulkOps });
      bulkOps = [];
      console.log(`Indexed listings ${i - 499} - ${i}`);
    }
  }

  await esConnection.client.bulk({ body: bulkOps });
  console.log(`Indexed data ${data.length - (bulkOps.length / 2)} - ${data.length}\n\n\n`);
}

insertListingData(listings);
