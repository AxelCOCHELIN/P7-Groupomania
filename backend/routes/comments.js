// Imports
const express = require("express");
const commentsCtrl = require("../controllers/comments");

// Router
exports.router = (() => {
  let commentsRouter = express.Router();

  // Routes assignations
  commentsRouter
    .route("/articles/:id/comments/new")
    .post(commentsCtrl.createComment);
  commentsRouter.route("/comments/").get(commentsCtrl.allComments);
  commentsRouter.route("/comments/:id").get(commentsCtrl.oneComment);
  commentsRouter.route("/comments/:id").put(commentsCtrl.modifyComment);
  commentsRouter.route("/comments/:id").delete(commentsCtrl.deleteComment);

  return commentsRouter;
})();
