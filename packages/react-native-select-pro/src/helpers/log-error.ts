export enum ERRORS {
    NO_ARRAY_OPTIONS = 'You must pass array in the options prop',
}

// eslint-disable-next-line no-console
export const logError = (error: ERRORS) => console.error(error);
