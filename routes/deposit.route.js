var express = require('express');
var router = express.Router();

const { PostDeposit,sendOtp } = require('../controllers/deposit.controller');

router.get('/',function (req, res, next) {
  res.render('exchange/deposit',{title: 'Deposit'});
})

router.post('/',PostDeposit);

router.get('/sendOtp', sendOtp)

module.exports = router;
