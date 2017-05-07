const env = require('get-env')();
//const env = process.env.NODE_ENV || 'dev';

//console.log("===============> " + env);
if (env === 'prod') {
    module.exports = require('../config_prod')
} else {
    module.exports = require('../config_dev')
}