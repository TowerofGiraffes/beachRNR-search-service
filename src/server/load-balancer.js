// require('newrelic');
var httpProxy = require('http-proxy');
http = require('http');
const PORT = 9000;

// Addresses to use in the round robin proxy
var addresses = [
  {
    host: 'localhost',
    port: 3001
  },
  {
    host: 'localhost',
    port: 3002
  },
  {
    host: 'localhost',
    port: 3003
  }
];

// httpProxy.createServer(function (req, res) {
//   let target = addresses.shift();
//   console.log('!!!!!!', addresses);
//   console.log(target);
//   proxy.proxyRequest(req, res, target);
//   addresses.push(target);
// }).listen(9000, () => {
//   console.log('listening on port 9000');
// });

//create new proxy
const proxy = httpProxy.createProxyServer();

// create a new instance of http server
http.createServer(function (req, res) {
  let target = addresses.shift();
  console.log(target);
  proxy.web(req, res, { target: target }, );
  addresses.push(target);
}).listen((PORT), () => {
  console.log(`listening on port ${PORT}`);
});
