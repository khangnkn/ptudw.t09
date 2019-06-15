var express = require("express");
var articles = require('../models/article.model');
var writers = require('../models/writer.model');
var subcategories = require('../models/subcategory.model');
var router = express.Router();
var path = require('path');
var moment = require('moment');

router.get("/", function (req, res, next) {
  Promise.all([articles.GetMostComment(), articles.GetTopViews()])
    .then(([byComments, byViews]) => {
      byComments.forEach(element => {
        element.Date = moment(element.Date).format("L").toString();
      });
      byViews.forEach(element => {
        element.Date = moment(element.Date).format("L").toString();
      });
      res.render("general/general-index", {
        title: "TechHub",
        mostCommentCarousel: byComments.splice(0, 3),
        mostCommentsRight: byComments,
        mostViews: byViews,
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
});

router.get("/search", (req, res) => {
  if (req.query.search) {
    // implement search
    return
  };
  if (req.query.category) {
    var id = req.query.category;
    if (isNaN(id)) {
      next("Id must be a number");
      return;
    }
    articles.byCat(id)
      .then(data => {
        data.forEach(element => {
          element.Date = moment(element.Date).format("L").toString();
        });
        res.render("general/search", {
          title: "Category",
          // extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
          data: data
        });
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
    return
  };
  if (req.query.tag) {
    return;
  };
  articles.GetTopViews().then(dt => {
    dt.forEach(element => {
      element.Date = moment(element.Date).format("L").toString();
    });
    res.render("general/search", {
      title: "TechHub",
      extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
      top: dt.splice(0, 2),
      topr: dt
    });
  }).catch(err => console.log(err))
})

module.exports = router;