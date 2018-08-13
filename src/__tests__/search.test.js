/* eslint-env jest */

const search = require('../server/search');

// A simple example test
describe('get search result', () => {
  it('should load search result', async () => {
    const data = await search( {params: {location: 'boston' }});
    // return (data);
    expect(data).toBeDefined();
  });
});

