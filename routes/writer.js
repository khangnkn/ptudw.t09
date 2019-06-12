var express = require("express");
const articlemodule = require("../models/article.model");
const draftmodule = require("../models/draft.model");
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

router.get("/:id/editor", function(req, res) {
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
    Abstract: req.body["Abstract"],
    State: 1,
  };
  console.log(obj);
  articlemodule
    .add(obj)
    .then(n => {
      console.log(n.insertId);
      draftmodule
        .load(n.insertId)
        .then(rows => {
          console.log(rows);
          var dt = {
            Title: rows[0].Title,
            Date: rows[0].Date,
            Cover: rows[0].Cover,
            Abstract: rows[0].Abstract,
            Content: rows[0].Content,
            Author: rows[0].Author,
          };
          console.log(dt);
          res.render("general/general-article-detail", { data: rows[0] }); //?
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/:id/articles", function(req, res) {
  var _id = req.params.id;
  draftmodule.loadByUser(_id).then(_rows => {
    var list = Object.values(JSON.parse(JSON.stringify(_rows)));
    console.log(list);
    res.render("writer/writer-show-articles", {
      data: list,
      layout: "writer-layout",
      title: "Các bài đã viết",
    });
  });
});

module.exports = router;
