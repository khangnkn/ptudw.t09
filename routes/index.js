var express = require("express");
var articles = require('../models/article.model');
var writers = require('../models/writer.model');
var subcategories = require('../models/subcategory.model');
var router = express.Router();
var path = require('path');
var moment = require('moment');

router.get("/", function (req, res, next) {
  articles.GetTop4().then(dt => {
    dt.forEach(element => {
      element.Date = moment(element.Date).format("L").toString();
    });
    res.render("general/general-index", {
      title: "TechHub",
      extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
      top: dt,
      topr: dt
    });
  }).catch(err => console.log(err))
});

router.get("/search", (req, res) => {
  if (req.query.search) {
    // implement search
    return
  };
  if (req.query.cat) {
    // implement query by cat
    articles.byCat(id).then(data => {
      res.render(kfsdklfkdfks)
    })
    return
  };
  if (req.query.tag) {

    return;
  };
  articles.GetTop4().then(dt => {
    dt.forEach(element => {
      element.Date = moment(element.Date).format("L").toString();
    });
    res.render("general/search", {
      title: "TechHub",
      extra: '<link rel="stylesheet" href="/stylesheets/home.css">',
      top: dt,
      topr: dt
    });
  }).catch(err => console.log(err))
})

module.exports = router;