module.exports = {
  bail: true,
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**', '!src/server.ts', '!src/db/**'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/app/interfaces/$1',
    '^@service/(.*)$': '<rootDir>/src/app/service/$1',
  },
  coverageReporters: ['json-summary', 'text', 'lcov']
};
