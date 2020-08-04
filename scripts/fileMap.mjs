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
];
