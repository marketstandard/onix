// NOTE: Inspired by tailwind
const SMALL_BREAK = 639;
const MOBILE_MAX = 767;
const TABLET_MAX = 1023;
export const LARGE_BREAK = 1496;

const MEDIA_PREFIX = '@media only screen and';

const belowWidth = (width: number) => `${MEDIA_PREFIX} (max-width: ${width}px)`;

const aboveWidth = (width: number) => `${MEDIA_PREFIX} (min-width: ${width}px)`;

export const xs = (above = false) =>
  above ? aboveWidth(SMALL_BREAK + 1) : belowWidth(SMALL_BREAK);

export const mobile = (above = false) =>
  above ? aboveWidth(MOBILE_MAX + 1) : belowWidth(MOBILE_MAX);

export const tablet = (above = false) =>
  above ? aboveWidth(TABLET_MAX + 1) : belowWidth(TABLET_MAX);

export const desktop = () => aboveWidth(TABLET_MAX + 1);

export const xl = (below = false) =>
  below ? belowWidth(LARGE_BREAK - 1) : aboveWidth(LARGE_BREAK);
