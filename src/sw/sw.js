/* eslint-disable no-restricted-globals */
/* eslint-disable toplevel/no-toplevel-side-effect */

console.log('salam');

const mode = 'prod';

const version = '1.0.0';
const mainCache = 'main-v1';
const assetCache = 'asset-v1';
const expectedCaches = [mainCache, assetCache];

const addToCache = (cn, request, response) => caches.open(cn)
  .then(cache => cache.put(request, response));

self.addEventListener('install', async (event) => {
  event.waitUntil((async () => {
    try {
      await (await caches.open(mainCache)).addAll(['/', '/dist/bundle.js']);
      await (await caches.open(assetCache)).addAll([
        '/dist/manifest.json',
      ]);
      await self.skipWaiting();
    } catch (e) {
      console.log(e);
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
    event.respondWith(
      fetch(event.request),
    );
  } else if (url.pathname.startsWith('/dist/')) {
    if (url.pathname.startsWith('/dist/data')) {
      event.respondWith(
        fetch(event.request),
      );
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
