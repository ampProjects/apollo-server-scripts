const fs = require('fs');
const paths = require('./paths');

delete require.cache[require.resolve('./paths')];

// eslint-disable-next-line
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV enviroment variable is required but was not specified');
}

const dotEnvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
];

dotEnvFiles.forEach((dotEnvFile) => {
  if (fs.existsSync(dotEnvFile)) {
    require('dotenv-expand')(     // eslint-disable-line
      require('dotenv').config({  // eslint-disable-line
        path: dotEnvFile,
      }),
    );
  }
});
