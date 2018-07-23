module.exports = {
  setupFiles: ['<rootDir>/tests/setup.js'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  roots: ['<rootDir>/src'],
  testRegex: '^.*.test.(t|j)s$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
