module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start:next:cy",
      startServerReadyPattern: "ready on",
      url: ["http://localhost:8080/"]
    }
  }
};
