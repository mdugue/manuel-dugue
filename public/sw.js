if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,n,c)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(n.map(s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}})).then(e=>{const s=c(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-cb91f0bc"],(function(e){"use strict";importScripts(),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/52229b62c9fbeb1742a08a9452ac8feb268f52db.ee1ac9bdd740227555d7.module.js",revision:"8ddb7529074422899f1c8113067be85c"},{url:"/_next/static/chunks/commons.932b6416e4aeb29c922e.module.js",revision:"e0151a3a473f3cfa802bdb4e4f7e38f9"},{url:"/_next/static/chunks/framework.bcf8cdd8e59ab469b5ac.module.js",revision:"82972ea3924a928cd982a3b207d3450e"},{url:"/_next/static/chunks/main-b6280940c0452755115d.module.js",revision:"da1a8dfa70f567c9eadafdd0625c9365"},{url:"/_next/static/chunks/pages/_app-16bbe8b12ae46d51bd72.module.js",revision:"6f552c8401b8b68323d7fee790f6e20f"},{url:"/_next/static/chunks/pages/_error-cec26e3fab68cc910b13.module.js",revision:"db33f850cb6bc1d43e08ca7381857f06"},{url:"/_next/static/chunks/pages/cv-3d869d363e27000c4d97.module.js",revision:"22b7084b0b646efbf3076b7ebbe3b309"},{url:"/_next/static/chunks/pages/index-8633943bdd2041eaccf5.module.js",revision:"d291f6d791ad7209492741f8a5b832a6"},{url:"/_next/static/chunks/pages/legal-33f228da9f63a1d6231d.module.js",revision:"70dc41a5952aea16dc27f69379141920"},{url:"/_next/static/chunks/pages/privacy-0596f5ebb235b0c9a14b.module.js",revision:"8248c62b0cc8b72132527965311090f8"},{url:"/_next/static/chunks/pages/skill-profile-aa7382031fb42694e6fc.module.js",revision:"48c41f08a80e1b30266dd4fe623203a0"},{url:"/_next/static/chunks/polyfills-a5b86a38e61b63f3b3a9.module.js",revision:"147d9fe6ff855fdf7b9309960f14cf97"},{url:"/_next/static/chunks/webpack-10c773dabc66ad7453ac.module.js",revision:"8c19f623e8389f11131a054a7e17ff95"},{url:"/_next/static/djKNa8PrOdxjhl5ifn5R4/_buildManifest.module.js",revision:"a3235d5a313d6eb0e0b16203faee57b3"},{url:"/_next/static/djKNa8PrOdxjhl5ifn5R4/_ssgManifest.module.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/android-chrome-192x192.png",revision:"419820048d802a4a00da2abe152afad3"},{url:"/android-chrome-512x512.png",revision:"1ed4daa04e1be065af3b840c116de591"},{url:"/apple-touch-icon.png",revision:"4e500ca484ae41cd3d3db3d4f99840e9"},{url:"/favicon-16x16.png",revision:"2fcd38289c4bd2518347359d98b4adc9"},{url:"/favicon-32x32.png",revision:"8619b85a4b2c90a81306b6855b604fd4"},{url:"/favicon.ico",revision:"99fcf6a8c660c20d97d72b648b575b12"},{url:"/manifest.webmanifest",revision:"dc0968becf1abf34b07007db461f7515"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.StaleWhileRevalidate({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
