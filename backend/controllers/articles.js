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
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    if (userId < 0) return res.status(400).json({ error: "wrong token" });
    // Params
    let title = req.body.title;
    let content = req.body.content;

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
  oneArticle: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let articleId = req.params.id;
    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    models.Article.findOne({
      attributes: ["id", "image", "title", "content", "userId"],
      where: { id: articleId },
      include: [
        {
          // table that permit models inclusion
          model: models.User,
          attributes: ["username"],
        },
      ],
    })
      .then((article) => res.status(200).json(article))
      .catch((err) =>
        res.status(404).json({ error: "cannot find this article" })
      );
  },
  modifyArticle: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let articleId = req.params.id;
    if (userId < 0) return res.status(400).json({ error: "wrong token" });
    // Parameters
    let title = req.body.title;
    let content = req.body.content;

    asyncLib.waterfall(
      [
        (done) => {
          models.Article.findOne({
            attributes: ["id", "title", "content", "userId"],
            where: { id: articleId },
          })
            .then((articleFound) => {
              done(null, articleFound);
            })
            .catch((err) => {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        (articleFound, done) => {
          if (articleFound) {
            articleFound
              .update({
                title: title ? title : articleFound.title,
                content: content ? content : articleFound.content,
              })
              .then(() => {
                done(articleFound);
              })
              .catch((err) => {
                res.status(500).json({ error: "cannot update this article" });
              });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      (articleFound) => {
        if (articleFound) {
          return res.status(201).json(articleFound);
        } else {
          return res.status(500).json({ error: "cannot update this article" });
        }
      }
    );
  },
  deleteArticle: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let articleId = req.params.id;
    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    asyncLib.waterfall(
      [
        (done) => {
          models.Article.findOne({
            attributes: ["id"],
            where: { id: articleId },
          })
            .then((articleFound) => {
              done(null, articleFound);
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ error: "unable to verify this article" });
            });
        },
        (articleFound, done) => {
          if (articleFound) {
            articleFound
              .destroy({
                where: { id: articleId },
              })
              .then(() => {
                done(articleFound);
              })
              .catch((err) => {
                res.status(500).json({ error: "cannot delete article" });
              });
          } else {
            res.status(404).json({ error: "article not found" });
          }
        },
      ],
      (articleFound) => {
        if (articleFound) {
          return res
            .status(201)
            .json({ message: "article has been successfully deleted" });
        } else {
          return res.status(500).json({ error: "cannot delete this article" });
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
      order: [
        ["updatedAt", "DESC"],
        ["createdAt", "DESC"],
      ],
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
