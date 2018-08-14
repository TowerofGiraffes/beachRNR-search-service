/* eslint-env jest */
const httpMocks = require('node-mocks-http');
import search from '../search';
jest.mock('../../utils/elasticSearch/searchQuery');

const searchQuery = require('../../utils/elasticSearch/searchQuery');

const req = httpMocks.createRequest({params: {location: 'boston' }});
const res = httpMocks.createResponse();

searchQuery.queryTerm.mockImplementation((term) => {
  // console.log('in mock', term.location);
  const jsonData = require(`../__mockData__/${term.location}.json`);
  // console.log('jsonData', jsonData)
  return jsonData;
});

// console.log('res.json.toString() before', res.json.toString())
// console.log('res.json.toString() after', res.json.toString())
// res._getData = jest.fn().mockImplementation(data => data);
res.json = data => data;
// res._getData = (data) => data;

describe('get search result', () => {
  it('should load search result', async () => {
    // const searchSpy = jest.spyOn(search, 'search');
    const output = search(req, res);
    // expect(searchSpy).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    console.log('output~~', output);

    // expect(output).toBeDefined();
  });
});

