var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("writer-welcome", { title: "Welcome, writer!" });
});

router.get("/editor", function(req, res) {
  res.render("writer-new-post", {
    title: "Biên tập bài viết",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" /><link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.0/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" /><link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.0/css/froala_style.min.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="/stylesheets/custom-theme.css">',
  });
});

router.get("/articles", function(req, res) {
  res.render("writer-show-articles", {
    title: "Articles",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
  });
});

router.get("/new-post", (req, res) => {
  res.render("new-post", { title: "Đăng bài" });
});

module.exports = router;
