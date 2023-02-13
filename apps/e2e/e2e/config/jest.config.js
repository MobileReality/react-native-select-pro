module.exports = {
    maxWorkers: 1,
    rootDir: '../..',
    setupFilesAfterEnv: ['<rootDir>/e2e/config/setup.ts'],
    testRunner: 'jest-circus/runner',
    testTimeout: 120000,
    testMatch: ['<rootDir>/e2e/*.e2e.js'],
    transform: {
        '\\.tsx?$': 'ts-jest',
    },
    reporters: ['detox/runners/jest/reporter'],
    verbose: true,
    reporters: ['detox/runners/jest/reporter'],
    globalSetup: 'detox/runners/jest/globalSetup',
    globalTeardown: 'detox/runners/jest/globalTeardown',
    testEnvironment: 'detox/runners/jest/testEnvironment',
};
