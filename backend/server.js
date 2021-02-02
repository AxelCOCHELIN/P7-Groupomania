// Imports
const express = require("express");

// Instantiate server
const server = express();

// Configure routes
server.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Bienvenue sur mon server</h1>");
});

// Launch server
server.listen(8080, () => {
  console.log(`Listening on localhost:8080`);
});
