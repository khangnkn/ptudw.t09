const express = require("express");
const router = express.Router();
const moment = require('moment');
const articles = require("../models/article.model");
const draftmodule = require("../models/draft.model");
const comments = require("../models/comment.model");

router.get("/", function (req, res) {
  res.redirect("/");
});

router.get("/article-:id", function (req, res, next) {
  Promise.all([articles.GetDetail(req.params.id), articles.Comments(req.params.id)])
    .then(function ([data, comments]) {
      console.log(data);
      console.log(comments);
      res.render("general/general-article-detail", {
        data: data[0],
        title: data[0].Title,
        comments: comments
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

router.post("/comment", function (req, res, next) {
  console.log(req.body);
  var comment = {
    Article: req.body.Article,
    User: req.body.User,
    Time: moment().format("YYYY-MM-DD"),
    Content: req.body.Content
  }
  console.log(comment);
  comments.Add(comment).then(result => {
    res.json({
      success: true,
    })
  }).catch(err => {
    console.log(err);
    res.json({
      success: false,
    })
  });
});


module.exports = router;