import type { SelectStyles } from '../types';

import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';

export type Themes = 'light' | 'dark' | 'none';

export const themes: Record<Themes, SelectStyles> = {
    light: lightTheme,
    dark: darkTheme,
    none: {},
};
