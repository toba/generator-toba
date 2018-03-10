const config = require('@toba/test/jest');

config.setupFiles = null;
config.collectCoverageFrom = ['generators/app/app.ts'];

module.exports = config;
