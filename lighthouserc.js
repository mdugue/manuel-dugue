module.exports = {
  ci: {
    assert: {
      preset: "lighthouse:recommended"
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
