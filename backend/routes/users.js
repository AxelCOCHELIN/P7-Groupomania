// Imports
const express = require("express");
const usersCtrl = require("../controllers/users");

// Router
exports.router = (() => {
  let usersRouter = express.Router();

  // Routes assignations
  usersRouter.route("/users/registration").post(usersCtrl.signup);
  usersRouter.route("/users/login").post(usersCtrl.login);
  usersRouter.route("/users/:id").get(usersCtrl.profile);
  usersRouter.route("/users/:id").put(usersCtrl.updateProfile);
  usersRouter.route("/users/:id").delete(usersCtrl.deleteProfile);
  usersRouter.route("/users/").get(usersCtrl.allUsers);

  return usersRouter;
})();
