/* eslint-env jest */
const httpMocks = require('node-mocks-http');
import { formatData, search } from '../search';
import { EventEmitter } from 'events';

const searchQuery = require('../../utils/elasticSearch/searchQuery');
jest.mock('../../utils/elasticSearch/searchQuery');

const request = location => httpMocks.createRequest({
  params: {location: location }
});

const response = () => httpMocks.createResponse({
  eventEmitter: EventEmitter
});

searchQuery.queryTerm.mockImplementation((term) => {
  const jsonData = require(`../__mockData__/${term.location}.json`);
  return jsonData;
});

describe('get formatted data', () => {
  it('should return formatted data', () => {
    const jsonData = require('../__mockData__/boston.json');
    const output = formatData(jsonData);

    expect(output).toBeDefined();
    expect(output.timeTaken).toEqual(10);
    expect(output.count).toEqual(2);
    expect(output.data[0].id).toEqual(2912296);
    expect(output.data[0].unitName).toEqual('South End Brownstone 1bd/1ba');
    expect(output.data[0].unitImage).toEqual('https://s3.us-east-2.amazonaws.com/bnbsearch/images/4.jpg');
    expect(output.data[0].city).toEqual('Boston');
  });
});

let result = {};
let res;

describe('get search result', () => {
  beforeEach(() => {
    res = response();
    result = {};
    res.on('end', () => { result = res._getData(); });
  });

  it('should return search result for a valid location', async () => {
    await search(request('boston'), res);

    expect(res.statusCode).toBe(200);
    expect(result.timeTaken).toEqual(10);
    expect(result.count).toEqual(2);
    expect(result.data[0].id).toEqual(2912296);
    expect(result.data[0].unitName).toEqual('South End Brownstone 1bd/1ba');
    expect(result.data[0].unitImage).toEqual('https://s3.us-east-2.amazonaws.com/bnbsearch/images/4.jpg');
    expect(result.data[0].city).toEqual('Boston');
    expect(result.data[1].id).toEqual(2915602);
    expect(result.data[1].unitName).toEqual('South mouth Estates');
    expect(result.data[1].unitImage).toEqual('https://s3.us-east-2.amazonaws.com/bnbsearch/images/23.jpg');
    expect(result.data[1].city).toEqual('Boston');
  });

  it('should return empty dataset for invalid location', async () => {
    await search(request('invalid_location'), res);

    expect(res.statusCode).toBe(200);
    expect(result.timeTaken).toEqual(6);
    expect(result.count).toEqual(0);
    expect(result.data.length).toEqual(0);
  });
});
