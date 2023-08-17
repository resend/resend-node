module.exports = {
  clearMocks: true,
  resetMocks: false,
  restoreMocks: true,
  automock: false,
  verbose: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  prettierPath: require.resolve('prettier-2'),
  setupFiles: ['./jest.setup.js'],
};
