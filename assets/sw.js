importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {


  workbox.setConfig({ debug: false });
  console.log(`Yay! Workbox is loaded 🎉`);
  const precacheCacheName = workbox.core.cacheNames.precache;
  const runtimeCacheName = workbox.core.cacheNames.runtime;

  var networkFirstHandler = workbox.strategies.networkFirst({
    cacheName: 'default',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [200]
      })
    ]
  });

  const matcher = ({event}) => event.request.mode === 'navigate';
  const handler = (args) => networkFirstHandler.handle(args).then((response) => (!response) ? caches.match('/offline') : response);

  workbox.routing.registerRoute(matcher, handler);


  workbox.core.setCacheNameDetails({
    prefix: 'arrow',
    suffix: 'v1',
    precache: precacheCacheName,
    runtime: runtimeCacheName
  });

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

// Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );
  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
