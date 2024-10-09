const pluginSortImports = require('@trivago/prettier-plugin-sort-imports');
const pluginTailwindcss = require('prettier-plugin-tailwindcss');

/** @type {import("prettier").Parser}  */
const myParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
};

/** @type {import("prettier").Plugin}  */
const myPlugin = {
  parsers: {
    typescript: myParser,
  },
};

module.exports = {
  plugins: [myPlugin],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^constants/(.*)$',
    '^types/(.*)$',
    '^gql/(.*)$',
    '^services/(.*)$',
    '^utils/(.*)$',
    '^context/(.*)$',
    '^hooks/(.*)$',
    '^svg/(.*)$',
    '^screens/(.*)$',
    '^layouts/(.*)$',
    '^atoms/(.*)$',
    '^components/(.*)$',
    '^styles/(.*)$',
    '^./(.*)$',
    '^[./]',
    '^[../]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
