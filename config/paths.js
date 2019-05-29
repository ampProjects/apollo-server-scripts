const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appFolder: resolveApp('.'),
  // dotenv: resolveApp(`.env.${process.env.NODE_ENV}`),
  dotenv: resolveApp('.env'),
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appPackageJSON: resolveApp('package.json'),
  appSrcIndex: resolveApp('src/index.js'),
  appDistIndex: resolveApp('dist/index.js'),
  appLogs: resolveApp('logs'),
  appNodeModules: resolveApp('node_modules'),
};
