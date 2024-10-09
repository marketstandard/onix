import defaultColors from 'tailwindcss/colors';
import colors from 'styles/colors.json';

export const themeLight = {
  colors: {
    primary: '#0070f3',
    secondary: '#0070f3',
    ...colors.paletteBrandBlue,
  },
};
export const themeDark = {
  colors: {
    primary: '#0070f3',
    secondary: '#0070f3',
  },
};

export enum ThemeNames {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export const themeMap = {
  [ThemeNames.Light]: themeLight,
  [ThemeNames.Dark]: themeDark,
};
