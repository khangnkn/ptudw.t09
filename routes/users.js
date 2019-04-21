var express = require("express");
var router = express.Router();
// const Handlebars = require('handlebars');

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "User" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Dang nhap" });
});

router.get("/changepassword", (req, res) => {
  res.render("changepassword", { title: "Dang nhap" });
});

router.get("/new-post", (req, res) => {
  res.render("new-post", { title: "Tao bai viet" });
});

module.exports = router;