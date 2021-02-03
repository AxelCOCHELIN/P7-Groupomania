// Imports
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users").router;
const articlesRouter = require("./routes/articles").router;

// Instantiate server
const server = express();

// Body-parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Bienvenue sur mon server</h1>");
});

server.use("/api/", usersRouter);
server.use("/api/", articlesRouter);

// Launch server
server.listen(8080, () => {
  console.log(`Listening on localhost:8080`);
});
