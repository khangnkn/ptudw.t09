var express = require("express");
const articlemodule = require("../models/article.model");
var router = express.Router();
var moment = require("moment");

router.get("/", function (req, res) {
  res.redirect("/writer/welcome");
});

router.get("/welcome", function (req, res) {
  res.render("writer/writer-welcome", {
    layout: "writer-layout",
    title: "Chào mừng, phóng viên!",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
  });
});

router.get("/:id/editor", function (req, res) {
  var _id = req.param.id;
  res.render("writer/writer-new-post", {
    id: _id,
    layout: "writer-layout",
    title: "Biên tập bài viết",
  });
});

router.post("/:id/editor", (req, res, next) => {
  var obj = {
    Title: req.body["Title"],
    Category: 1,
    Date: moment()
      .format("YYYY-DD-MM")
      .toString(),
    Cover: null,
    Author: parseInt(req.params.id),
    Content: req.body["Content"],
    Abstract: "hi",
    State: 1,
  };
  console.log(obj);
  articlemodule
    .add(obj)
    .then(console.log("OK"))
    .catch(next);
});

router.get("/:id/articles", function (req, res) {
  res.render("writer/writer-show-articles", {
    layout: "writer-layout",
    title: "Các bài đã viết"
  });
});

module.exports = router;