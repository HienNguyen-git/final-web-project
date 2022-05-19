var express = require('express');
var router = express.Router();

const { PostDeposit,sendOtp, getDeposit } = require('../controllers/deposit.controller');

router.get('/', getDeposit)

router.post('/',PostDeposit);

router.get('/sendOtp', sendOtp)

module.exports = router;
