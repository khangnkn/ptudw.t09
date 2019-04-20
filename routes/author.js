var express = require('express')
var router = express.Router()

router.get('/articles', function (req, res) {
    res.render('show-articles', { title: 'Articles' });
})



module.exports = router;