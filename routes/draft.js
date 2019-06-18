const express = require("express");
const router = express.Router();
const drafts = require("../models/draft.model");
const articles = require("../models/article.model");
const moment = require('moment');

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

router.post("/publish/:id", function (req, res, next) {
    var id = req.params.id;
    console.log(req.body);
    var article = {
        Draft: id,
        Premium: parseInt(req.body.premium, 10),
        PublishTime: moment(req.body.pdate).format("YYYY-MM-DD"),
    }
    articles.add(article)
        .then(result => {
            if (result.affectedRows == 1) {
                drafts.updateStatus(id, 4)
                    .catch(err => {
                        console.log(err);
                        next(err);
                    })
                articles.addTag(parseInt(req.body.tag, 10));
            } else {
                next("Error when adding article")
            }
            return;
        })
        .catch(err => {
            console.log(err);
            next(err);
        })

    res.redirect("/editor/drafts/unreleased")
});

module.exports = router;