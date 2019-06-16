var express = require("express");
const articlemodule = require("../models/article.model");
const draftmodule = require("../models/draft.model");
const subcategories = require("../models/subcategory.model");
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

router.get("/:id/editor", function (req, res, next) {
  var _id = req.param.id;
  subcategories.All().then(data => {
    res.render("writer/writer-new-post", {
      id: _id,
      layout: "writer-layout",
      title: "Biên tập bài viết",
      Cats: data
    });
  }).catch(err => {
    console.log(err);
    next(err)
  })
});

router.post("/:id/editor", (req, res, next) => {
  console.log(req.body);
  var obj = {
    Title: req.body["Title"],
    Category: req.body.CatSelect,
    Date: moment()
      .format("YYYY-MM-DD"),
    Cover: req.body.Cover,
    Author: parseInt(req.params.id),
    Content: req.body["Content"],
    Abstract: req.body["Abstract"],
    State: 1,
  };
  console.log(obj);
  articlemodule
    .add(obj)
    .then(n => {
      console.log(n);
      res.redirect("/")
    })
    .catch(next);
});

router.get("/:id/articles", function (req, res) {
  var _id = req.params.id;
  draftmodule.loadByUser(_id).then(rows => {
    rows.forEach(element => {
      element.Date = moment(element.Date).format("L")
      console.log(element.Id, element.Alias);
    });
    // var list = Object.values(JSON.parse(JSON.stringify(_rows)));
    // console.log(list);
    res.render("writer/writer-show-articles", {
      data: rows,
      layout: "writer-layout",
      title: "Các bài đã viết",
    });
  }).catch(err => console.log(err));
});

module.exports = router;