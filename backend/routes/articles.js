// Imports
const express = require("express");
const articlesCtrl = require("../controllers/articles");

// Router
exports.router = (() => {
  let articlesRouter = express.Router();

  // Routes assignations
  articlesRouter.route("/articles/new").post(articlesCtrl.createArticle);
  articlesRouter.route("/articles/").get(articlesCtrl.listArticles);

  return articlesRouter;
})();
