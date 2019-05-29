const spawn = require('cross-spawn');

module.exports = function install(
  dependecies,
  installType,
) {
  const command = 'npm';

  const argsDependecies = [
    'install',
    '--no-progress',
    '--loglevel error',
  ].concat(dependecies);

  if (installType === 'save') {
    argsDependecies.push('--save');
    argsDependecies.push('--save-exact');
  }
  if (installType === 'dev') {
    argsDependecies.push('--save-dev');
  }

  spawn.sync(
    command,
    argsDependecies,
    {
      stdio: 'ignore',
      windowsHide: true,
    },
  );

  /*  dependecies.forEach(async (dep) => {
    console.log(` * ${dep}`);
    const argsDependecies = [
      'install',
      '--no-progress',
      '--loglevel error',
    ].concat(dep);

    if (installType === 'save') {
      argsDependecies.push('--save');
      argsDependecies.push('--save-exact');
    }
    if (installType === 'dev') {
      argsDependecies.push('--save-dev');
    }

    spawn.sync(
      command,
      argsDependecies,
      {
        stdio: 'ignore',
        windowsHide: true,
      },
    );
  }); */
};
