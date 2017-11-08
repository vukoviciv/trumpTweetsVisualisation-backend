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

router.post('/', (req, res) => {
  // const routes = {
  //   graph: '/graph',
  // };
  console.log(req.body);
  res.send('POST to index');
});

module.exports = router;
