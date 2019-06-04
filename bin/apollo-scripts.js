#!/usr/bin/env node

const spawn = require('cross-spawn');

// pick the arguments
const script = process.argv[2];

switch (script) {
  case 'build': {
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)],
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  }
  case 'start': {
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)],
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  }
  case 'deploy': {
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)],
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  }
  case 'test': {
    const args = process.argv.slice(3);
    const nodeArgs = [];
    nodeArgs
      .push(require.resolve(`../scripts/${script}`));
    const arg = nodeArgs.concat(args);
    const result = spawn.sync(
      'node',
      arg,
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  }
  case 'init': {
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)],
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  }
  case 'serve': {
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)],
      { stdio: 'inherit' },
    );
    process.exit(result.status);
    break;
  }
  default:
    console.log(`The script "${script}" is not available`);
    break;
}
