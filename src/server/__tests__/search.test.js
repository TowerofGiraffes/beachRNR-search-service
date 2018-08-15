/* eslint-env jest */
const httpMocks = require('node-mocks-http');
import {formatData, search } from '../search';

const searchQuery = require('../../utils/elasticSearch/searchQuery');
jest.mock('../../utils/elasticSearch/searchQuery');

const req = httpMocks.createRequest({params: {location: 'boston' }});
var res = httpMocks.createResponse();

searchQuery.queryTerm.mockImplementation((term) => {
  const jsonData = require(`../__mockData__/${term.location}.json`);
  return jsonData;
});

res.json = data => data;
// res._getData = (data) => data;


describe('get formatted data', () => {
  it('should return formatted data', () => {
    const jsonData = require(`../__mockData__/boston.json`);
    const output = formatData(jsonData);

    expect(output).toBeDefined();
    expect(output.timeTaken).toEqual(10);
    expect(output.count).toEqual(1);
    expect(output.data[0].id).toEqual(2912296);
    expect(output.data[0].unitName).toEqual('South End Brownstone 1bd/1ba');
    expect(output.data[0].unitImage).toEqual('https://s3.us-east-2.amazonaws.com/bnbsearch/images/4.jpg');
    expect(output.data[0].city).toEqual('Boston');
  });
});

xdescribe('get search result', () => {
  xit('should load search result', async () => {
    // const searchSpy = jest.spyOn(search, 'search');
    const output = search(req, res);
    // expect(searchSpy).toHaveBeenCalled();
    let result = res
    // console.dir(result, {depth: null, color: true});
    console.log('output~~~', output);
    expect(res.statusCode).toBe(200);
    // expect(output).toBeDefined();
  });
});

