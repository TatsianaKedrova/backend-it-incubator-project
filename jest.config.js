/** @type {import('ts-jest').JestConfigWithTsJest} */
console.log(module.exports)
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 100000,
  testRegex: '.e2e.tests.ts$'
};