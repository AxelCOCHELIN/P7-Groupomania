// Imports
let bcrypt = require("bcrypt");
let jwtUtils = require("../utils/jwt.utils");
let models = require("../models");
let asyncLib = require("async");

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

//Controllers
module.exports = {
  signup: (req, res) => {
    // Parameters
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let image = req.body.image;
    let isAdmin = "";

    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    if (username.length >= 21 || username.length <= 2) {
      return res
        .status(400)
        .json({ error: "wrong username (must be length 3 - 20)" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "email is not valid" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "password not valid (must lenght 4 - 8 and include 1 number and 1 uppercase",
      });
    }

    if (req.body.email === "iamtheadmin@groupomania.com") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    asyncLib.waterfall(
      [
        (done) => {
          models.User.findOne({
            attributes: ["email"],
            where: { email: email },
          })
            .then((userFound) => {
              done(null, userFound);
            })
            .catch((err) => {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        (userFound, done) => {
          if (!userFound) {
            bcrypt.hash(password, 5, (err, bcryptedPassword) => {
              done(null, userFound, bcryptedPassword);
            });
          } else {
            return res.status(409).json({ error: "user already exist" });
          }
        },
        (userFound, bcryptedPassword, done) => {
          let newUser = models.User.create({
            email: email,
            password: bcryptedPassword,
            username: username,
            image: image,
            isAdmin: isAdmin,
          })
            .then((newUser) => {
              done(newUser);
            })
            .catch((err) => {
              return res.status(500).json({ error: "cannot add user" });
            });
        },
      ],
      (newUser) => {
        if (newUser) {
          return res.status(201).json({
            userId: newUser.id,
          });
        } else {
          return res.status(500).json({ error: "cannot add user" });
        }
      }
    );
  },

  login: (req, res) => {
    // Parameters
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    asyncLib.waterfall(
      [
        (done) => {
          models.User.findOne({
            where: { email: email },
          })
            .then((userFound) => {
              done(null, userFound);
            })
            .catch((err) => {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        (userFound, done) => {
          if (userFound) {
            bcrypt.compare(
              password,
              userFound.password,
              (errBcrypt, resBcrypt) => {
                done(null, userFound, resBcrypt);
              }
            );
          } else {
            return res
              .status(404)
              .json({ error: "user does not exist in the database" });
          }
        },
        (userFound, resBcrypt, done) => {
          if (resBcrypt) {
            done(userFound);
          } else {
            return res.status(403).json({ error: "invalid password" });
          }
        },
      ],
      (userFound) => {
        if (userFound) {
          return res.status(201).json({
            userId: userFound.id,
            token: jwtUtils.generateTokenForUser(userFound),
          });
        } else {
          return res.status(500).json({ error: "cannot log on user" });
        }
      }
    );
  },
  profile: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    models.User.findOne({
      attributes: ["id", "email", "username", "image", "isAdmin"],
      where: { id: userId },
    })
      .then(function (user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ error: "user not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "cannot fetch user" });
      });
  },
  updateProfile: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: "wrong token" });
    // Parameters
    let image = req.body.image;
    let username = req.body.username;

    asyncLib.waterfall(
      [
        (done) => {
          models.User.findOne({
            attributes: ["id", "image", "username"],
            where: { id: userId },
          })
            .then((userFound) => {
              done(null, userFound);
            })
            .catch((err) => {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        (userFound, done) => {
          if (userFound) {
            userFound
              .update({
                image: image ? image : userFound.image,
                username: username ? username : userFound.username,
              })
              .then(() => {
                done(userFound);
              })
              .catch((err) => {
                res.status(500).json({ error: "cannot update user" });
              });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      (userFound) => {
        if (userFound) {
          return res.status(201).json(userFound);
        } else {
          return res.status(500).json({ error: "cannot update user profile" });
        }
      }
    );
  },
  deleteProfile: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    asyncLib.waterfall(
      [
        (done) => {
          models.User.findOne({
            attributes: ["id"],
            where: { id: userId },
          })
            .then((userFound) => {
              done(null, userFound);
            })
            .catch((err) => {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        (userFound, done) => {
          if (userFound) {
            userFound
              .destroy({
                where: { id: userId },
              })
              .then(() => {
                done(userFound);
              })
              .catch((err) => {
                res.status(500).json({ error: "cannot delete user" });
              });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      (userFound) => {
        if (userFound) {
          return res
            .status(201)
            .json({ message: "user has been successfully deleted" });
        } else {
          return res.status(500).json({ error: "cannot delete user profile" });
        }
      }
    );
  },
  allUsers: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    models.User.findAll({
      attributes: ["id", "email", "username", "image", "isAdmin"],
    })
      .then(function (users) {
        if (users) {
          res.status(201).json(users);
        } else {
          res.status(404).json({ error: "users not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "cannot fetch users" });
      });
  },
};
