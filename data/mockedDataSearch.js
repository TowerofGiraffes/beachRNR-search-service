const faker = require('faker');

const cityWithState = ['New York, NY', 'New Jersey, NJ', 'San Francisco, CA',
  'Chicago, IL', 'Seattle, WA', 'Boston, MA', 'Los Angeles, CA'];

const listings = [];
for (let i = 2912000; i < 2912100; i += 1) {
  const randomCityWithState = cityWithState[Math.floor(Math.random() * cityWithState.length)];
  const listing = {
    id: i,
    unitName: `${faker.address.cityPrefix()} ${faker.address.citySuffix()} ${faker.address.streetSuffix()}`,
    unitImage: `https://s3.us-east-2.amazonaws.com/bnbsearch/images/${faker.random.number({ min: 1, max: 35 })}.jpg`,
    hostId: faker.random.number(),
    hostName: faker.name.firstName(),
    isSuprhost: faker.random.boolean(),
    unitAddress: `${faker.address.streetAddress()}, ${randomCityWithState} ${faker.address.zipCode('#####')}, United States`,
    city: `${randomCityWithState.split(',')[0]}`,
    country_code: 'US',
    property_type: faker.random.arrayElement(['House', 'Apartment', 'Condominium', 'Villa', 'Bed & Breakfast', 'Townhouse']),
    room_type: faker.random.arrayElement(['Private room', 'Entire home/apt', 'shared room']),
    beds: faker.random.number({ min: 1, max: 5 }),
    unitPrice: `$${faker.random.number({ min: 70, max: 500 })}`,
    priceModifier: 'per night',
    numberOfReviews: faker.random.number({ min: 50, max: 2000 }),
    reviewScoresRating: faker.random.arrayElement([3, 3.5, 4, 4.5, 5]),
    freeCancellation: faker.random.boolean()
  };
  listings.push(listing);
}

module.exports = listings;
