// Imports
var models = require("../models");
var asyncLib = require("async");
var jwtUtils = require("../utils/jwt.utils");

// Constants
const titleLimit = 2;
const contentLimit = 4;
const itemsLimit = 50;

// Routes
module.exports = {
  createArticle: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers["authorization"];
    var userId = jwtUtils.getUserId(headerAuth);

    // Params
    var title = req.body.title;
    var content = req.body.content;

    if (title == null || content == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    if (title.length <= titleLimit || content.length <= contentLimit) {
      return res.status(400).json({ error: "invalid parameters" });
    }

    asyncLib.waterfall(
      [
        function (done) {
          models.User.findOne({
            where: { id: userId },
          })
            .then(function (userFound) {
              done(null, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        function (userFound, done) {
          if (userFound) {
            models.Article.create({
              title: title,
              content: content,
              likes: 0,
              UserId: userFound.id,
            }).then(function (newArticle) {
              done(newArticle);
            });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      function (newArticle) {
        if (newArticle) {
          return res.status(201).json(newArticle);
        } else {
          return res.status(500).json({ error: "cannot post message" });
        }
      }
    );
  },
  listArticles: (req, res) => {
    let fields = req.query.fields; // select wanted columns
    let limit = parseInt(req.query.limit); // get articles by segmentation
    let offset = parseInt(req.query.offset); // get articles by segmentation
    let order = req.query.order; // get the list in a particular order

    if (limit > itemsLimit) {
      limit = itemsLimit;
    }

    models.Article.findAll({
      // verify user input
      order: [order != null ? order.split(":") : ["title", "ASC"]],
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      limit: !isNaN(limit) ? limit : null,
      offset: !isNaN(offset) ? offset : null,
      include: [
        {
          // table that permit models inclusion
          model: models.User,
          attributes: ["username"],
        },
      ],
    })
      .then((articles) => {
        if (articles) {
          res.status(200).json(articles);
        } else {
          res.status(404).json({ error: "no messages found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "invalid fields" });
      });
  },
};
