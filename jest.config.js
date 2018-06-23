module.exports = {
  setupFiles: ['<rootDir>/tests/setup.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
};
