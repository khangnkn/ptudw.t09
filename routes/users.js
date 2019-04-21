var express = require("express");
var router = express.Router();
// const Handlebars = require('handlebars');

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("general-index", { title: "User" });
});

router.get("/login", (req, res) => {
  res.render("user-login", { title: "Đăng nhập" });
});

router.get("/changepassword", (req, res) => {
  res.render("user-change-password", { title: "Đổi mật khẩu" });
});

router.get("/update-info", (req, res) => {
  res.render("user-update-info", {title: 'Cập nhật thông tin cá nhân'})
})
module.exports = router;
