const {compilerOptions} = require('./tsconfig');

module.exports = {

  preset: 'jest-preset-angular',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)', '**/+(*.)+(test).+(ts|js)'],
  setupFiles: ['<rootDir>/.jest/register-context.js'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: false,
  coverageReporters: ['html', 'json', 'lcovonly'],
  coverageDirectory: 'coverage/testapp',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    'jest-preset-angular/(.*)': '<rootDir>/node_modules/jest-preset-angular/build/$1'
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/build/",
    "/storybook-static/"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)',
  ],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', '.html'],
};
