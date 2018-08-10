const esConnection = require('./connection');
const listings = require('../data/dataGenerator');

const totalNumberOfRecords = 10000000
let startIndex = 2912000
let endIndex = startIndex + totalNumberOfRecords;

async function insertListingData(data) {
  let bulkOps = [];
  for (let i = 0; i < data.length; i++) {
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type, _id: data[i].id }},
      data[i]
    );
    // console.log(`Adding ${data[i].id} to array`);
    // console.log(bulkOps);
    if (i > 0 && i % 500 === 0) {
      await esConnection.client.bulk({ body: bulkOps });
      bulkOps = [];
      // console.log(`Indexed listings ${i - 499} - ${i}`);
    }
  }
  await esConnection.client.bulk({ body: bulkOps });
  // console.log(`Indexed data ${data.length - (bulkOps.length / 2)} - ${data.length}\n\n\n`);
}

async function indexData() {
  await esConnection.resetIndex();
  while (startIndex < endIndex) {
    await esConnection.checkConnection();
    let input = listings.generateData(startIndex);
    startIndex += input.length;
    // console.log('startIndex', startIndex)
    await insertListingData(input);
  }
}

indexData();
