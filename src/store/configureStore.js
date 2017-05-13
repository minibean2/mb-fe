const env = require('get-env')();
//const env = process.env.NODE_ENV || 'dev';
if (env === 'prod') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
