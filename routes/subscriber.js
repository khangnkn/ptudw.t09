var express = require("express");
var router = express.Router();
var passport = require('passport');
var auth = require('../middlewares/auth');
const moment = require('moment');
const writers = require('../models/writer.model');
const subscribers = require('../models/subscriber.model');

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("general/general-index", {
    title: "User"
  });
});

router.get("/login", (req, res) => {
  res.render("subscriber/login", {
    title: "Đăng nhập"
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('subscriber/login', {
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      redirectURL = req.query.return
      console.log(redirectURL);
      if (redirectURL) {
        return res.redirect("/subscriber/change-password");
      } else {
        return res.redirect("/");
      }
    });
  })(req, res, next);
});

router.get("/change-password", auth, function (req, res) {
  res.render("subscriber/change-password", {
    title: "Đổi mật khẩu",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/user.css">',
  });
});

router.post('/change-birthday', auth, (req, res) => {
  console.log(req.body);
  var obj = {
    Id: req.body.Id,
    Birthday: moment(req.body.Birthday).format("YYYY-MM-DD"),
  }
  console.log(obj);
  subscribers.update(obj).then(result => {
      if (result.changedRows == 0) {
        res.json({
          success: false,
        })
        return;
      } else {
        res.locals.authUser.Birthday = req.body.Birthday;
        res.json({
          success: true,
        })
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
      })
    })
})

router.post('/chgpwd', auth, (req, res) => {
  console.log(req.body);
  if (req.body.curpwd != req.user.Password) {
    res.json({
      success: false,
      message: "Wrong password!"
    })
  }
  var obj = {
    Id: req.body.id,
    Password: req.body.newpwd,
  }
  console.log(obj);
  subscribers.update(obj).then(result => {
      if (result.changedRows == 0) {
        res.json({
          success: false,
          message: "An orror has occurred!"
        })
        return;
      } else {
        res.json({
          success: true,
          message: "Change password successfully!"
        })
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        message: err,
      })
    })
})

router.get("/profile", auth, (req, res) => {
  res.render("subscriber/profile", {
    title: "Cập nhật thông tin cá nhân"
  });
});

router.post("/logout", auth, (req, res, next) => {
  req.logOut();
  res.redirect("/subscriber/login");
});

module.exports = router;