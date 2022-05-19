var express = require('express');
const { getPhoneCard, handleBuyPhoneCard } = require('../controllers/phone_card.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/phone-card', getPhoneCard)
router.post('/phone-card', handleBuyPhoneCard)

module.exports = router;
