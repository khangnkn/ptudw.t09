const express = require("express");
const router = express.Router();
const drafts = require("../models/draft.model");

router.get("/", function (req, res) {
    res.redirect("/");
});

router.get("/draft-:id", function (req, res, next) {
    drafts
        .detailById(req.params.id)
        .then(dt => {
            console.log("data: ", dt);
            res.render("general/general-article-detail", {
                data: dt[0],
                title: dt[0].Title,
            });
        })
        .catch(next);
});

module.exports = router;