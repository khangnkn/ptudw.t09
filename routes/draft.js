const express = require("express");
const router = express.Router();
const drafts = require("../models/draft.model");
const articles = require("../models/article.model");
const rejects = require("../models/reject.model");
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

router.get("/reject/reason/:id", (req, res, next) => {
    var id = req.params.id
    if (isNaN(id)) {
        res.json({
            success: false,
            message: "Id must be a number",
        })
        return;
    }
    drafts.rejectReason(id).then(data => {
            console.log(data);
            if (data.length == 0) {
                res.json({
                    success: false,
                    message: "Couldn't find reason for this!",
                })
                return;
            }
            res.json({
                success: true,
                message: data[0].RejectReason,
            })
            return;
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: "Internal error occurred!"
            })
        })
})

router.post("/publish/:id", function (req, res, next) {
    var id = req.params.id;
    var article = {
        Draft: id,
        Premium: parseInt(req.body.premium, 10),
        PublishTime: moment(req.body.pdate).format("YYYY-MM-DD"),
    }
    articles.add(article)
        .then(result => {
            if (result.affectedRows == 1) {
                drafts.updateStatus(id, 3)
                    .catch(err => {
                        console.log(err);
                        next(err);
                        return;
                    })
                articles.addTag(parseInt(req.body.tag, 10));
            } else {
                next("Error when adding article")
                return;
            }
            return;
        })
        .catch(err => {
            console.log(err);
            next(err);
            return;
        })

    res.redirect("/editor/drafts/unreleased")
});

router.post("/reject/:id", function (req, res, next) {
    var id = req.params.id;
    if (isNaN(id)) {
        next("Draft ID must be a number");
        return;
    }
    var editorID = req.user.Id;
    var reason = req.body.reason;
    var object = {
        Draft: parseInt(id, 10),
        Editor: editorID,
        RejectReason: reason,
    }
    rejects.add(object)
        .then(result => {
            if (result.affectedRows == 0) {
                next("An error occurred when add rejection!");
                return;
            }
            drafts.updateStatus(object.Draft, 2).catch(err => {
                console.log(err);
                next(err);
                return;
            })
            res.redirect("/editor/draft/unreleased")
            return;
        })
        .catch(err => {
            console.log(err);
            next(err);
            return;
        })
    res.json(object);
});

module.exports = router;