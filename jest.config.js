module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**'],
    moduleNameMapper: {
        '^../src/(.*)$': '<rootDir>/src/$1',  // Make sure Jest resolves the 'src' alias
      },
  };
  