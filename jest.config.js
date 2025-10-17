/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["<rootDir>/src/__tests__"],
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    verbose: true,
  };
  