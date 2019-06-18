// Bien tap vien
var express = require("express");
var router = express.Router();
const drafts = require("../models/draft.model");
const tags = require("../models/tag.model");
const subcategories = require("../models/subcategory.model");
const authEditor = require("../middlewares/auth-editor");

var badge = {
  draft: 0,
  publish: 0,
};

/* GET users listing. */
router.get("/", function (req, res) {
  res.redirect("/editor/drafts/unreleased");
});

router.get("/drafts/unreleased", function (req, res, next) {
  Promise.all([drafts.ByEditor(req.user.Id), tags.all(), subcategories.All()])
    .then(([data, tags, cats]) => {
      res.render("editor/editor-drafts", {
        layout: "editor-layout",
        title: "Blog Posts",
        draft: badge.draft,
        isDrafts: true,
        publish: badge.publish,
        data: data,
        tags: tags,
        cats: cats,
      });
    }).catch(err => {
      console.log(err);
      next(err);
    })
});

router.get("/drafts/released", function (req, res, next) {
  drafts.PublishByEditor(req.user.Id).then(data => {
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
});

module.exports = router;