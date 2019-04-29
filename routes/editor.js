// Bien tap vien
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/drafts", function(req, res) {
  res.render("editor-drafts", {
    title: "Blog Posts",
    extra:
      '<script type="text/javascript" src="Scripts/bootstrap.min.js"></script>< script type="text/javascript" src="Scripts/jquery-2.1.1.min.js" ></script><link rel="stylesheet" href="/stylesheets/editor.css">',
  });
});

module.exports = router;
