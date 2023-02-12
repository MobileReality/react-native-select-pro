export enum ERRORS {
    NO_ARRAY_OPTIONS = 'Options is not an array',
    SCREEN_READER_ERROR = 'isScreenReaderEnabled error',
    SCROLL_TO_LOCATION = 'scrollToLocation error',
}

// eslint-disable-next-line no-console
export const logError = (error: ERRORS) => console.error(error);
