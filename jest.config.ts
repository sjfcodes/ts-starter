import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  runner: 'groups',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
};
export default config;
