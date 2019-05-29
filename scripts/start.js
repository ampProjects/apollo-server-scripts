/* eslint-disable import/no-dynamic-require */
const chalk = require('chalk');
const spawn = require('cross-spawn');
const path = require('path');

const paths = require('../config/paths');

const config = require(path.resolve(paths.appFolder, 'config/app.config.js'));

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

console.log(chalk.cyan('Starting the development server ...'));

switch (config.provider.service) {
  case 'serverless':
    spawn.sync(
      'serverless',
      ['offline', 'start'],
      { stdio: 'inherit' },
    );
    break;
  case 'default':
    // babel config for development mode
    require('@babel/register');
    require('@babel/polyfill');
    // We make sure enviroments variables are read
    require('../config/env'); // eslint-disable-line
    spawn.sync(
      'nodemon',
      [`${paths.appSrc}/index`],
      { stdio: 'inherit' },
    );
    
    break;
  default:
    break;
}
