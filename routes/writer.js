var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.redirect('/writer/welcome')
});

router.get("/welcome", function(req, res) {
  res.render("writer-welcome", {
    title: "Chào mừng, phóng viên!",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">'});
})

router.get("/editor", function(req, res) {
  res.render("writer-new-post", {
    title: "Biên tập bài viết",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" /><link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.0/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" /><link href="https://cdn.jsdelivr.net/npm/froala-editor@2.9.0/css/froala_style.min.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" href="/stylesheets/custom-theme.css"><link rel="stylesheet" href="/stylesheets/writer.css">',
  });
});

router.get("/articles", function(req, res) {
  res.render("writer-show-articles", {
    title: "Các bài đã viết",
    extra: '<link rel="stylesheet" href="/stylesheets/writer.css">',
  });
});

module.exports = router;
