var express = require("express");
const articlemodule = require("../models/article.model");
var router = express.Router();
var moment = require("moment");

const sidedata = [
  {
    href: "/writer/editor",
    src: "/images/icons/baseline-create-24px.svg",
    content: "Viết bài",
  },
  {
    href: "/writer/articles",
    src: "/images/icons/baseline-format_align_right-24px.svg",
    content: "Các bài đã đăng",
  },
];

router.get("/", function(req, res) {
  res.redirect("/writer/welcome");
});

router.get("/welcome", function(req, res) {
  res.render("writer/writer-welcome", {
    layout: "writer-layout",
    title: "Chào mừng, phóng viên!",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
    sideitem: sidedata,
  });
});

router.get("/editor", function(req, res) {
  res.render("writer/writer-new-post", {
    layout: "writer-layout",
    title: "Biên tập bài viết",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" /><link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.0/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" /><link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.0/css/froala_style.min.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="/stylesheets/custom-theme.css"><link rel="stylesheet" href="/stylesheets/writer.css">',
    sideitem: sidedata,
  });
});

router.post("/editor", (req, res, next) => {
  // req.body["State"] = 1;
  // req.body["Category"] = 1;
  // req.body["Date"] = "2019-1-1";
  // req.body["Cover"] = "hasdfsdf";
  // req.body["Abstract"] = "hi";
  // debugger;
  var obj = {
    Title: req.body["Title"],
    Category: 1,
    Date: moment()
      .format("YYYY-DD-MM")
      .toString(),
    Cover: null,
    Author: 1,
    Content: req.body["Content"],
    Abstract: "hi",
    State: 1,
  };
  console.log(obj);
  articlemodule
    .add(obj)
    .then(res.end("done"))
    .catch(next);
});

router.get("/articles", function(req, res) {
  res.render("writer/writer-show-articles", {
    layout: "writer-layout",
    title: "Các bài đã viết",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
    sideitem: sidedata,
  });
});

module.exports = router;
