var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const exphbs = require("express-handlebars");

var app = express();

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
app.use(require('./middlewares/auth-local'));
app.use(require('./middlewares/local'));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/subscriber", require("./routes/subscriber"));
app.use("/writer", require("./routes/writer"));
app.use("/article", require("./routes/article"));
app.use("/draft", require("./routes/draft"));
app.use("/editor", require("./routes/editor"));
app.use("/admin", require("./routes/admin"));

app.get("/sitemap", (req, res) => {
  res.render("sitemap", {
    title: "Sitemap",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("general/general-error");
});

module.exports = app;