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

router.get("/:id/drafts/:status", authEditor, function (req, res, next) {
  var id = req.params.id
  if (isNaN(id)) {
    next()
    return
  }
  status = req.params.status;
  if (status == "unreleased" || status == "") {
    drafts.ByEditor(id).then(data => {
      res.render("editor/editor-drafts", {
        layout: "editor-layout",
        title: "Blog Posts",
        draft: badge.draft,
        isDrafts: true,
        publish: badge.publish,
        data: data,
      });
    }).catch(err => {
      console.log(err);
      next(err);
    })
  } else if (status == "released") {
    drafts.PublishByEditor(id).then(data => {
      res.render("editor/editor-drafts", {
        layout: "editor-layout",
        title: "Blog Posts",
        isDrafts: false,
        draft: badge.draft,
        publish: badge.publish,
        data: data,
      });
    }).catch(err => {
      console.log(err);
      next(err);
    })
  } else {
    next();
  }
});

module.exports = router;