/* eslint-disable no-restricted-globals */
/* eslint-disable toplevel/no-toplevel-side-effect */

console.log('salam');

const mode = 'prod';

const version = '1.0.3';
const mainCache = 'main-v2';
const assetCache = 'asset-v3';
const expectedCaches = [mainCache, assetCache];

const addToCache = (cn, request, response) => caches.open(cn)
  .then(cache => cache.put(request, response));

self.addEventListener('install', async (event) => {
  event.waitUntil((async () => {
    try {
      await (await caches.open(mainCache)).addAll(['/', '/dist/bundle.js']);
      await (await caches.open(assetCache)).addAll([
        '/dist/manifest.json',
        '/dist/assets/danger1.svg',
        '/dist/assets/error_reload1.svg',
        '/dist/assets/error1.svg',
        '/dist/assets/category/dev.png',
        '/dist/assets/category/game.png',
        '/dist/assets/category/music.png',
        '/dist/assets/category/social.png',
        '/dist/assets/category/tool.png',
      ]);
      await self.skipWaiting();
    } catch (e) {
      console.error(e);
      throw e;
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cs = await self.clients.matchAll({
      type: 'window',
    });
    if (cs.length > 0) {
      cs[0].postMessage({
        type: 'activated',
        version,
      });
    }
    const keys = await caches.keys();
    await Promise.all(
      keys.map(async (key) => {
        if (!expectedCaches.includes(key)) {
          await caches.delete(key);
        }
      }),
    );
  })());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (mode === 'dev') {
    return;
  } else if (url.origin !== location.origin) {
    return;
  } else if (url.pathname.startsWith('/dist/')) {
    if (url.pathname.startsWith('/dist/data')) {
      return;
    } else if (url.pathname.startsWith('/dist/l10n')) {
      return;
    } else {
      event.respondWith(
        caches.match(event.request),
      );
    }
  } else {
    event.respondWith(
      caches.match('/'),
    );
  }
});
