const exphbs = require("express-handlebars");
const hbs_sections = require('express-handlebars-sections');
const path = require("path");


module.exports = function (app) {
    app.engine(
        "handlebars",
        exphbs({
            defaultLayout: "main",
            layoutsDir: path.join(__dirname, "../views/layouts"),
            partialsDir: path.join(__dirname, "../views/partials"),
            helpers: {
                section: hbs_sections()
            }
        })
    );
    app.set("views", path.join(__dirname, "../views/pages"));
    app.set("view engine", "handlebars");
}