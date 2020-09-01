module.exports = {
  ci: {
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "color-contrast": "off",
        "uses-http2": "off"
      }
    },
    collect: {
      startServerCommand: "npm run start",
      startServerReadyPattern: "ready on",
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/cv",
        "http://localhost:3000/skill-profile"
      ]
    }
  }
};
