process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});

// Ensure enviroments variables are read
require('../config/env');

const chalk = require('chalk');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const paths = require('../config/paths');

function compile() {
  console.log(chalk.cyan('Compiling files .....'));
  const result = spawn.sync(
    'babel',
    ['src', '-s', '-d', 'dist'],
    { stdio: 'inherit' },
  );
  // console.log(result);
  process.exit(result.status);
}

console.log(chalk.cyan('Starting building process ... \n'));
if (fs.existsSync(paths.appDist)) {
  fs.removeSync(paths.appDist);
  fs.mkdir(`${paths.appFolder}/dist`);
  compile();
} else {
  fs.mkdir(`${paths.appFolder}/dist`);
  compile();
}
