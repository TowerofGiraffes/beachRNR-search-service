
const search = ((location) => {
  const responseData = require(`../__mockData__/response_${location}.json`);
  // console.log('responseData~~~', responseData);
  // res.status(200).send(responseData);
  return new Promise((resolve, reject) => {
    console.log('called search');
    process.nextTick(
      () => responseData.data.length ? resolve(responseData) : reject({
        error: location + ' not found.'
      })
    );
  });
});

module.exports = {
  search
};
