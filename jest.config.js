module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    modulePathIgnorePatterns: [
        '<rootDir>/packages/expo/node_modules',
        '<rootDir>/packages/e2e/node_modules',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileTransformer.js',
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    clearMocks: true,
};
