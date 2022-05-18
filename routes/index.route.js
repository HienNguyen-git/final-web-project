var express = require('express');
const { handlePhoneCard } = require('../controllers/phone_card.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/phone-card', handlePhoneCard)

module.exports = router;
