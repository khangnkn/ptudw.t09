const hbs_sections = require('express-handlebars-sections');
function hbsHelpers(hbs, path) {
    return hbs.create({
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "../views/layouts"),
        partialsDir: path.join(__dirname, "../views/partials"),
        helpers: {
            section: hbs_sections(),
            ifCond: function (v1, operator, v2, options) {
                
                switch (operator) {
                  case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                  case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                  case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                  case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                  case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                  case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                  case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                  case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                  case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                  case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                  default:
                    return options.inverse(this);
                }
            },
            isSelected: function (value, key) {
                return value === key ? 'selected' : ''; 
            }
            
        }
    });
}
module.exports = hbsHelpers;