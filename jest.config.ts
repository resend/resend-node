import { JestConfigWithTsJest } from 'ts-jest/';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  prettierPath: null,
};

export default config;
