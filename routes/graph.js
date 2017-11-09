const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

router.get('/', graphController.indexPage);
router.get('/fetch_graph', graphController.analyseWordsInTweets);
router.get('/words', graphController.analyseWordsInTweets);

module.exports = router;
