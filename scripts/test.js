process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

// Ensure environment are read
require('../config/env');

const jest = require('jest');
const chalk = require('chalk');
const paths = require('../config/paths');

console.log(chalk.cyan('Starting the testing server ...'));

const argv = process.argv.slice(2);

// eslint-disable-next-line import/no-dynamic-require
const jestConfig = require(`${paths.appFolder}/config/jestConfig.js`);

argv.push('--config', JSON.stringify(jestConfig));

jest.run(argv);
