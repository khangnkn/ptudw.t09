var express = require("express");
var articles = require('../models/article.model');
var writers = require('../models/writer.model');
var subcategories = require('../models/subcategory.model');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var bcrypt = require('bcrypt');
var passport = require('passport');
var auth = require('../middlewares/auth-admin');

router.get("/", function (req, res, next) {
  Promise.all([articles.GetMostComment(), articles.GetTopViews(), subcategories.top10Cat()])
    .then(([byComments, byViews, topCats]) => {
      res.render("general/general-index", {
        title: "TechHub",
        mostCommentCarousel: byComments.splice(0, 3),
        mostCommentsRight: byComments,
        mostViews: byViews,
        topCats: topCats,
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
});

router.get("/search", (req, res, next) => {
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
    var tag = req.query.tag;
    articles.byTagName(tag)
      .then(data => {
        data.forEach(element => {
          element.Date = moment(element.Date).format("L").toString();
        });
        res.render("general/search", {
          title: "Tag",
          data: data
        });
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
    return;
  };
  articles.GetTopViews().then(dt => {
    dt.forEach(element => {
      element.Date = moment(element.Date).format("L").toString();
    });
    res.render("general/search", {
      title: "TechHub",
      top: dt,
    });
  }).catch(err => console.log(err))
})

router.get('/admin/login', function (req, res, next) {
  res.render("admin/login", {
    layout: false,
  })
})

router.post('/admin/login', (req, res, next) => {
  passport.authenticate('admin', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('admin/login', {
        layout: false,
        err_message: info.message
      })
    }
    req.logIn(user, err => {
      if (err)
        return next(err);
      console.log(req.session);
      return res.redirect("/admin/welcome/categories")
    });
  })(req, res, next);
})
module.exports = router;