require('newrelic');
const app = require('./app');
const args = process.argv.slice(2);

const PORT = args[0] || 3001;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
