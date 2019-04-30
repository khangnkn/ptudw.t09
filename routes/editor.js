// Bien tap vien
var express = require("express");
var router = express.Router();

var badge = { draft: 0, publish: 0 };

/* GET users listing. */
router.get("/drafts", function(req, res) {
  res.render("editor-drafts", {
    title: "Blog Posts",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> </script><link rel="stylesheet" href="/stylesheets/editor.css">',
    draft: badge.draft,
    publish: badge.publish,
  });
});

module.exports = router;
