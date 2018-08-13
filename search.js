const { client, index, type } = require('./connection');

module.exports = {
  // Query ES index for the provided term
  queryTerm(term, offset = 0) {
    console.log('searching elastic:', term.location);
    const body = {
      from: offset,
      query: {
        match: {
          city: {
            query: term.location,
            operator: 'AND',
            // fuzziness: 'AUTO',
            minimum_should_match: '20%'
          }
        }
      },
      highlight: { fields: { city: {} } }
    };
    return client.search({ index, type, body });
  }
};
