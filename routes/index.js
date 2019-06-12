var express = require("express");
var articles = require('../models/article.model');
var writers = require('../models/writer.model');
var subcategories = require('../models/subcategory.model');
var router = express.Router();
var path = require('path');
var moment = require('moment');

router.get("/", function (req, res, next) {
  articles.GetTopViews().then(dt => {
    dt.forEach(element => {
      element.Date = moment(element.Date).format("L").toString();
    });
    var top = dt.splice(0, 2)
    var topr = dt;
    res.render("general/general-index", {
      title: "TechHub",
      // extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
      top: top,
      topr: topr
    });
  }).catch(err => console.log(err))
});

router.get("/search", (req, res) => {
  if (req.query.search) {
    // implement search
    return
  };
  if (req.query.cat) {
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