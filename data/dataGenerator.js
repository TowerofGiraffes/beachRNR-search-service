const faker = require('faker');
const cityWithState = require('./cityAndStateList');

const generateData = (index) => {
  const listings = [];
  for (let i = index; i < index + 10000; i += 1) {
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
  return listings;
};

module.exports = { generateData };

