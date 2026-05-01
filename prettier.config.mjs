/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 *
 * Every possible prettier option is explicitly defined here for stability on updates.
 * The options available in `.editorconfig` are just commented for visibility.
 */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  experimentalTernaries: false,
  experimentalOperatorPosition: 'end',
  // printWidth: (max_line_length in .editorconfig)
  // tabWidth: (indent_size in .editorconfig)
  // useTabs: (indent_style in .editorconfig)
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  objectWrap: 'preserve',
  bracketSameLine: false,
  arrowParens: 'always',
  rangeStart: 0,
  rangeEnd: Infinity,
  // endOfLine: (end_of_line in .editorconfig)
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,

  // import order-related rules
  importOrder: [
    // 1. Node built-in modules
    '<BUILTIN_MODULES>',
    // 2. Third-party modules
    '<THIRD_PARTY_MODULES>',
    // 3. Internal modules (aliases like @/ or @something/) other than @/assets
    '^@/(?!assets)',
    // 4. Relative imports
    '^[./](?!.*\\.(css|scss|svg|webp|jpg|jpeg|png|otf|ttf|gif)$)',
    // 5. Styles and assets
    '\\.(css|scss|svg|webp|jpg|jpeg|png|otf|ttf|gif)$',
    '^@/assets',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderGroupNamespaceSpecifiers: true,
};

export default config;
