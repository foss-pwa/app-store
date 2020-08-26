/**
 * @type {Array<{from: string, to: string}>}
 */
export const fileMap = [
  {
    from: 'manifest.json',
    to: 'dist/manifest.json',
  },
  {
    from: 'categories.yml',
    to: 'dist/data/categories.json',
  },
  {
    from: 'sw/sw.js',
    to: 'sw.js',
  },
  {
    from: 'index.html',
    to: 'index.html',
  },
  {
    from: 'index.html',
    to: '404.html',
  },
  {
    from: 'assets',
    to: 'dist/assets',
  },
  {
    from: 'l10n/en.yml',
    to: 'dist/l10n/en.json',
  },
  {
    from: 'l10n/fa.yml',
    to: 'dist/l10n/fa.json',
  },
];
