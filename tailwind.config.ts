import { nextui } from '@nextui-org/react';
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { fontFamily, spacing } from 'tailwindcss/defaultTheme';

/**
 * @todo verify colors for categories
 */
import {
  app,
  paletteBrandBlue,
  paletteBrandCyan,
  paletteBrandGray,
  paletteBrandGreen,
  paletteBrandTeal,
} from './src/styles/colors.json';

const TOP_NAV_HEIGHT = '48px';
const SIDE_NAV_WIDTH = '264px';
const CHAT_MAX_WIDTH = '840px';

const convertPaletteToTailwind = (palette) => {
  const name = palette.name;
  const colors = palette.colors;

  return Object.entries(colors).reduce((acc, [key, color]) => {
    return {
      ...acc,
      [`${name}-${key}`]: color,
    };
  }, {});
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ds/**/*.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/atoms/**/*.{js,ts,jsx,tsx}',
    './src/svg/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...convertPaletteToTailwind(paletteBrandGray),
        ...convertPaletteToTailwind(paletteBrandBlue),
        ...convertPaletteToTailwind(paletteBrandGreen),
        ...convertPaletteToTailwind(paletteBrandCyan),
        ...convertPaletteToTailwind(paletteBrandTeal),
        'ring-active': 'app.colors.positive',
        'user-chat-message': paletteBrandBlue.colors[100],
        'chat-bar': paletteBrandBlue.colors[100],
        'brand-primary': app.colors['brand-primary'],
        'brand-primary-light': app.colors['brand-primary-light'],
        'logo-green': app.colors['logo-green'],
        'logo-teal': app.colors['logo-teal'],
        'text-primary-lightmode': paletteBrandGray.colors[1000],
        'text-secondary-lightmode': paletteBrandGray.colors[800],
        'text-inverted-lightmode': paletteBrandGray.colors[0],
        'text-label-lightmode': paletteBrandGray.colors[600],
        'text-primary-darkmode': paletteBrandGray.colors[0],
        'text-secondary-darkmode': paletteBrandGray.colors[200],
        'text-inverted-darkmode': paletteBrandGray.colors[1000],
        'text-label-darkmode': paletteBrandGray.colors[100],
        'bg-primary-lightmode': paletteBrandGray.colors[0],
        'bg-secondary-lightmode': paletteBrandGray.colors[25],
        'bg-tertiary-lightmode': paletteBrandGray.colors[200],
        'bg-inverted-lightmode': paletteBrandGray.colors[1000],
        'bg-input-lightmode': paletteBrandGray.colors[0],
        'bg-primary-darkmode': paletteBrandGray.colors[1000],
        'bg-secondary-darkmode': paletteBrandGray.colors[800],
        'bg-tertiary-darkmode': paletteBrandGray.colors[400],
        'bg-inverted-darkmode': paletteBrandGray.colors[0],
        'bg-input-darkmode': paletteBrandGray.colors[0],
        'interactive-hover': app.colors['brand-interactive-light'],
        'interactive-active': app.colors['brand-interactive-dark'],
        'accent-primary-lightmode': paletteBrandTeal.colors[800],
        'accent-secondary-lightmode': paletteBrandBlue.colors[600],
        'accent-tertiary-lightmode': paletteBrandCyan.colors[700],
        'accent-inverted-lightmode': paletteBrandTeal.colors[100],
        'accent-primary-darkmode': paletteBrandTeal.colors[100],
        'accent-secondary-darkmode': paletteBrandBlue.colors[200],
        'accent-tertiary-darkmode': paletteBrandCyan.colors[300],
        'accent-inverted-darkmode': paletteBrandTeal.colors[800],
        black: app.colors['black'],
        'true-black': app.colors['true-black'],
        white: app.colors['white'],
        positive: app.colors['positive'],
        negative: app.colors['negative'],
        warning: app.colors['warning'],
        'border-primary-lightmode': paletteBrandGray.colors[100],
        'border-primary-darkmode': paletteBrandGray.colors[800],
      },
      fontFamily: {
        body: ['Inter', ...fontFamily.sans],
        title: ['Poppins', 'Inter', ...fontFamily.sans],
      },
      boxShadow: {
        'chat-box': '0 2px 4px rgb(0 0 0 / 50%)',
        modal: '0px 0px 200px 40px rgba(161, 242, 247, 0.2)',
        notification: '0px 0px 100px 10px rgba(161, 242, 247, 0.2)',
        'brand-primary-glow': '0 0 20px 10px #00FDC8',
      },
      screens: {
        'lp-hero': '1600px',
      },
      spacing: {
        'top-nav': TOP_NAV_HEIGHT,
        'gutter-base': spacing[6],
        'chat-container-gutter': '1rem',
        'side-nav': SIDE_NAV_WIDTH,
      },
      maxWidth: {
        'chat-container': CHAT_MAX_WIDTH,
      },
      width: {
        'side-nav': SIDE_NAV_WIDTH,
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      gridTemplateColumns: {
        '10/80/10': '10% 80% 10%',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'orb-move': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(calc(100vw - 100%))' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'orb-move': 'orb-move 20s ease-in-out infinite',
      },
    },
  },
  plugins: [
    formsPlugin,
    typographyPlugin,
    nextui({
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
      themes: {
        dark: {
          colors: {
            // page background color
            background: {
              DEFAULT: paletteBrandGray.colors['1000'],
            },
            // page text color
            foreground: {
              DEFAULT: paletteBrandGray.colors['0'],
            },
            // // used for divider and single line border
            // divider: {},
            // modal, popover, etc.
            overlay: {
              DEFAULT: paletteBrandGray.colors['900'],
            },
            // // focus state outline
            // focus: {},
            // // contents - used for whatever you please (cards, modals, popovers, etc.)
            // content1: {},
            // content2: {},
            // content3: {},
            // content4: {},
            // primary brand color (accent)
            primary: app.colors['brand-primary'],
            // primary: '#7DF9FF',
            // primary: '#00e599',
            // primary: '#b249f8',

            // secondary accent color
            secondary: {
              50: paletteBrandCyan.colors['50'],
              100: paletteBrandCyan.colors['100'],
              200: paletteBrandCyan.colors['200'],
              300: paletteBrandCyan.colors['300'],
              400: paletteBrandCyan.colors['400'],
              500: paletteBrandCyan.colors['500'],
              600: paletteBrandCyan.colors['600'],
              700: paletteBrandCyan.colors['700'],
              800: paletteBrandCyan.colors['800'],
              900: paletteBrandCyan.colors['900'],
              DEFAULT: paletteBrandCyan.colors['600'],
            },
            success: {
              DEFAULT: app.colors.positive,
            },
            warning: {
              DEFAULT: app.colors.warning,
            },
            danger: {
              DEFAULT: app.colors.negative,
            },
          },
        },
        light: {
          colors: {
            // page background color
            background: {
              DEFAULT: paletteBrandGray.colors['100'],
            },
            // page text color
            foreground: {
              DEFAULT: paletteBrandGray.colors['1000'],
            },
            // // used for divider and single line border
            // divider: {},
            // modal, popover, etc.
            overlay: {
              DEFAULT: paletteBrandGray.colors['200'],
            },
            // // focus state outline
            // focus: {},
            // // contents - used for whatever you please (cards, modals, popovers, etc.)
            // content1: {},
            // content2: {},
            // content3: {},
            // content4: {},
            // primary brand color (accent)
            primary: {
              50: paletteBrandTeal.colors['50'],
              100: paletteBrandTeal.colors['100'],
              200: paletteBrandTeal.colors['200'],
              300: paletteBrandTeal.colors['300'],
              400: paletteBrandTeal.colors['400'],
              500: paletteBrandTeal.colors['500'],
              600: paletteBrandTeal.colors['600'],
              700: paletteBrandTeal.colors['700'],
              800: paletteBrandTeal.colors['800'],
              900: paletteBrandTeal.colors['900'],
              DEFAULT: paletteBrandTeal.colors['500'],
            },
            // secondary accent color
            secondary: {
              50: paletteBrandCyan.colors['50'],
              100: paletteBrandCyan.colors['100'],
              200: paletteBrandCyan.colors['200'],
              300: paletteBrandCyan.colors['300'],
              400: paletteBrandCyan.colors['400'],
              500: paletteBrandCyan.colors['500'],
              600: paletteBrandCyan.colors['600'],
              700: paletteBrandCyan.colors['700'],
              800: paletteBrandCyan.colors['800'],
              900: paletteBrandCyan.colors['900'],
              DEFAULT: paletteBrandCyan.colors['400'],
            },
            success: {
              DEFAULT: app.colors.positive,
            },
            warning: {
              DEFAULT: app.colors.warning,
            },
            danger: {
              DEFAULT: app.colors.negative,
            },
          },
        },
      },
    }),
    require('tailwindcss-animate'),
  ],
  safelist: [],
} satisfies Config;
