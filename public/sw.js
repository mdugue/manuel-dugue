if (!self.define) {
  const e = (e) => {
      e !== 'require' && (e += '.js');
      let s = Promise.resolve();
      return (
        a[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const a = document.createElement('script');
              (a.src = e), document.head.appendChild(a), (a.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`);
          return a[e];
        })
      );
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then((e) => a(e.length === 1 ? e[0] : e));
    },
    a = { require: Promise.resolve(s) };
  self.define = (s, c, n) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        const a = {};
        const r = { uri: location.origin + s.slice(1) };
        return Promise.all(
          c.map((s) => {
            switch (s) {
              case 'exports':
                return a;
              case 'module':
                return r;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = n(...e);
          return a.default || (a.default = s), a;
        });
      }));
  };
}
define('./sw.js', ['./workbox-234fc267'], (e) => {
  importScripts(),
    self.addEventListener('message', (e) => {
      e.data && e.data.type === 'SKIP_WAITING' && self.skipWaiting();
    }),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/11.c110f9e2995de7d0995b.module.js',
          revision: 'aa0f2373dffb21e65fbf8717ad6488d5',
        },
        {
          url: '/_next/static/chunks/a15d30f70a0e39eb9fe13c9daa04dcc4144eadb3.200b919dd4cee9f11c18.module.js',
          revision: 'cbd0af91c965f6d9e1ae9054ec9bbc35',
        },
        {
          url: '/_next/static/chunks/commons.15ac2e52b6f80e32b66f.module.js',
          revision: 'ea7b4dc23b0c6b722967d4664804d521',
        },
        {
          url: '/_next/static/chunks/framework.24a81770932411e555ee.module.js',
          revision: '95f18da66d152c92e61de9fec8844343',
        },
        {
          url: '/_next/static/chunks/main-f391b3f88235ca43ba34.module.js',
          revision: 'b1eb24ad742c3e52fe0232c7808a4844',
        },
        {
          url: '/_next/static/chunks/pages/%5B[...index%5D%5D-f12fbabcb776b7f71b34.module.js',
          revision: '69be8f8d62f1cbbb3c07b4d545a6f7ef',
        },
        {
          url: '/_next/static/chunks/pages/_app-827c9dfcb7387c104434.module.js',
          revision: '9992f444c24fd02cc8a90b0b6b8fe349',
        },
        {
          url: '/_next/static/chunks/pages/_error-61c87a3c1fc82d078807.module.js',
          revision: '43b57efa878b9d8017e2d98bbdd4529f',
        },
        {
          url: '/_next/static/chunks/pages/legal-98c597e2b22421d3eac6.module.js',
          revision: '4398aee5106c576e9c68472ea69d5bf3',
        },
        {
          url: '/_next/static/chunks/pages/privacy-62c7ae8a6affc38ea200.module.js',
          revision: '931a858522bcbc3cd49193bc84619dd2',
        },
        {
          url: '/_next/static/chunks/polyfills-bdcbb1f8fb342f6d0691.module.js',
          revision: '467997cb5d80cf91f0587a58502fd47d',
        },
        {
          url: '/_next/static/chunks/webpack-2027dd35abb5fd0dca6e.module.js',
          revision: 'e986547ead5edf7dcab61bbd47ecade8',
        },
        {
          url: '/_next/static/uaFVPzSHZbwDLPi5Vgvql/_buildManifest.module.js',
          revision: 'db941776c87ed62de15a0e0d3baafd8c',
        },
        {
          url: '/_next/static/uaFVPzSHZbwDLPi5Vgvql/_ssgManifest.module.js',
          revision: 'abee47769bf307639ace4945f9cfd4ff',
        },
        {
          url: '/android-chrome-192x192.png',
          revision: '419820048d802a4a00da2abe152afad3',
        },
        {
          url: '/android-chrome-512x512.png',
          revision: '1ed4daa04e1be065af3b840c116de591',
        },
        {
          url: '/apple-touch-icon.png',
          revision: '4e500ca484ae41cd3d3db3d4f99840e9',
        },
        {
          url: '/favicon-16x16.png',
          revision: '2fcd38289c4bd2518347359d98b4adc9',
        },
        {
          url: '/favicon-32x32.png',
          revision: '8619b85a4b2c90a81306b6855b604fd4',
        },
        { url: '/favicon.ico', revision: '99fcf6a8c660c20d97d72b648b575b12' },
        {
          url: '/manifest.webmanifest',
          revision: 'dc0968becf1abf34b07007db461f7515',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.StaleWhileRevalidate({
        cacheName: 'start-url',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31_536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604_800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86_400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    );
});
