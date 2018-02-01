const express = require('express');
const graphController = require('../controllers/graphController');

const router = express.Router();

router.get('/', graphController.indexPage);
router.get('/fetch_graph', graphController.analyseWordsInTweets);
router.get('/correlation', graphController.correlationGraphPage);
router.get('/correlation/fetch_graph', graphController.correlationGraph);

module.exports = router;
