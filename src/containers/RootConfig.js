const env = require('get-env')();
//const env = process.env.NODE_ENV || 'dev';
//console.log("NODE_ENV=" + env);
if (env === 'prod') {
    module.exports = require('../config_prod')
} else {
    module.exports = require('../config_dev')
}