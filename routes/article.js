const express = require("express");
const router = express.Router();
const articles = require('../models/article.model');

router.get("/", function (req, res) {
  res.redirect("/");
});

router.get("/article-:id", function (req, res) {
  articles.GetDetail(req.params.id).then(dt => {
    console.log("data: ", dt);
    res.render("general/general-article-detail", {
      data: dt[0],
      title: dt[0].Title,
      // extra: '<link rel="stylesheet" href="/stylesheets/writer.css">'
    });
    articles.IncreaseView(req.params.id)
  })
});

module.exports = router;