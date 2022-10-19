export enum ERRORS {
    NO_ARRAY_OPTIONS = 'You must pass array in the options prop',
    SCREEN_READER_ERROR = 'isScreenReaderEnabled error',
}

// eslint-disable-next-line no-console
export const logError = (error: ERRORS) => console.error(error);
