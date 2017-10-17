const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let routes = {
        graph: '/graph',
        tweets: '/tweets'
    };

    res.render('index', {
        title: 'Tuturutututu',
        routes: routes
    });
});

module.exports = router;
