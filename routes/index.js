const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const routes = {
    graph: '/graph',
    tweets: '/tweets',
  };

  res.render('index', {
    routes,
  });
});

module.exports = router;
