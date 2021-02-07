// Imports
const express = require("express");
const commentsCtrl = require("../controllers/comments");

// Router
exports.router = (() => {
  let commentsRouter = express.Router();

  // Routes assignations
  commentsRouter
    .route("/article/:id/comment/new")
    .post(commentsCtrl.createComment);
  commentsRouter.route("/comments/").get(commentsCtrl.allComments);
  commentsRouter.route("/comment/:id").get(commentsCtrl.oneComment);
  commentsRouter.route("/comment/:id").put(commentsCtrl.modifyComment);
  commentsRouter.route("/comment/:id").delete(commentsCtrl.deleteComment);

  return commentsRouter;
})();
