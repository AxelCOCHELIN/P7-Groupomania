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
            isAdmin: 0,
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

    //to verify email regex, password lenght.

    models.User.findOne({
      where: { email: email },
    })
      .then((userFound) => {
        if (userFound) {
          bcrypt.compare(
            password,
            userFound.password,
            (errBcrypt, resBcrypt) => {
              if (resBcrypt) {
                return res.status(200).json({
                  userId: userFound.id,
                  token: jwtUtils.generateTokenForUser(userFound),
                });
              } else {
                return res.status(403).json({ error: "invalid password" });
              }
            }
          );
        } else {
          return res
            .status(404)
            .json({ error: "user does not exist in the database" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: "unable to verify user" });
      });
  },
};
