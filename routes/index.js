var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("general-index", {
    title: "Express",
    body: "<p>Hello<p>",
    extra: '<link rel="stylesheet" href="/stylesheets/home.css">'
  });
});

module.exports = router;
