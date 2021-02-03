// Imports
const express = require("express");
const usersCtrl = require("../controllers/users");

// Router
exports.router = (() => {
  let apiRouter = express.Router();

  // Routes assignations
  apiRouter.route("/users/signup/").post(usersCtrl.signup);
  apiRouter.route("/users/login/").post(usersCtrl.login);
  apiRouter.route("/users/profile/").get(usersCtrl.profile);

  return apiRouter;
})();
