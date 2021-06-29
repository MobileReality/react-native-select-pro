module.exports = {
    preset: 'react-native',
    modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
