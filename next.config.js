const withPWA = require("next-pwa");

// change start-url cache strategy, so that we can prompt user to reload when
// new version available, instead of showing new version directly
const runtimeCaching = require("next-pwa/cache");
runtimeCaching[0].handler = "StaleWhileRevalidate";

module.exports = withPWA({
  poweredByHeader: false,
  experimental: {
    optimizeFonts: true,
    reactMode: "concurrent",
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: false,
    skipWaiting: false,
    runtimeCaching,
  },
});
