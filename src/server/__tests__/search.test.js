/* eslint-env jest */
const httpMocks = require('node-mocks-http');
import {formatData, search } from '../search';
import { EventEmitter } from 'events';

const searchQuery = require('../../utils/elasticSearch/searchQuery');
jest.mock('../../utils/elasticSearch/searchQuery');

const req = httpMocks.createRequest({
  params: {location: 'boston' }
});
const res = httpMocks.createResponse({
  eventEmitter: EventEmitter
});

searchQuery.queryTerm.mockImplementation((term) => {
  const jsonData = require(`../__mockData__/${term.location}.json`);
  return jsonData;
});

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

describe('get search result', () => {
  it('should return search result', async () => {
    let result = {};
    res.on('end', () => {
      result = res._getData();
      done();
    });
    await search(req, res);

    expect(res.statusCode).toBe(200);
    expect(result.timeTaken).toEqual(10);
    expect(result.count).toEqual(1);
    expect(result.data[0].id).toEqual(2912296);
    expect(result.data[0].unitName).toEqual('South End Brownstone 1bd/1ba');
    expect(result.data[0].unitImage).toEqual('https://s3.us-east-2.amazonaws.com/bnbsearch/images/4.jpg');
    expect(result.data[0].city).toEqual('Boston');
  });
});

