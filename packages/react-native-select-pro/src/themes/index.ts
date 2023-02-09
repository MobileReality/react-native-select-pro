import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';

export enum Themes {
    Light = 'Light',
    Dark = 'Dark',
    None = 'None',
}

export const themes = {
    [Themes.Light]: lightTheme,
    [Themes.Dark]: darkTheme,
    [Themes.None]: {},
};
