const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const routes = {
    graph: '/graph',
    tweets: '/tweets',
  };

  res.render('index', {
    title: 'Tuturutututu',
    routes,
  });
});

module.exports = router;
