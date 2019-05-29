/* eslint-disable import/no-dynamic-require */
const chalk = require('chalk');
const spawn = require('cross-spawn');
const path = require('path');

const paths = require('../config/paths');

const config = require(path.resolve(paths.appFolder, 'config/app.config.js'));

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

console.log(chalk.cyan('Starting the deploy process ...'));

// We make sure enviroments variables are read
// require('../config/env'); // eslint-disable-line

switch (config.provider.service) {
  case 'serverless':
    spawn.sync(
      'serverless',
      ['deploy'],
      { stdio: 'inherit' },
    );
    break;
  default:
    break;
}
