const exphbs = require("express-handlebars");
const path = require("path");
var handlebars  = require('../helpers/handlebars.js')(exphbs,path);

module.exports = function (app) {
    app.engine(
        "handlebars",
        handlebars.engine
    );
    app.set("views", path.join(__dirname, "../views/pages"));
    app.set("view engine", "handlebars");
}