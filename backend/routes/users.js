// Imports
const express = require("express");
const usersCtrl = require("../controllers/users");

// Router
exports.router = (() => {
  let usersRouter = express.Router();

  // Routes assignations
  usersRouter.route("/users/signup/").post(usersCtrl.signup);
  usersRouter.route("/users/login/").post(usersCtrl.login);
  usersRouter.route("/users/profile/").get(usersCtrl.profile);
  usersRouter.route("/users/profile/").put(usersCtrl.updateProfile);
  usersRouter.route("/users/profile/").delete(usersCtrl.deleteProfile);
  usersRouter.route("/users/all/").get(usersCtrl.allUsers);

  return usersRouter;
})();
