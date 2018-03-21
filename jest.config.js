const config = require('@toba/test/jest');

config.setupFiles = null;
config.collectCoverageFrom = ['generators/src/app.ts'];
config.globals = {
   'ts-jest': {
      tsConfigFile: 'tsconfig.test.json'
   }
};

module.exports = config;
