if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,c,n)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(c.map(s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}})).then(e=>{const s=n(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-cb91f0bc"],(function(e){"use strict";importScripts(),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Cg9hP8pXr21JDNXeeBKXB/_buildManifest.module.js",revision:"1138a6c603dac43161150581f1d7a8cf"},{url:"/_next/static/Cg9hP8pXr21JDNXeeBKXB/_ssgManifest.module.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/52229b62c9fbeb1742a08a9452ac8feb268f52db.48836f6dc54c522d836c.module.js",revision:"24d0b7894de7ce6e729d3f589d986903"},{url:"/_next/static/chunks/commons.2367fa99dac74c0fb693.module.js",revision:"eeab67e5e304c51e168b5a687998d536"},{url:"/_next/static/chunks/framework.639a4c6d2372edf94622.module.js",revision:"1c8c47501f8a83e7cbef6220665aa75a"},{url:"/_next/static/chunks/main-dfae6f7f6adbb0337314.module.js",revision:"f2c568f10b8411d3b229774c8d0faa88"},{url:"/_next/static/chunks/pages/_app-34903ea2964fe64ca62b.module.js",revision:"6f552c8401b8b68323d7fee790f6e20f"},{url:"/_next/static/chunks/pages/_error-3c390084cf74ec6378c5.module.js",revision:"db33f850cb6bc1d43e08ca7381857f06"},{url:"/_next/static/chunks/pages/cv-d80ce74138cdecd9b180.module.js",revision:"59d2ae6d398dcf7a65369815c9d545ce"},{url:"/_next/static/chunks/pages/index-5b313995458822c29380.module.js",revision:"d291f6d791ad7209492741f8a5b832a6"},{url:"/_next/static/chunks/pages/legal-5c33a8ced1a7b8d60687.module.js",revision:"06fbc2517d39a144733828a30a3e8866"},{url:"/_next/static/chunks/pages/privacy-d91b8c77e0c1812e6f17.module.js",revision:"bca920cd064723ee330fc0ff03e30bd4"},{url:"/_next/static/chunks/pages/skill-profile-3ab7379589087cd1d278.module.js",revision:"4723a8a4b4b8d60b2e5e4b6743261eae"},{url:"/_next/static/chunks/polyfills-ddcc847e43635f820aed.module.js",revision:"c3f058b7c427b2b36a2675a48aaf0b3d"},{url:"/_next/static/chunks/webpack-4f62264144580cc42db7.module.js",revision:"8c19f623e8389f11131a054a7e17ff95"},{url:"/android-chrome-192x192.png",revision:"419820048d802a4a00da2abe152afad3"},{url:"/android-chrome-512x512.png",revision:"1ed4daa04e1be065af3b840c116de591"},{url:"/apple-touch-icon.png",revision:"4e500ca484ae41cd3d3db3d4f99840e9"},{url:"/favicon-16x16.png",revision:"2fcd38289c4bd2518347359d98b4adc9"},{url:"/favicon-32x32.png",revision:"8619b85a4b2c90a81306b6855b604fd4"},{url:"/favicon.ico",revision:"99fcf6a8c660c20d97d72b648b575b12"},{url:"/manifest.webmanifest",revision:"dc0968becf1abf34b07007db461f7515"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.StaleWhileRevalidate({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
