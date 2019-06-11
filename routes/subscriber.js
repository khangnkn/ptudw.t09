var express = require("express");
var router = express.Router();
var passport = require('passport');
var auth = require('../middlewares/auth');
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
      return res.render('subcriber/login', {

        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      // return res.redirect('/');
      return res.end("OK")
    });
  })(req, res, next);
});

router.get("/change-password", auth, function (req, res) {
  res.render("subscriber/change-password", {
    title: "Đổi mật khẩu",
    extra: '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/user.css">',
  });
});

router.get("/update-info", auth, (req, res) => {
  res.render("subscriber/update-info", {
    title: "Cập nhật thông tin cá nhân"
  });
});

router.post("/login", auth, (req, res, next) => {
  passport.logOut();
  res.redirect("/login");
});

module.exports = router;