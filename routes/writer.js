var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("writer-welcome", { title: "Welcome, writer!" });
});

router.get("/articles", function(req, res) {
  res.render("writer-show-articles", { title: "Articles" });
});

router.get("/new-post", (req, res) => {
  res.render("new-post", { title: "Đăng bài" });
});

module.exports = router;
