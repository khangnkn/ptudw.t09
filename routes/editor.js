// Bien tap vien
var express = require("express");
var router = express.Router();
const drafts = require("../models/draft.model");
const authEditor = require("../middlewares/auth-editor");

var badge = {
  draft: 0,
  publish: 0,
};

/* GET users listing. */
router.get("/", function (req, res) {
  res.redirect("/editor/:id/drafts");
});

router.get("/:id/drafts", authEditor, function (req, res, next) {
  var id = req.params.id
  if (isNaN(id)) {
    next()
    return
  }
  drafts.ByEditor(id).then(data => {
    res.render("editor/editor-drafts", {
      layout: "editor-layout",
      title: "Blog Posts",
      extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> </script><link rel="stylesheet" href="/stylesheets/editor.css">',
      draft: badge.draft,
      publish: badge.publish,
      data: data,
    });
  }).catch(err => {
    console.log(err);
    next(err);
  })
});

module.exports = router;