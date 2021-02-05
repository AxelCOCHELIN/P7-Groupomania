// Imports
const express = require("express");
const articlesCtrl = require("../controllers/articles");

// Router
exports.router = (() => {
  let articlesRouter = express.Router();

  // Routes assignations
  articlesRouter.route("/articles/new").post(articlesCtrl.createArticle);
  articlesRouter.route("/articles/").get(articlesCtrl.listArticles);
  articlesRouter.route("/article/:id").get(articlesCtrl.oneArticle);
  articlesRouter.route("/article/").put(articlesCtrl.modifyArticle);

  return articlesRouter;
})();
