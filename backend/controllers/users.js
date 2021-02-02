// Imports
let bcrypt = require("bcrypt");
let jwtUtils = require("../utils/jwt.utils");
let models = require("../models");

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

    //to verify pseudo lenght, email regex, password...

    models.User.findOne({
      attributes: ["email"],
      where: { email: email },
    })
      .then((userFound) => {
        if (!userFound) {
          bcrypt.hash(password, 5, (err, bcryptedPassword) => {
            let newUser = models.User.create({
              email: email,
              password: bcryptedPassword,
              username: username,
              image: image,
              isAdmin: 0,
            })
              .then((newUser) => {
                return res.status(201).json({
                  userId: newUser.id,
                });
              })
              .catch((err) => {
                return res.status(500).json({ error: "cannot add user" });
              });
          });
        } else {
          return res.status(409).json({ error: "user already exist" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: "unable to verify user" });
      });
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
