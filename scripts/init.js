const fs = require('fs-extra');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const ini = require('ini');
const path = require('path');

const paths = require('../config/paths');
const install = require('./utils/install');

let scripts = {};
const dependencies = [];
const devDependencies = [];

function initPackageJSON() {
  const appPackage = require(paths.appPackageJSON); //eslint-disable-line

  appPackage.scripts = scripts;

  fs.writeFileSync(
    paths.appPackageJSON,
    JSON.stringify(appPackage, null, 2),
  );
}

function checkAwsCli() {
  if (!spawn.sync('aws', ['--version'], { stdio: 'ignore' })) {
    console.log('AWS CLI is not installed, please installit and execute init again');
    process.exit(1);
  }
}

function gitInit() {
  // Check if git is installed
  if (!spawn.sync('git', ['--version'], { stdio: 'ignore' })) {
    console.log('Git is not installed.');
    console.log('If you want to initialize git version control you have to install it');
    process.exit(1);
  }
  // Checking if the project is in exsiting repo
  if (fs.existsSync(path.resolve(paths.appFolder, '.git'))) {
    console.log('   We have detected git had been initialized before');
    console.log('   We are going to skip this step');
    return;
  }
  console.info('Initializating git repository ...');
  spawn.sync('git', ['init'], { stdio: 'ignore' });
}

function gitFlowInit() {
  // Check if git flow is installed
  if (!spawn.sync('git', ['flow', '--version'], { stdio: 'ignore' })) {
    console.log('Git Flow is not installed.');
    console.log('If you want to initialize git flow branching strategy you have to install it');
    process.exit(1);
  }
  // Checking if the project is in exsiting git flow branching strategy
  if (fs.existsSync(path.resolve(paths.appFolder, '.git'))) {
    const config = ini.parse(fs.readFileSync(path.resolve(paths.appFolder, '.git/config'), 'utf-8'));
    if (config['gitflow "prefix"']) {
      console.log();
      console.log('   We have detected Git Flow had been initializez before');
      console.log('   We are going to skip this step');
      return;
    }
  }
  console.info('Initializating Git Flow Branching Strategy ...');
  spawn.sync('git', ['flow', 'init', '-fd'], { stdio: 'ignore' });
}

function versionControl() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'git',
        message: 'Would you like to initialize git version control?',
      },
      {
        type: 'confirm',
        name: 'gitflow',
        message: 'Would you like git flow branching strategy?',
      },
    ])
    .then((answers) => {
      if (answers.git) {
        gitInit();
      }
      if (answers.gitflow) {
        gitFlowInit();
      }
    })
    // eslint-disable-next-line no-use-before-define
    .then(() => provider());
}

function installPackages() {
  initPackageJSON();
  console.log('\nInstalling necessary packages. This might take a couple of minutes .....');
  console.log();
  install(dependencies, 'save');
  install(devDependencies, 'dev');
}

const copyTemplate = (templateName) => {
  fs.copySync(path.resolve(paths.appNodeModules, `apollo-server-scripts/template/${templateName}`), paths.appFolder);
};

function aws() {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'configuration',
        message: 'Select the configuration you want to',
        choices: [
          'serverless',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.configuration) {
        case 'serverless':
          checkAwsCli();
          dependencies.push(
            'apollo-server-lambda',
            'apollo-server-express',
            'graphql',
            'apollo-errors',
            'merge-graphql-schemas',
            '@babel/runtime',
          );
          devDependencies.push(
            'serverless',
            'serverless-offline',
            'webpack',
            'serverless-webpack',
            'babel-loader',
            '@babel/cli',
            '@babel/core',
            '@babel/plugin-transform-runtime',
            '@babel/preset-env',
            'serverless-dotenv-plugin',
            'webpack-node-externals',
            'eslint',
            'eslint-config-airbnb-base',
            'eslint-plugin-import',
            'eslint-plugin-jest',
            'jest',
            'babel-jest',
          );
          scripts = {
            start: 'apollo-scripts start',
            deploy: 'apollo-scripts deploy',
            test: 'apollo-scripts test',
          };
          installPackages();
          copyTemplate(`aws/${answers.configuration}`);
          break;
        default:
          break;
      }
    });
}

function provider() {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'provider',
        message: 'Choose the provider this app is configured for',
        choices: [
          'AWS',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.provider) {
        case 'AWS':
          aws();
          break;
        default:
          break;
      }
    });
}

function project() {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        name: 'project',
        message: 'Please, choose an option',
        choices: [
          'New Project',
          'Existing Project',
          'default',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.project) {
        case 'New Project':
          versionControl();
          break;
        case 'Existing Project':
          // TODO:
          break;
        case 'default':
          dependencies.push(
            'express',
            'apollo-server-express',
            'graphql',
            'apollo-errors',
            'merge-graphql-schemas',
            '@babel/polyfill',
            '@babel/register',
            '@babel/runtime',
          );
          devDependencies.push(
            '@babel/cli',
            '@babel/core',
            '@babel/plugin-transform-runtime',
            '@babel/preset-env',
            '@babel/node',
            'eslint',
            'eslint-config-airbnb-base',
            'eslint-plugin-import',
            'eslint-plugin-jest',
            'jest',
            'babel-jest',
          );
          scripts = {
            start: 'apollo-scripts start',
            build: 'apollo-scripts build',
            test: 'apollo-scripts test',
          };
          installPackages();
          copyTemplate(`${answers.project}`);
          break;
        default:
          break;
      }
    });
}

function main() {
  console.log('\nInitializating GraphQL Apollo Server Project ...\n');
  project();
}

main();
