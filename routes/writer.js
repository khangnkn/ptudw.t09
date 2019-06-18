var express = require("express");
const articles = require("../models/article.model");
const drafts = require("../models/draft.model");
const subcategories = require("../models/subcategory.model");
var router = express.Router();
var moment = require("moment");

router.get("/", function(req, res) {
  res.redirect("/writer/welcome");
});

router.get("/welcome", function(req, res) {
  res.render("writer/writer-welcome", {
    layout: "writer-layout",
    title: "Chào mừng, phóng viên!",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
  });
});

router.get("/editor", function(req, res, next) {
  var _id = req.user.Id;
  // subcategories.All().then(data => {
  res.render("writer/writer-new-post", {
    id: _id,
    layout: "writer-layout",
    title: "Biên tập bài viết",
    // Cats: data
  });
  // }).catch(err => {
  // console.log(err);
  // next(err)
  // })
});

router.post("/editor", (req, res, next) => {
  var obj = {
    Title: req.body["Title"],
    Category: req.body.CatSelect,
    Date: moment().format("YYYY-MM-DD"),
    Cover: req.body.Cover,
    Author: req.user.Id,
    Content: req.body["Content"],
    Abstract: req.body["Abstract"],
    State: 1,
  };
  drafts
    .add(obj)
    .then(n => {
      console.log(n);
      res.redirect("/");
    })
    .catch(next);
});

router.get("/articles", function(req, res) {
  var id = req.user.Id;
  Promise.all([
    drafts.pendingByWriter(id),
    drafts.rejectedByWriter(id),
    drafts.approvedByWriter(id),
    drafts.publishedByWriter(id),
  ])
    .then(([pending, rejected, approved, published]) => {
      res.render("writer/writer-show-articles", {
        layout: "writer-layout",
        title: "Các bài đã viết",
        pending: pending,
        rejected: rejected,
        approved: approved,
        published: published,
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
  return;
  drafts
    .loadByUser(id)
    .then(rows => {
      rows.forEach(element => {
        element.Date = moment(element.Date).format("L");
        console.log(element.Id, element.Alias);
      });
      res.render("writer/writer-show-articles", {
        data: rows,
        layout: "writer-layout",
        title: "Các bài đã viết",
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
