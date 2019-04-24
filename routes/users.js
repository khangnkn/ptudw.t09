var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  res.render("general-index", { title: "User" });
});

router.get("/login", (req, res) => {
  res.render("user-login", {
    title: "Đăng nhập",
  });
});

router.get("/changepassword", function(req, res) {
  res.render("user-change-password", {
    title: "Đổi mật khẩu",
    extra:
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"> <link rel="stylesheet" href="/stylesheets/user.css">',
  });
});

router.get("/update-info", (req, res) => {
  res.render("user-update-info", { title: "Cập nhật thông tin cá nhân" });
});

module.exports = router;
