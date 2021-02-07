// Imports
var models = require("../models");
var asyncLib = require("async");
var jwtUtils = require("../utils/jwt.utils");

// Constants
const itemsLimit = 50;

// Routes
module.exports = {
  createComment: function (req, res) {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    if (userId < 0) return res.status(400).json({ error: "wrong token" });
    // Params
    let articleId = req.params.id;
    let comment = req.body.comment;
    console.log(articleId, userId);

    if (comment == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    asyncLib.waterfall(
      [
        function (done) {
          models.Article.findOne({
            attributes: ["id"],
            where: { id: articleId },
          })
            .then(function (articleFound) {
              done(null, articleFound);
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ error: "unable to catch the article" });
            });
        },
        function (articleFound, done) {
          if (articleFound) {
            models.Comment.create({
              comment: comment,
              ArticleId: articleFound.id,
              UserId: userId,
            }).then(function (newComment) {
              done(newComment);
            });
          } else {
            res.status(404).json({ error: "article not found" });
          }
        },
      ],
      function (newComment) {
        if (newComment) {
          return res.status(201).json(newComment);
        } else {
          return res.status(500).json({ error: "cannot post comment" });
        }
      }
    );
  },
  oneComment: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let commentId = req.params.id;
    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    models.Comment.findOne({
      attributes: ["id", "comment", "userId", "articleId"],
      where: { id: commentId },
      include: [
        {
          // table that permit models inclusion
          model: models.User,
          attributes: ["username"],
        },
        {
          // table that permit models inclusion
          model: models.Article,
          attributes: ["title"],
        },
      ],
    })
      .then((comment) => res.status(200).json(comment))
      .catch((err) =>
        res.status(404).json({ error: "cannot find this comment" })
      );
  },
  modifyComment: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let commentId = req.params.id;
    if (userId < 0) return res.status(400).json({ error: "wrong token" });
    // Parameters
    let comment = req.body.comment;

    asyncLib.waterfall(
      [
        (done) => {
          models.Comment.findOne({
            attributes: ["id", "comment", "userId", "articleId"],
            where: { id: commentId },
          })
            .then((commentFound) => {
              done(null, commentFound);
            })
            .catch((err) => {
              return res.status(500).json({ error: "unable to verify user" });
            });
        },
        (commentFound, done) => {
          if (commentFound) {
            commentFound
              .update({
                comment: comment ? comment : commentFound.comment,
              })
              .then(() => {
                done(commentFound);
              })
              .catch((err) => {
                res.status(500).json({ error: "cannot update this comment" });
              });
          } else {
            res.status(404).json({ error: "user not found" });
          }
        },
      ],
      (commentFound) => {
        if (commentFound) {
          return res.status(201).json(commentFound);
        } else {
          return res.status(500).json({ error: "cannot update this comment" });
        }
      }
    );
  },
  deleteComment: (req, res) => {
    // Getting auth header
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let commentId = req.params.id;
    if (userId < 0) return res.status(400).json({ error: "wrong token" });

    asyncLib.waterfall(
      [
        (done) => {
          models.Comment.findOne({
            attributes: ["id"],
            where: { id: commentId },
          })
            .then((commentFound) => {
              done(null, commentFound);
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ error: "unable to verify this comment" });
            });
        },
        (commentFound, done) => {
          if (commentFound) {
            commentFound
              .destroy({
                where: { id: commentId },
              })
              .then(() => {
                done(commentFound);
              })
              .catch((err) => {
                res.status(500).json({ error: "cannot delete comment" });
              });
          } else {
            res.status(404).json({ error: "comment not found" });
          }
        },
      ],
      (commentFound) => {
        if (commentFound) {
          return res
            .status(201)
            .json({ message: "comment has been successfully deleted" });
        } else {
          return res.status(500).json({ error: "cannot delete this comment" });
        }
      }
    );
  },
  allComments: (req, res) => {
    let fields = req.query.fields; // select wanted columns
    let limit = parseInt(req.query.limit); // get articles by segmentation
    let offset = parseInt(req.query.offset); // get articles by segmentation
    let order = req.query.order; // get the list in a particular order

    if (limit > itemsLimit) {
      limit = itemsLimit;
    }

    models.Comment.findAll({
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
        {
          // table that permit models inclusion
          model: models.Article,
          attributes: ["title"],
        },
      ],
    })
      .then((comments) => {
        if (comments) {
          res.status(200).json(comments);
        } else {
          res.status(404).json({ error: "no comments found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "invalid fields" });
      });
  },
};
