const subcategories = require('../models/subcategory.model');

module.exports = (req, res, next) => {
    Promise.all([subcategories.byCat(1), subcategories.byCat(2), subcategories.byCat(3), subcategories.top5Cat()])
        .then(([phone, laptop, tech, cat]) => {
            res.locals.PhoneCat = phone;
            res.locals.LaptopCat = laptop;
            res.locals.TechCat = tech;
            res.locals.TopCat = cat;
            next();
        })
        .catch(err => {
            next(err);
        })
}