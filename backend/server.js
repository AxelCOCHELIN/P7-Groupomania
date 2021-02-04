// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const usersRouter = require("./routes/users").router;
const articlesRouter = require("./routes/articles").router;

const helmet = require("helmet");

// Instantiate server
const server = express();

// Server protection
server.use(helmet());
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Body-parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Bienvenue sur mon server</h1>");
});
server.use("/images", express.static(path.join(__dirname, "images")));

server.use("/api/", usersRouter);
server.use("/api/", articlesRouter);

// Launch server
server.listen(8080, () => {
  console.log(`Listening on localhost:8080`);
});
