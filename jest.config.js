/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    runner: 'groups',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
};
