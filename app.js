var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const exphbs = require("express-handlebars");

const indexRouter = require("./routes/index");
const subscriberRouter = require("./routes/subscriber");
const writerRouter = require("./routes/writer");
const articleRouter = require("./routes/article");
const editorRouter = require("./routes/editor");
const adminRouter = require("./routes/admin");

var app = express();

require('./middlewares/view-engine')(app);
// require('./middlewares/session')(app);
// require('./middlewares/passport')(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/subscriber", subscriberRouter);
app.use("/writer", writerRouter);
app.use("/article", articleRouter);
app.use("/editor", editorRouter);
app.use("/admin", adminRouter);

app.get("/sitemap", (req, res) => {
  res.render("sitemap", {
    title: "Sitemap"
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