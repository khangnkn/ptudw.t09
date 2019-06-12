const express = require("express");
const router = express.Router();
const articles = require("../models/article.model");
const draftmodule = require("../models/draft.model");

router.get("/", function (req, res) {
  res.redirect("/");
});

router.get("/article-:id", function (req, res, next) {
  articles
    .GetDetail(req.params.id)
    .then(dt => {
      console.log("data: ", dt);
      res.render("general/general-article-detail", {
        data: dt[0],
        title: dt[0].Title,
        // extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
      });
      articles.IncreaseView(req.params.id);
    })
    .catch(next);
});

router.get("/draft-:id", function (req, res, next) {
  draftmodule
    .load(req.params.id)
    .then(dt => {
      console.log("data: ", dt);
      res.render("general/general-article-detail", {
        data: dt[0],
        title: dt[0].Title,
        extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
      });
    })
    .catch(next);
});

module.exports = router;