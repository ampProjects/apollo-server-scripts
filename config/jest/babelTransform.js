const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [require.resolve('@babel/preset-env')],
  plugins: [require.resolve('@babel/plugin-transform-runtime')],
  babelrc: false,
  configFile: false,
});
