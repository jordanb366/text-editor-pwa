const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

// Variable name
const pageCache = new CacheFirst({
  // Cache name "page cache"
  cacheName: "page-cache",
  plugins: [
    // Cache response time
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Expiration of the cache pluggin
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Completed: Implement asset caching
registerRoute(
  // Sends request for style, script, image, and worker, tags in the request to cache
  ({ request }) =>
    ["style", "script", "image", "worker"].includes(request.destination),
  new CacheFirst({
    // Cache name "asset cache"
    cacheName: "asset-cache",
    plugins: [
      // The response time for the cache
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
