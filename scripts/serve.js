process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const paths = require('../config/paths');

// babel config for production mode
require('@babel/polyfill');

// We make sure enviroments variables are read
require('../config/env');
require(`${paths.appDist}/index`);
